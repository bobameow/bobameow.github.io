const EDUCATION_LABELS = {
  hs: 'High School',
  someCollege: 'Some College',
  bachelors: "Bachelor's",
  advanced: 'Advanced Degree',
  none: 'None',
  secondary: 'Secondary/GCSE',
  diploma: 'Diploma',
  degree: 'Degree',
  postgrad: 'Postgraduate',
  other: 'Other',
};

const dashboards = {
  usa: {
    name: 'United States',
    populationMillions: 342,
    demographicData: [
      { age: '0-4', male: 3.0, female: 2.9 },
      { age: '5-9', male: 3.1, female: 3.0 },
      { age: '10-14', male: 3.3, female: 3.1 },
      { age: '15-19', male: 3.3, female: 3.1 },
      { age: '20-24', male: 3.2, female: 3.1 },
      { age: '25-29', male: 3.4, female: 3.2 },
      { age: '30-34', male: 3.5, female: 3.4 },
      { age: '35-39', male: 3.4, female: 3.3 },
      { age: '40-44', male: 3.2, female: 3.1 },
      { age: '45-49', male: 3.0, female: 3.0 },
      { age: '50-54', male: 2.9, female: 3.0 },
      { age: '55-59', male: 2.8, female: 3.0 },
      { age: '60-64', male: 2.7, female: 3.0 },
      { age: '65-69', male: 2.4, female: 2.7 },
      { age: '70-74', male: 2.0, female: 2.3 },
      { age: '75-79', male: 1.5, female: 1.8 },
      { age: '80-84', male: 1.0, female: 1.4 },
      { age: '85+', male: 0.8, female: 1.4 },
    ],
    profiles: {
      average: {
        label: 'Average American',
        description: 'The baseline demographic profile.',
        netWorth: '$192,900 (Median)',
        education: { hs: 28, someCollege: 26, bachelors: 23, advanced: 14, none: 9 },
        timeUse: [
          { name: 'Productive (Work/Edu)', value: 8.1, color: '#3b82f6' },
          { name: 'Maintenance (Sleep/Eat)', value: 11.5, color: '#10b981' },
          { name: 'Restorative (Leisure)', value: 4.4, color: '#f59e0b' },
          { name: 'Household (Chores)', value: 1.8, color: '#8b5cf6' },
        ],
      },
      top1: {
        label: 'The Top 1%',
        description: 'Wealth > $11M. Highly educated, older skew.',
        netWorth: '$11,600,000+',
        education: { hs: 2, someCollege: 5, bachelors: 35, advanced: 58, none: 0 },
        timeUse: [
          { name: 'Productive (Work)', value: 9.2, color: '#3b82f6' },
          { name: 'Maintenance', value: 10.5, color: '#10b981' },
          { name: 'Restorative', value: 3.5, color: '#f59e0b' },
          { name: 'Household (Outsourced)', value: 0.8, color: '#8b5cf6' },
        ],
      },
      top10: {
        label: 'Top 9% (Upper Class)',
        description: 'Wealth $1.6M - $11M. Professionals, managers.',
        netWorth: '$1,600,000 - $11M',
        education: { hs: 10, someCollege: 15, bachelors: 40, advanced: 35, none: 0 },
        timeUse: [
          { name: 'Productive', value: 8.5, color: '#3b82f6' },
          { name: 'Maintenance', value: 11.0, color: '#10b981' },
          { name: 'Restorative', value: 3.0, color: '#f59e0b' },
          { name: 'Household', value: 1.5, color: '#8b5cf6' },
        ],
      },
      middle40: {
        label: 'Middle 40%',
        description: 'Wealth $160k - $1.6M. The core workforce.',
        netWorth: '$160,000 - $1.6M',
        education: { hs: 25, someCollege: 35, bachelors: 30, advanced: 10, none: 0 },
        timeUse: [
          { name: 'Productive', value: 8.0, color: '#3b82f6' },
          { name: 'Maintenance', value: 11.2, color: '#10b981' },
          { name: 'Restorative', value: 2.8, color: '#f59e0b' },
          { name: 'Household', value: 2.0, color: '#8b5cf6' },
        ],
      },
      bottom50: {
        label: 'Bottom 50%',
        description: 'Wealth < $160k. Younger or lower income.',
        netWorth: '< $160,000',
        education: { hs: 45, someCollege: 30, bachelors: 15, advanced: 5, none: 5 },
        timeUse: [
          { name: 'Productive', value: 7.5, color: '#3b82f6' },
          { name: 'Maintenance', value: 11.5, color: '#10b981' },
          { name: 'Restorative', value: 2.5, color: '#f59e0b' },
          { name: 'Household', value: 2.5, color: '#8b5cf6' },
        ],
      },
      elderly: {
        label: 'Age 65+ (Retired)',
        description: 'The wealth holders. High leisure, low work.',
        netWorth: '$410,000 (Median)',
        education: { hs: 30, someCollege: 25, bachelors: 25, advanced: 20, none: 0 },
        timeUse: [
          { name: 'Productive', value: 0.5, color: '#3b82f6' },
          { name: 'Maintenance', value: 12.0, color: '#10b981' },
          { name: 'Restorative (TV/Leisure)', value: 8.0, color: '#f59e0b' },
          { name: 'Household', value: 3.5, color: '#8b5cf6' },
        ],
      },
    },
    sectors: [
      { name: 'Service & Retail', share: 13, gdpShare: 14, bottom: 70, middle: 25, top: 5, ageLabel: 'Young (18-35)', avgAge: 32, type: 'market', desc: 'Gig economy, retail, hospitality.' },
      { name: 'Manufacturing & Trades', share: 8.5, gdpShare: 11, bottom: 45, middle: 50, top: 5, ageLabel: 'Mixed (25-55)', avgAge: 41, type: 'market', desc: 'Construction, logistics, production.' },
      { name: 'Healthcare & Pharma', share: 7.5, gdpShare: 17, bottom: 30, middle: 55, top: 15, ageLabel: 'Middle (30-60)', avgAge: 43, type: 'market', desc: 'Nursing, R&D, specialized care.' },
      { name: 'Education & Academia', share: 5.5, gdpShare: 5, bottom: 35, middle: 55, top: 10, ageLabel: 'Older (40+)', avgAge: 45, type: 'market', desc: 'Teachers, Professors, Research.' },
      { name: 'Finance & Corporate', share: 6, gdpShare: 21, bottom: 15, middle: 55, top: 30, ageLabel: 'Middle (30-55)', avgAge: 42, type: 'market', desc: 'Banking, Law, Management.' },
      { name: 'Tech & Innovation', share: 5, gdpShare: 15, bottom: 20, middle: 50, top: 30, ageLabel: 'Young (22-40)', avgAge: 34, type: 'market', desc: 'Software, Biotech, Startups.' },
      { name: 'Agriculture & Food', share: 4.5, gdpShare: 5, bottom: 60, middle: 35, top: 5, ageLabel: 'Older (50+)', avgAge: 52, type: 'market', desc: 'Farming, Processing, Supply.' },
      { name: 'Pre-Work / Students', share: 23, gdpShare: 0, bottom: 85, middle: 14, top: 1, ageLabel: 'Young (<22)', avgAge: 14, type: 'non-market', desc: 'Children, K-12, College Students.' },
      { name: 'Retired', share: 18, gdpShare: 0, bottom: 30, middle: 55, top: 15, ageLabel: 'Senior (65+)', avgAge: 72, type: 'non-market', desc: 'Retirees, Pensioners.' },
      { name: 'Homemakers / Non-Labor', share: 9, gdpShare: 0, bottom: 60, middle: 35, top: 5, ageLabel: 'Mixed', avgAge: 40, type: 'non-market', desc: 'Unpaid care, Unemployed, Disabled.' },
    ],
  },
  china: {
    name: 'China',
    populationMillions: 1410,
    demographicData: [
      { age: '0-4', male: 2.3, female: 2.1 },
      { age: '5-9', male: 2.6, female: 2.4 },
      { age: '10-14', male: 2.9, female: 2.6 },
      { age: '15-19', male: 3.0, female: 2.7 },
      { age: '20-24', male: 3.1, female: 2.8 },
      { age: '25-29', male: 3.4, female: 3.1 },
      { age: '30-34', male: 4.1, female: 3.8 },
      { age: '35-39', male: 4.3, female: 4.1 },
      { age: '40-44', male: 3.9, female: 3.8 },
      { age: '45-49', male: 3.8, female: 3.7 },
      { age: '50-54', male: 4.2, female: 4.1 },
      { age: '55-59', male: 4.1, female: 4.1 },
      { age: '60-64', male: 3.5, female: 3.6 },
      { age: '65-69', male: 2.8, female: 3.0 },
      { age: '70-74', male: 2.1, female: 2.3 },
      { age: '75-79', male: 1.4, female: 1.7 },
      { age: '80-84', male: 0.8, female: 1.1 },
      { age: '85+', male: 0.5, female: 0.9 },
    ],
    profiles: {
      average: {
        label: 'Average Urban Worker',
        description: 'Baseline urban wage earner.',
        netWorth: '¥350,000 (Median Urban Household)',
        education: { hs: 35, someCollege: 25, bachelors: 20, advanced: 5, none: 15 },
        timeUse: [
          { name: 'Productive (Work)', value: 9.5, color: '#ef4444' },
          { name: 'Maintenance', value: 11.0, color: '#10b981' },
          { name: 'Restorative (Leisure)', value: 2.5, color: '#f59e0b' },
          { name: 'Household', value: 1.0, color: '#8b5cf6' },
        ],
      },
      manufacturing: {
        label: 'Factory / Trades',
        description: 'Core of export machine.',
        netWorth: '¥250,000',
        education: { hs: 50, someCollege: 20, bachelors: 10, advanced: 2, none: 18 },
        timeUse: [
          { name: 'Productive (Shifts)', value: 10.5, color: '#ef4444' },
          { name: 'Maintenance', value: 10.0, color: '#10b981' },
          { name: 'Restorative', value: 2.0, color: '#f59e0b' },
          { name: 'Household', value: 1.5, color: '#8b5cf6' },
        ],
      },
      tech: {
        label: 'Tech / Platform',
        description: '996 culture, high pay.',
        netWorth: '¥1,200,000',
        education: { hs: 5, someCollege: 10, bachelors: 55, advanced: 30, none: 0 },
        timeUse: [
          { name: 'Productive (996)', value: 11.0, color: '#ef4444' },
          { name: 'Maintenance', value: 9.0, color: '#10b981' },
          { name: 'Restorative (Minimal)', value: 2.5, color: '#f59e0b' },
          { name: 'Household', value: 1.5, color: '#8b5cf6' },
        ],
      },
      rural: {
        label: 'Rural / Migrant',
        description: 'Lower income, remittance focused.',
        netWorth: '¥80,000',
        education: { hs: 20, someCollege: 8, bachelors: 3, advanced: 1, none: 68 },
        timeUse: [
          { name: 'Productive (Manual)', value: 9.0, color: '#ef4444' },
          { name: 'Maintenance', value: 11.5, color: '#10b981' },
          { name: 'Restorative', value: 2.0, color: '#f59e0b' },
          { name: 'Household', value: 1.5, color: '#8b5cf6' },
        ],
      },
      elderly: {
        label: 'Age 60+ (Retired)',
        description: 'Grandchild care is primary duty.',
        netWorth: '¥400,000 (Median)',
        education: { hs: 20, someCollege: 5, bachelors: 5, advanced: 1, none: 69 },
        timeUse: [
          { name: 'Productive (Care/Farm)', value: 3.5, color: '#ef4444' },
          { name: 'Maintenance', value: 12.0, color: '#10b981' },
          { name: 'Restorative (Park/TV)', value: 5.5, color: '#f59e0b' },
          { name: 'Household (Cooking)', value: 3.0, color: '#8b5cf6' },
        ],
      },
    },
    sectors: [
      { name: 'Manufacturing (World Factory)', share: 15, gdpShare: 27, bottom: 60, middle: 35, top: 5, ageLabel: 'Young/Mid (18-45)', avgAge: 36, type: 'market', desc: 'Electronics, Auto, Textiles, Solar.' },
      { name: 'Agriculture & Rural', share: 16, gdpShare: 7, bottom: 90, middle: 9, top: 1, ageLabel: 'Older (50+)', avgAge: 55, type: 'market', desc: 'Farming, Food security base.' },
      { name: 'Services & Retail (E-comm)', share: 14, gdpShare: 25, bottom: 65, middle: 30, top: 5, ageLabel: 'Young (20-35)', avgAge: 29, type: 'market', desc: 'Delivery (Meituan), Retail, Hospitality.' },
      { name: 'Construction & Real Estate', share: 6, gdpShare: 13, bottom: 70, middle: 25, top: 5, ageLabel: 'Mid (30-50)', avgAge: 44, type: 'market', desc: 'Infrastructure, Housing, Urbanization.' },
      { name: 'Tech & Digital Econ', share: 2, gdpShare: 10, bottom: 10, middle: 50, top: 40, ageLabel: 'Young (22-35)', avgAge: 28, type: 'market', desc: 'Platforms, AI, Fintech (996 culture).' },
      { name: 'State Enterprise & Gov', share: 4, gdpShare: 15, bottom: 10, middle: 60, top: 30, ageLabel: 'Older (40+)', avgAge: 46, type: 'market', desc: 'SOEs, Civil Service, Utilities.' },
      { name: 'Students (Pre-Work)', share: 18, gdpShare: 0, bottom: 50, middle: 40, top: 10, ageLabel: 'Young (<22)', avgAge: 15, type: 'non-market', desc: 'Gaokao prep, University expansion.' },
      { name: 'Retired / Elderly', share: 20, gdpShare: 0, bottom: 45, middle: 45, top: 10, ageLabel: 'Senior (60+)', avgAge: 74, type: 'non-market', desc: 'Pensioners, Rural elderly.' },
      { name: 'Homemakers / Care', share: 5, gdpShare: 0, bottom: 60, middle: 35, top: 5, ageLabel: 'Mixed', avgAge: 38, type: 'non-market', desc: 'Full time parenting, Unemployed.' },
    ],
  },
  singapore: {
    name: 'Singapore',
    populationMillions: 6.04,
    demographicData: [
      { age: '0-4', male: 1.8, female: 1.7 },
      { age: '5-9', male: 2.0, female: 1.9 },
      { age: '10-14', male: 2.1, female: 2.0 },
      { age: '15-19', male: 2.2, female: 2.1 },
      { age: '20-24', male: 2.6, female: 2.4 },
      { age: '25-29', male: 3.6, female: 3.4 },
      { age: '30-34', male: 4.5, female: 4.2 },
      { age: '35-39', male: 4.6, female: 4.5 },
      { age: '40-44', male: 4.2, female: 4.3 },
      { age: '45-49', male: 3.9, female: 4.0 },
      { age: '50-54', male: 3.6, female: 3.7 },
      { age: '55-59', male: 3.4, female: 3.5 },
      { age: '60-64', male: 3.1, female: 3.2 },
      { age: '65-69', male: 2.8, female: 2.9 },
      { age: '70-74', male: 2.1, female: 2.3 },
      { age: '75-79', male: 1.2, female: 1.5 },
      { age: '80-84', male: 0.8, female: 1.1 },
      { age: '85+', male: 0.6, female: 1.0 },
    ],
    profiles: {
      average: {
        label: 'Median Resident',
        description: 'HDB 4-Room Dweller. CPF heavy.',
        netWorth: 'S$380,000 (Median)',
        education: { secondary: 20, diploma: 35, degree: 35, postgrad: 10, other: 0 },
        timeUse: [
          { name: 'Productive (Work)', value: 9.0, color: '#3b82f6' },
          { name: 'Maintenance (Sleep/Eat)', value: 11.0, color: '#10b981' },
          { name: 'Restorative (Leisure)', value: 2.5, color: '#f59e0b' },
          { name: 'Household (Chores)', value: 1.5, color: '#8b5cf6' },
        ],
      },
      top1: {
        label: 'Top 1% (Landed/D9-10)',
        description: 'Wealth > S$10M. Landed Property / GCB.',
        netWorth: 'S$12,500,000+',
        education: { secondary: 5, diploma: 10, degree: 45, postgrad: 40, other: 0 },
        timeUse: [
          { name: 'Productive (Biz/Work)', value: 10.0, color: '#3b82f6' },
          { name: 'Maintenance', value: 10.5, color: '#10b981' },
          { name: 'Restorative (Social)', value: 3.0, color: '#f59e0b' },
          { name: 'Household (Helper)', value: 0.5, color: '#8b5cf6' },
        ],
      },
      top15: {
        label: 'Top 15% (Condo/Upper)',
        description: 'Private Condo Owners. Professionals/Expats.',
        netWorth: 'S$2M - S$8M',
        education: { secondary: 5, diploma: 20, degree: 50, postgrad: 25, other: 0 },
        timeUse: [
          { name: 'Productive', value: 9.5, color: '#3b82f6' },
          { name: 'Maintenance', value: 10.5, color: '#10b981' },
          { name: 'Restorative', value: 2.5, color: '#f59e0b' },
          { name: 'Household (Helper)', value: 1.5, color: '#8b5cf6' },
        ],
      },
      middle: {
        label: 'Middle (HDB 3/4/5)',
        description: 'The Heartland Core. Dual Income.',
        netWorth: 'S$300k - S$1M',
        education: { secondary: 25, diploma: 40, degree: 30, postgrad: 5, other: 0 },
        timeUse: [
          { name: 'Productive', value: 8.8, color: '#3b82f6' },
          { name: 'Maintenance', value: 11.2, color: '#10b981' },
          { name: 'Restorative (Hawker/TV)', value: 2.0, color: '#f59e0b' },
          { name: 'Household', value: 2.0, color: '#8b5cf6' },
        ],
      },
      elderly: {
        label: 'Pioneer/Merdeka (65+)',
        description: 'Asset rich (HDB), CPF Life dependents.',
        netWorth: 'S$450,000 (Asset Heavy)',
        education: { secondary: 50, diploma: 10, degree: 10, postgrad: 5, other: 25 },
        timeUse: [
          { name: 'Productive (Active Ageing)', value: 1.0, color: '#3b82f6' },
          { name: 'Maintenance', value: 12.0, color: '#10b981' },
          { name: 'Restorative (Kopi)', value: 8.0, color: '#f59e0b' },
          { name: 'Household', value: 3.0, color: '#8b5cf6' },
        ],
      },
      student: {
        label: 'Student (Gen Z/Alpha)',
        description: 'High academic pressure (Tuition culture).',
        netWorth: 'Dependent',
        education: { secondary: 40, diploma: 30, degree: 30, postgrad: 0, other: 0 },
        timeUse: [
          { name: 'Productive (School+Tuition)', value: 10.0, color: '#3b82f6' },
          { name: 'Maintenance', value: 10.0, color: '#10b981' },
          { name: 'Restorative (Phone/Game)', value: 3.0, color: '#f59e0b' },
          { name: 'Household', value: 1.0, color: '#8b5cf6' },
        ],
      },
    },
    sectors: [
      { name: 'Finance & Fintech', share: 9, gdpShare: 14, bottom: 10, middle: 50, top: 40, ageLabel: '28-50', avgAge: 35, type: 'market', desc: 'Banking, Wealth Mgmt, Crypto/Web3.' },
      { name: 'Manufacturing & Precision', share: 12, gdpShare: 20, bottom: 50, middle: 40, top: 10, ageLabel: 'Mixed', avgAge: 42, type: 'market', desc: 'Semicon, Biomed, Aero, Chemicals.' },
      { name: 'Maritime & Logistics', share: 6, gdpShare: 10, bottom: 40, middle: 50, top: 10, ageLabel: '35-55', avgAge: 45, type: 'market', desc: 'Port Ops, Aviation, Supply Chain.' },
      { name: 'Service & Retail', share: 15, gdpShare: 10, bottom: 70, middle: 25, top: 5, ageLabel: 'Young/Old', avgAge: 38, type: 'market', desc: 'F&B, Hospitality, Retail.' },
      { name: 'Tech & Startups', share: 7, gdpShare: 8, bottom: 20, middle: 50, top: 30, ageLabel: 'Young (24-40)', avgAge: 32, type: 'market', desc: 'Software, Platform, AI.' },
      { name: 'Construction & Marine', share: 9, gdpShare: 4, bottom: 90, middle: 8, top: 2, ageLabel: '20-45', avgAge: 33, type: 'market', desc: 'Infrastructure, BTOs, Shipyards.' },
      { name: 'Students', share: 16, gdpShare: 0, bottom: 80, middle: 19, top: 1, ageLabel: '4-23', avgAge: 14, type: 'non-market', desc: 'Pri/Sec/Poly/Uni. Future Human Capital.' },
      { name: 'National Service (NSF)', share: 1.5, gdpShare: 0, bottom: 90, middle: 10, top: 0, ageLabel: '18-22', avgAge: 20, type: 'non-market', desc: 'Mandatory Conscription. Defense.' },
      { name: 'Retirees (Silver)', share: 18, gdpShare: 0, bottom: 40, middle: 50, top: 10, ageLabel: '65+', avgAge: 74, type: 'non-market', desc: 'CPF Life recipients, Aged.' },
      { name: 'Homemakers / Others', share: 6.5, gdpShare: 0, bottom: 60, middle: 35, top: 5, ageLabel: 'Mixed', avgAge: 45, type: 'non-market', desc: 'Caregivers, Unemployed.' },
    ],
  },
};

