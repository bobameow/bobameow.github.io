#!/usr/bin/env python3
"""Telegram Personal Trainer Bot.

Guides a Push/Pull/Legs routine with progressive overload and local JSON
storage. Built with python-telegram-bot v21 (async).
"""

from __future__ import annotations

import asyncio
import json
import logging
import os
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List, Optional

from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import (
    AIORateLimiter,
    ApplicationBuilder,
    CallbackQueryHandler,
    CommandHandler,
    ContextTypes,
    JobQueue,
    MessageHandler,
    filters,
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

DATA_DIR = Path("data")
DATA_DIR.mkdir(exist_ok=True)

DEFAULT_TARGETS = {
    "bench_press": 40.0,
    "shoulder_press": 25.0,
    "barbell_row": 40.0,
    "deadlift": 60.0,
    "squat": 50.0,
}

PROGRESSION_LIFTS = {
    "bench_press": "Bench Press",
    "shoulder_press": "Shoulder Press",
    "barbell_row": "Barbell Row",
    "deadlift": "Deadlift",
    "squat": "Squat",
}

PROGRAM = [
    {
        "name": "Push",
        "exercises": [
            {"type": "warmup", "description": "Run, 60 push-ups, 60 sit-ups"},
            {"type": "progression", "key": "bench_press", "name": "Bench Press"},
            {"type": "progression", "key": "shoulder_press", "name": "Shoulder Press"},
            {"type": "accessory", "key": "lateral_raises", "name": "Lateral Raises"},
        ],
    },
    {
        "name": "Pull",
        "exercises": [
            {"type": "warmup", "description": "Run, 60 push-ups, 60 sit-ups"},
            {"type": "progression", "key": "barbell_row", "name": "Barbell Row"},
            {"type": "progression", "key": "deadlift", "name": "Deadlift"},
            {"type": "accessory", "key": "bicep_curls", "name": "Bicep Curls"},
        ],
    },
    {
        "name": "Legs",
        "exercises": [
            {"type": "warmup", "description": "Run, 60 push-ups, 60 sit-ups"},
            {"type": "progression", "key": "squat", "name": "Squat"},
            {"type": "accessory", "key": "core", "name": "7 core exercises"},
        ],
    },
]

@dataclass
class LiftHistoryEntry:
    date: str
    set_index: int
    weight_kg: float
    reps: int

@dataclass
class LiftData:
    target_weight_kg: float
    history: List[LiftHistoryEntry] = field(default_factory=list)
    last_result: str = "fail"

@dataclass
class UserData:
    user_id: int
    current_day_index: int = 0
    lifts: Dict[str, LiftData] = field(default_factory=dict)
    accessory_logs: List[dict] = field(default_factory=list)
    last_sessions: List[dict] = field(default_factory=list)

    @staticmethod
    def default(user_id: int) -> "UserData":
        lifts = {k: LiftData(target_weight_kg=v) for k, v in DEFAULT_TARGETS.items()}
        return UserData(user_id=user_id, lifts=lifts)

# Async locks for file access
_LOCKS: Dict[int, asyncio.Lock] = {}

async def load_user(user_id: int) -> UserData:
    lock = _LOCKS.setdefault(user_id, asyncio.Lock())
    async with lock:
        path = DATA_DIR / f"{user_id}.json"
        if not path.exists():
            return UserData.default(user_id)
        text = await asyncio.to_thread(path.read_text)
        data = json.loads(text)
        lifts = {
            k: LiftData(
                target_weight_kg=v.get("target_weight_kg", DEFAULT_TARGETS.get(k, 0.0)),
                history=[LiftHistoryEntry(**h) for h in v.get("history", [])],
                last_result=v.get("last_result", "fail"),
            )
            for k, v in data.get("lifts", {}).items()
        }
        return UserData(
            user_id=data.get("user_id", user_id),
            current_day_index=data.get("current_day_index", 0),
            lifts=lifts,
            accessory_logs=data.get("accessory_logs", []),
            last_sessions=data.get("last_sessions", []),
        )

async def save_user(user: UserData) -> None:
    lock = _LOCKS.setdefault(user.user_id, asyncio.Lock())
    async with lock:
        path = DATA_DIR / f"{user.user_id}.json"
        tmp = path.with_suffix(".tmp")
        data = {
            "user_id": user.user_id,
            "current_day_index": user.current_day_index,
            "lifts": {
                k: {
                    "target_weight_kg": v.target_weight_kg,
                    "history": [e.__dict__ for e in v.history],
                    "last_result": v.last_result,
                }
                for k, v in user.lifts.items()
            },
            "accessory_logs": user.accessory_logs,
            "last_sessions": user.last_sessions,
        }
        text = json.dumps(data, indent=2)
        await asyncio.to_thread(tmp.write_text, text)
        await asyncio.to_thread(tmp.replace, path)

# Helpers

def round_weight(w: float) -> float:
    return round(w * 4) / 4.0

async def get_user(context: ContextTypes.DEFAULT_TYPE, uid: int) -> UserData:
    user = context.application.bot_data.get(uid)
    if not user:
        user = await load_user(uid)
        context.application.bot_data[uid] = user
    return user

# Commands
async def cmd_start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user = await get_user(context, update.effective_user.id)
    await save_user(user)
    await update.message.reply_text(
        "Welcome! 3-day rotation: Push, Pull, Legs. Use /begin to start today's workout."
    )

async def cmd_help(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "/begin to start, /plan for routine, /stats for last sessions, /reset to reset weights."
    )

async def cmd_plan(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user = await get_user(context, update.effective_user.id)
    lines = []
    for i, day in enumerate(PROGRAM, start=1):
        parts = [f"Day {i} {day['name']}"]
        for ex in day["exercises"]:
            if ex["type"] == "progression":
                w = user.lifts[ex["key"]].target_weight_kg
                parts.append(f"{ex['name']} {w}kg")
        lines.append(" - ".join(parts))
    await update.message.reply_text("\n".join(lines))

async def cmd_stats(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user = await get_user(context, update.effective_user.id)
    if not user.last_sessions:
        await update.message.reply_text("No sessions yet.")
        return
    lines = [
        f"{s['date']} {s['day']}: {s['success_rate']*100:.0f}%" for s in user.last_sessions[-10:]
    ]
    await update.message.reply_text("\n".join(lines))

async def cmd_reset(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    keyboard = [[InlineKeyboardButton(name, callback_data=f"reset:{k}")]
                for k, name in PROGRESSION_LIFTS.items()]
    keyboard.append([InlineKeyboardButton("All", callback_data="reset:all")])
    await update.message.reply_text(
        "Reset which exercise?", reply_markup=InlineKeyboardMarkup(keyboard)
    )

async def reset_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()
    _, which = query.data.split(":")
    user = await get_user(context, query.from_user.id)
    if which == "all":
        for k, v in user.lifts.items():
            v.target_weight_kg = DEFAULT_TARGETS[k]
            v.history.clear()
            v.last_result = "fail"
        msg = "All lifts reset."
    else:
        lift = user.lifts[which]
        lift.target_weight_kg = DEFAULT_TARGETS[which]
        lift.history.clear()
        lift.last_result = "fail"
        msg = f"{PROGRESSION_LIFTS[which]} reset."
    await save_user(user)
    await query.edit_message_text(msg)

async def cmd_begin(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user = await get_user(context, update.effective_user.id)
    day = PROGRAM[user.current_day_index]
    lines = [f"Day {user.current_day_index+1} {day['name']}"]
    for ex in day["exercises"]:
        if ex["type"] == "progression":
            lines.append(f"{ex['name']} target {user.lifts[ex['key']].target_weight_kg}kg")
        elif ex["type"] == "accessory":
            lines.append(f"Accessory: {ex['name']}")
        else:
            lines.append(f"Warm-up: {ex['description']}")
    keyboard = InlineKeyboardMarkup(
        [[InlineKeyboardButton("Start 30-min Session", callback_data="start_session")]]
    )
    await update.message.reply_text("\n".join(lines), reply_markup=keyboard)

# Session state
@dataclass
class SessionState:
    start_time: datetime
    day_index: int
    exercise_idx: int = 0
    set_idx: int = 0
    results: Dict[str, List] = field(default_factory=dict)
    session_job: Optional[str] = None
    rest_job: Optional[str] = None
    extended: bool = False

async def start_session_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()
    chat_id = query.message.chat_id
    user = await get_user(context, query.from_user.id)
    session = SessionState(start_time=datetime.now(), day_index=user.current_day_index)
    context.chat_data["session"] = session
    job = context.job_queue.run_once(session_timeout, when=timedelta(minutes=30), chat_id=chat_id)
    session.session_job = job.id
    await query.edit_message_text("Timer started: 30:00")
    await prompt_next(chat_id, context)

async def session_timeout(context: ContextTypes.DEFAULT_TYPE) -> None:
    chat_id = context.job.chat_id
    session: SessionState = context.application.chat_data[chat_id].get("session")
    if not session:
        return
    keyboard = [[InlineKeyboardButton("Extend 5 min", callback_data="extend_session")],
                [InlineKeyboardButton("End Session", callback_data="end_session")]]
    await context.bot.send_message(chat_id, "30 minutes up!", reply_markup=InlineKeyboardMarkup(keyboard))

async def extend_session_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()
    session: SessionState = context.chat_data.get("session")
    if not session or session.extended:
        return
    job = context.job_queue.run_once(session_timeout, when=timedelta(minutes=5), chat_id=query.message.chat_id)
    session.session_job = job.id
    session.extended = True
    await query.edit_message_text("Extended 5 minutes")

async def prompt_next(chat_id: int, context: ContextTypes.DEFAULT_TYPE) -> None:
    session: SessionState = context.application.chat_data[chat_id].get("session")
    user = await get_user(context, chat_id)
    day = PROGRAM[session.day_index]
    if session.exercise_idx >= len(day["exercises"]):
        await end_session(chat_id, context)
        return
    ex = day["exercises"][session.exercise_idx]
    if ex["type"] == "progression":
        target = user.lifts[ex["key"]].target_weight_kg
        await context.bot.send_message(chat_id, f"{ex['name']} Set {session.set_idx+1}/5 — target 5 reps @ {target}kg. Send 'weight reps'.")
    elif ex["type"] == "accessory":
        kb = InlineKeyboardMarkup([[InlineKeyboardButton("Done", callback_data="accessory_done"),
                                    InlineKeyboardButton("Skipped", callback_data="accessory_skipped")]])
        await context.bot.send_message(chat_id, f"Accessory: {ex['name']}", reply_markup=kb)
    else:
        await context.bot.send_message(chat_id, f"Warm-up: {ex['description']}")
        session.exercise_idx += 1
        await prompt_next(chat_id, context)

async def message_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    session: SessionState = context.chat_data.get("session")
    if not session:
        return
    chat_id = update.effective_chat.id
    user = await get_user(context, chat_id)
    day = PROGRAM[session.day_index]
    ex = day["exercises"][session.exercise_idx]
    if ex["type"] != "progression":
        return
    text = update.message.text.strip().replace(",", " ")
    parts = text.lower().replace("kg", "").split()
    if len(parts) != 2:
        await update.message.reply_text("Send 'weight reps'")
        return
    try:
        weight = float(parts[0])
        reps = int(parts[1])
    except ValueError:
        await update.message.reply_text("Couldn't parse numbers")
        return
    entry = LiftHistoryEntry(date=datetime.now().date().isoformat(), set_index=session.set_idx+1, weight_kg=weight, reps=reps)
    session.results.setdefault(ex["key"], []).append(entry)
    await update.message.reply_text("Logged")
    job = context.job_queue.run_once(rest_done, when=timedelta(seconds=90), chat_id=chat_id)
    session.rest_job = job.id
    kb = InlineKeyboardMarkup([[InlineKeyboardButton("Skip Rest", callback_data="skip_rest")]])
    await context.bot.send_message(chat_id, "Rest 90 sec", reply_markup=kb)

async def rest_done(context: ContextTypes.DEFAULT_TYPE) -> None:
    chat_id = context.job.chat_id
    await context.bot.send_message(chat_id, "Rest over")
    await continue_after_rest(chat_id, context)

async def skip_rest_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()
    await query.edit_message_text("Rest skipped")
    await continue_after_rest(query.message.chat_id, context)

async def continue_after_rest(chat_id: int, context: ContextTypes.DEFAULT_TYPE) -> None:
    session: SessionState = context.application.chat_data[chat_id].get("session")
    if not session:
        return
    session.set_idx += 1
    day = PROGRAM[session.day_index]
    ex = day["exercises"][session.exercise_idx]
    if ex["type"] == "progression" and session.set_idx < 5:
        await prompt_next(chat_id, context)
    else:
        session.set_idx = 0
        session.exercise_idx += 1
        await prompt_next(chat_id, context)

async def accessory_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()
    chat_id = query.message.chat_id
    session: SessionState = context.chat_data.get("session")
    day = PROGRAM[session.day_index]
    ex = day["exercises"][session.exercise_idx]
    result = query.data.split("_")[1]
    session.results.setdefault(ex["key"], []).append(result)
    await query.edit_message_text(f"Accessory {result}")
    session.exercise_idx += 1
    await prompt_next(chat_id, context)

async def end_session_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()
    await end_session(query.message.chat_id, context)

async def end_session(chat_id: int, context: ContextTypes.DEFAULT_TYPE) -> None:
    session: SessionState = context.application.chat_data[chat_id].pop("session", None)
    if not session:
        return
    user = await get_user(context, chat_id)
    day = PROGRAM[session.day_index]
    summaries: List[str] = []
    next_targets: List[str] = []
    success_count = 0
    total_prog = 0
    for ex in day["exercises"]:
        if ex["type"] == "progression":
            total_prog += 1
            sets = session.results.get(ex["key"], [])
            success = len(sets) == 5 and all(s.reps >= 5 and s.weight_kg >= user.lifts[ex["key"]].target_weight_kg for s in sets)
            user.lifts[ex["key"]].history.extend(sets)
            user.lifts[ex["key"]].last_result = "success" if success else "fail"
            if success:
                user.lifts[ex["key"]].target_weight_kg = round_weight(user.lifts[ex["key"]].target_weight_kg + 1.25)
                success_count += 1
            summaries.extend(
                [
                    f"{ex['name']},{s.set_index},{s.weight_kg},{s.reps},{'✓' if s.reps>=5 else '✗'}"
                    for s in sets
                ]
            )
            next_targets.append(f"{ex['name']}={user.lifts[ex['key']].target_weight_kg}kg")
        elif ex["type"] == "accessory":
            for res in session.results.get(ex["key"], []):
                summaries.append(f"ACCESSORY,{ex['name']},{res}")
    user.current_day_index = (user.current_day_index + 1) % 3
    date_str = datetime.now().date().isoformat()
    csv_lines = [f"DATE,{date_str}", f"DAY,{day['name']}"] + summaries + [f"NEXT_TARGETS,{';'.join(next_targets)}"]
    csv_text = "\n".join(csv_lines)
    await context.bot.send_message(chat_id, csv_text)
    success_rate = success_count / total_prog if total_prog else 0
    user.last_sessions.append({"date": date_str, "day": day['name'], "success_rate": success_rate})
    user.last_sessions = user.last_sessions[-10:]
    await save_user(user)
    recap = "; ".join(next_targets)
    await context.bot.send_message(chat_id, f"{day['name']} complete. {recap}. Next: {PROGRAM[user.current_day_index]['name']}")

async def main() -> None:
    token = os.getenv("TELEGRAM_BOT_TOKEN")
    if not token:
        raise RuntimeError("TELEGRAM_BOT_TOKEN not set")
    app = (
        ApplicationBuilder()
        .token(token)
        .rate_limiter(AIORateLimiter())
        .build()
    )

    app.add_handler(CommandHandler("start", cmd_start))
    app.add_handler(CommandHandler("help", cmd_help))
    app.add_handler(CommandHandler("plan", cmd_plan))
    app.add_handler(CommandHandler("stats", cmd_stats))
    app.add_handler(CommandHandler("reset", cmd_reset))
    app.add_handler(CommandHandler("begin", cmd_begin))

    app.add_handler(CallbackQueryHandler(start_session_callback, pattern="^start_session$"))
    app.add_handler(CallbackQueryHandler(extend_session_callback, pattern="^extend_session$"))
    app.add_handler(CallbackQueryHandler(end_session_callback, pattern="^end_session$"))
    app.add_handler(CallbackQueryHandler(skip_rest_callback, pattern="^skip_rest$"))
    app.add_handler(CallbackQueryHandler(accessory_callback, pattern="^accessory_"))
    app.add_handler(CallbackQueryHandler(reset_callback, pattern="^reset:"))

    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, message_handler))

    await app.initialize()
    await app.start()
    logger.info("Bot started")
    await app.updater.start_polling()
    await app.updater.idle()

if __name__ == "__main__":
    asyncio.run(main())