function formatEducationList(education) {
  return Object.entries(education).map(([key, value]) => ({
    label: EDUCATION_LABELS[key] || key,
    value,
  }));
}

function renderDemographics(container, data) {
  container.innerHTML = '';
  data.forEach((row) => {
    const total = row.male + row.female;
    const wrapper = document.createElement('div');
    wrapper.className = 'bar-row';
    wrapper.innerHTML = `
      <div style="width:85px; font-weight:600;">${row.age}</div>
      <div class="bar-track">
        <div class="bar-segment male" style="width:${(row.male / total) * 100}%"></div>
        <div class="bar-segment female" style="width:${(row.female / total) * 100}%"></div>
      </div>
      <div style="width:70px; text-align:right; font-family:monospace;">${total.toFixed(1)}%</div>
    `;
    container.appendChild(wrapper);
  });
}

function renderEducation(container, education) {
  container.innerHTML = '';
  formatEducationList(education).forEach((item) => {
    const row = document.createElement('li');
    row.innerHTML = `
      <span>${item.label}</span>
      <div class="bar-track" style="max-width:220px">
        <div class="bar-segment middle" style="width:${item.value}%"></div>
      </div>
      <strong style="min-width:48px; text-align:right;">${item.value}%</strong>
    `;
    container.appendChild(row);
  });
}

function renderTimeUse(container, timeUse) {
  container.innerHTML = '';
  timeUse.forEach((item) => {
    const row = document.createElement('li');
    row.innerHTML = `
      <span>${item.name}</span>
      <div class="bar-track" style="max-width:220px">
        <div class="bar-segment bottom" style="width:${(item.value / 24) * 100}%"></div>
      </div>
      <strong style="min-width:48px; text-align:right;">${item.value}h</strong>
    `;
    container.appendChild(row);
  });
}

function renderSectors(container, sectors, populationMillions) {
  container.innerHTML = '';
  sectors.forEach((sector) => {
    const people = ((sector.share / 100) * populationMillions).toFixed(populationMillions > 10 ? 1 : 2);
    const card = document.createElement('div');
    card.className = 'sector-card';
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem;">
        <div>
          <strong>${sector.name}</strong>
          <div class="sector-meta">
            <span>${sector.share}% pop (~${people}M)</span>
            ${sector.gdpShare ? `<span>${sector.gdpShare}% GDP</span>` : ''}
            <span class="badge">${sector.ageLabel}</span>
            ${sector.type === 'non-market' ? '<span class="badge">Non-market</span>' : ''}
          </div>
          <p style="margin:0.3rem 0 0; color:#555;">${sector.desc}</p>
        </div>
      </div>
      <div class="bar-track" style="margin:0.6rem 0; height:14px;">
        <div class="bar-segment bottom" style="width:${sector.bottom}%"></div>
        <div class="bar-segment middle" style="width:${sector.middle}%"></div>
        <div class="bar-segment top" style="width:${sector.top}%"></div>
      </div>
    `;
    container.appendChild(card);
  });
}

function setProfile(activeKey, data) {
  const profileButtons = document.querySelectorAll('[data-profile-key]');
  profileButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.profileKey === activeKey);
  });

  const profile = data.profiles[activeKey];
  document.getElementById('profile-title').textContent = profile.label;
  document.getElementById('profile-networth').textContent = profile.netWorth;
  document.getElementById('profile-description').textContent = profile.description;

  renderEducation(document.getElementById('education-list'), profile.education);
  renderTimeUse(document.getElementById('timeuse-list'), profile.timeUse);
}

function initDashboard() {
  const params = new URLSearchParams(window.location.search);
  const countryKey = (params.get('country') || 'USA').toLowerCase();
  const data = dashboards[countryKey];

  const titleEl = document.getElementById('page-title');
  const descEl = document.getElementById('page-description');
  const demographicContainer = document.getElementById('demographic-rows');
  const sectorContainer = document.getElementById('sector-cards');
  const profileSelector = document.getElementById('profile-selector');

  if (!data) {
    titleEl.textContent = 'Dashboard not found';
    descEl.textContent = 'Choose a country from the home page.';
    return;
  }

  titleEl.textContent = `${data.name} cognitive & demographic dashboard`;
  descEl.textContent = `Population focus: ${data.populationMillions}M | Choose a profile to see time use, education, and sector mix.`;

  profileSelector.innerHTML = '';
  Object.entries(data.profiles).forEach(([key, profile]) => {
    const btn = document.createElement('button');
    btn.className = 'profile-button';
    btn.dataset.profileKey = key;
    btn.innerHTML = `<strong>${profile.label}</strong><small>${profile.netWorth}</small>`;
    btn.addEventListener('click', () => setProfile(key, data));
    profileSelector.appendChild(btn);
  });

  renderDemographics(demographicContainer, data.demographicData);
  renderSectors(sectorContainer, data.sectors, data.populationMillions);
  setProfile(Object.keys(data.profiles)[0], data);
}

document.addEventListener('DOMContentLoaded', initDashboard);
