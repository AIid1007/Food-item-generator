/* =========================================================================
   RASOI RANDOMIZER — Application
   Vanilla JS · no framework · no external AI · localStorage only
   ========================================================================= */

(function () {
  'use strict';

  /* ---- SVG icons (inline, no CDN) ----------------------------------- */
  const icons = {
    sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
    unlock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-15.4 6.4L3 16"/><path d="M3 12a9 9 0 0 1 15.4-6.4L21 8"/><path d="M21 4v4h-4"/><path d="M3 20v-4h4"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
    more: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    library: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
    diya: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 16c0 2.5 4 4 9 4s9-1.5 9-4"/><path d="M3 16h18"/><path d="M12 12c-1-2-2-3-2-5a2 2 0 0 1 4 0c0 2-1 3-2 5z" fill="currentColor"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M6 6v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5M12 3v12"/></svg>',
    printer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',
    externalLink: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14L21 3"/></svg>',
    monthGrid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M9 14h.01M13 14h.01M17 14h.01M9 18h.01M13 18h.01"/></svg>',
  };

  // The jharokha arch — design signature
  const jharokhaArch = `<svg class="cell-arch" viewBox="0 0 60 16" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 16 L0 12 Q0 8 4 8 Q8 8 8 4 Q14 0 20 4 Q24 0 30 2 Q36 0 40 4 Q46 0 52 4 Q52 8 56 8 Q60 8 60 12 L60 16 Z" fill="currentColor" opacity="0.9"/>
    <circle cx="30" cy="6" r="1.2" fill="currentColor"/>
  </svg>`;

  const emptyJharokha = `<svg class="empty-arch" viewBox="0 0 96 96" aria-hidden="true">
    <path d="M48 88 L48 16 Q48 8 40 8 Q32 8 32 16 Q20 24 20 40 L20 88 L48 88 Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <path d="M48 88 L48 16 Q48 8 56 8 Q64 8 64 16 Q76 24 76 40 L76 88 L48 88 Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="48" cy="12" r="2" fill="currentColor"/>
    <path d="M30 40 Q48 28 66 40" fill="none" stroke="currentColor" stroke-width="1"/>
  </svg>`;

  /* ---- Storage ------------------------------------------------------- */
  const STORAGE_KEY = 'rasoi-randomizer-v1';

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to load state', e);
      return null;
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state', e);
      toast('Could not save — storage full?', 'error');
    }
  }

  /* ---- State --------------------------------------------------------- */
  let state = null;

  function defaultState() {
    return {
      version: 1,
      onboarded: false,
      household: {
        members: [
          { id: 'm1', name: 'Member 1', diet_tags: ['veg'], allergies: [], loves: [], hates: [] }
        ],
        member_count: 4,
        global_diet: ['veg'], // applied to all
      },
      slots: [
        { id: 'breakfast', label: 'Breakfast',  enabled: true,  time: '08:00' },
        { id: 'lunch',     label: 'Lunch',      enabled: true,  time: '13:00' },
        { id: 'snacks',    label: 'Snacks',     enabled: true,  time: '17:00' },
        { id: 'dinner',    label: 'Dinner',     enabled: true,  time: '20:00' },
      ],
      default_cooldown_days: 5,
      cuisine_bias: {}, // {slot_id: [cuisine]}
      library: window.SEED_LIBRARY.slice(),  // copy
      custom_dishes: [],
      plan: {}, // { "2026-06-22": { breakfast: { dish_id, locked, status }, ... } }
      day_overrides: {}, // { "2026-06-22": { mode: 'fasting', source: 'user', note?: '' } }
      history: [], // [{date, slot_id, dish_id, status, recorded_at}]
      settings: {
        weekend_heavy_bias: true,
        weekday_quick_bias: true,
        cuisine_balance: true,
      },
      ui: {
        current_view: 'today',
        week_offset: 0, // 0 = current week
        month_offset: 0, // 0 = current month
      },
      festivals: [], // populated from SEED_FESTIVALS at boot; user-editable
    };
  }

  /* ---- Date helpers ------------------------------------------------- */
  function today() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }
  function ymd(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
  function parseYmd(s) {
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function isWeekend(d) { const dow = d.getDay(); return dow === 0 || dow === 6; }
  function dayName(d, short) { return d.toLocaleDateString('en-US', { weekday: short ? 'short' : 'long' }); }
  function monthName(d, short) { return d.toLocaleDateString('en-US', { month: short ? 'short' : 'long' }); }
  function startOfWeek(d) {
    const x = new Date(d);
    const dow = x.getDay();
    const diff = dow === 0 ? -6 : 1 - dow; // Monday as week start
    x.setDate(x.getDate() + diff);
    x.setHours(0, 0, 0, 0);
    return x;
  }
  function weekDates(offset) {
    const start = addDays(startOfWeek(today()), offset * 7);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }

  /* ---- Generation algorithm ----------------------------------------- */

  // Returns the merged diet rule set for a given date, considering members + day overrides
  function activeDietRules(dateStr) {
    const rules = { vegan: false, NOG: false, vrat: false, festive: false };

    // Member-level merging (most restrictive)
    const allDiets = state.household.global_diet.concat();
    state.household.members.forEach(m => allDiets.push(...m.diet_tags));

    if (allDiets.includes('vegan')) rules.vegan = true;
    if (allDiets.includes('no-onion-garlic')) rules.NOG = true;

    // Day overrides
    const ov = state.day_overrides[dateStr];
    if (ov) {
      if (ov.mode === 'vegan') rules.vegan = true;
      if (ov.mode === 'no-onion-garlic') rules.NOG = true;
      if (ov.mode === 'fasting') { rules.vrat = true; rules.NOG = true; }
      if (ov.mode === 'festive') rules.festive = true;
    }

    return rules;
  }

  function satisfiesDiet(dish, rules) {
    if (rules.vegan && !dish.tags.includes('vegan')) {
      // Reject dishes with dairy ingredients
      const hasDairy = dish.ingredients.some(i => i.category === 'dairy');
      if (hasDairy) return false;
    }
    if (rules.NOG && !dish.tags.includes('NOG')) {
      // Reject dishes with onion/garlic ingredients
      const hasOnionGarlic = dish.ingredients.some(i =>
        i.name.toLowerCase().includes('onion') ||
        i.name.toLowerCase().includes('garlic') ||
        i.name.toLowerCase().includes('ginger-garlic')
      );
      if (hasOnionGarlic) return false;
    }
    if (rules.vrat && !dish.tags.includes('vrat-friendly')) {
      return false;
    }
    return true;
  }

  // Get all dishes currently planned/cooked within cooldown window from a target date
  function recentlyUsed(targetDateStr, plannedSoFar) {
    const recent = new Set();
    const targetDate = parseYmd(targetDateStr);
    const maxCD = state.default_cooldown_days;

    // From history (cooked & planned)
    state.history.forEach(h => {
      if (h.status === 'leftover') return; // leftovers don't count
      const hd = parseYmd(h.date);
      const diff = Math.abs((targetDate - hd) / 86400000);
      const dish = allDishes().find(d => d.id === h.dish_id);
      const cd = dish ? dish.cooldown_days : maxCD;
      if (diff < cd) recent.add(h.dish_id);
    });

    // From current plan (existing locked cells + same generation batch)
    Object.entries(state.plan).forEach(([date, daySlots]) => {
      Object.values(daySlots).forEach(cell => {
        if (!cell || !cell.dish_id) return;
        const hd = parseYmd(date);
        const diff = Math.abs((targetDate - hd) / 86400000);
        const dish = allDishes().find(d => d.id === cell.dish_id);
        const cd = dish ? dish.cooldown_days : maxCD;
        if (diff < cd) recent.add(cell.dish_id);
      });
    });

    // From this generation batch
    plannedSoFar.forEach(({ date, dish_id }) => {
      const hd = parseYmd(date);
      const diff = Math.abs((targetDate - hd) / 86400000);
      const dish = allDishes().find(d => d.id === dish_id);
      const cd = dish ? dish.cooldown_days : maxCD;
      if (diff < cd) recent.add(dish_id);
    });

    return recent;
  }

  function allDishes() {
    return state.library.concat(state.custom_dishes);
  }

  // Apply soft biases via weighted random selection
  function pickWeighted(candidates, context) {
    if (candidates.length === 0) return null;

    const weights = candidates.map(dish => {
      let w = 1.0;

      // Slot cuisine bias
      const sb = state.cuisine_bias[context.slot];
      if (sb && sb.length && sb.includes(dish.cuisine)) w += 0.6;

      // Weekend bias toward heavy/festive
      if (context.isWeekend && state.settings.weekend_heavy_bias) {
        if (dish.tags.includes('heavy') || dish.tags.includes('festive') || dish.tags.includes('elaborate')) w += 0.5;
        if (dish.tags.includes('quick') && dish.tags.includes('light')) w -= 0.2;
      }

      // Weekday breakfast → quick bias
      if (!context.isWeekend && context.slot === 'breakfast' && state.settings.weekday_quick_bias) {
        if (dish.tags.includes('quick')) w += 0.5;
        if (dish.tags.includes('elaborate')) w -= 0.4;
      }

      // Cuisine balance — penalize the most-used cuisine in current window
      if (state.settings.cuisine_balance && context.cuisineCounts) {
        const total = Object.values(context.cuisineCounts).reduce((a, b) => a + b, 0) || 1;
        const share = (context.cuisineCounts[dish.cuisine] || 0) / total;
        if (share > 0.45) w -= 0.4;
      }

      // Festive day boost
      if (context.rules.festive && (dish.tags.includes('festive') || dish.tags.includes('elaborate'))) {
        w += 0.8;
      }

      // Soft penalty: if dish appeared in last 2 days, drop weight slightly
      if (context.recentSet && context.recentSet.has(dish.id)) w -= 0.3;

      return Math.max(0.05, w);
    });

    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let i = 0; i < candidates.length; i++) {
      r -= weights[i];
      if (r <= 0) return candidates[i];
    }
    return candidates[candidates.length - 1];
  }

  function generateForCell(dateStr, slotId, plannedSoFar) {
    const date = parseYmd(dateStr);
    const rules = activeDietRules(dateStr);
    const recent = recentlyUsed(dateStr, plannedSoFar);
    const allowedDishes = allDishes().filter(d => d.enabled);

    // Cuisine counts in a +/- 3 day window for balance
    const cuisineCounts = {};
    plannedSoFar.forEach(({ dish_id, date: dStr }) => {
      const diff = Math.abs((parseYmd(dStr) - date) / 86400000);
      if (diff <= 3) {
        const d = allDishes().find(x => x.id === dish_id);
        if (d) cuisineCounts[d.cuisine] = (cuisineCounts[d.cuisine] || 0) + 1;
      }
    });

    let candidates = allowedDishes.filter(d =>
      d.suitable_slots.includes(slotId) &&
      satisfiesDiet(d, rules) &&
      !recent.has(d.id)
    );

    // Fallback ladder if no candidates
    if (candidates.length === 0) {
      candidates = allowedDishes.filter(d =>
        d.suitable_slots.includes(slotId) && satisfiesDiet(d, rules)
      );
    }
    if (candidates.length === 0) {
      candidates = allowedDishes.filter(d => d.suitable_slots.includes(slotId));
    }
    if (candidates.length === 0) return null;

    return pickWeighted(candidates, {
      slot: slotId,
      isWeekend: isWeekend(date),
      cuisineCounts,
      rules,
      recentSet: recent
    });
  }

  // Generate plan over a date range — respects locks
  function generateRange(startDate, endDate, options = {}) {
    const plannedSoFar = [];
    const enabledSlots = state.slots.filter(s => s.enabled);

    let d = new Date(startDate);
    while (d <= endDate) {
      const dateStr = ymd(d);
      const dayPlan = state.plan[dateStr] || {};
      for (const slot of enabledSlots) {
        const existing = dayPlan[slot.id];
        if (existing && existing.locked) {
          // Respect lock — include in plannedSoFar for cooldown reasoning
          plannedSoFar.push({ date: dateStr, dish_id: existing.dish_id });
          continue;
        }
        // Skip already-cooked cells unless force regen
        if (existing && existing.status === 'cooked' && !options.regenCooked) {
          plannedSoFar.push({ date: dateStr, dish_id: existing.dish_id });
          continue;
        }
        const dish = generateForCell(dateStr, slot.id, plannedSoFar);
        if (dish) {
          plannedSoFar.push({ date: dateStr, dish_id: dish.id, slot_id: slot.id });
          if (!state.plan[dateStr]) state.plan[dateStr] = {};
          state.plan[dateStr][slot.id] = {
            dish_id: dish.id,
            locked: false,
            status: 'planned',
            manually_chosen: false
          };
        }
      }
      d = addDays(d, 1);
    }
    saveState();
  }

  function regenerateCell(dateStr, slotId) {
    // Don't include the existing dish in the cooldown set for THIS cell
    // Strategy: temporarily clear it, re-generate, then restore if no candidate found
    const old = state.plan[dateStr]?.[slotId];
    if (old) old.dish_id = '__regen__';
    const plannedSoFar = [];
    Object.entries(state.plan).forEach(([d, daySlots]) => {
      Object.entries(daySlots).forEach(([s, cell]) => {
        if (d === dateStr && s === slotId) return; // skip self
        if (cell && cell.dish_id) plannedSoFar.push({ date: d, dish_id: cell.dish_id });
      });
    });
    const dish = generateForCell(dateStr, slotId, plannedSoFar);
    if (!dish) {
      if (old && old.dish_id === '__regen__') old.dish_id = null;
      toast('No matching dishes — try relaxing rules', 'warn');
      return;
    }
    if (!state.plan[dateStr]) state.plan[dateStr] = {};
    state.plan[dateStr][slotId] = {
      dish_id: dish.id,
      locked: false,
      status: 'planned',
      manually_chosen: false
    };
    saveState();
  }

  /* ---- Festival helpers --------------------------------------------- */
  function festivalsOn(dateStr) {
    if (!state.festivals) return [];
    return state.festivals.filter(f => f.date === dateStr);
  }

  function upcomingFestivals(daysAhead = 14) {
    const cutoffStart = ymd(today());
    const cutoffEnd = ymd(addDays(today(), daysAhead));
    return (state.festivals || [])
      .filter(f => f.date >= cutoffStart && f.date <= cutoffEnd)
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  function festivalSuggestedMode(festival) {
    if (festival.type === 'fasting') return 'fasting';
    if (festival.type === 'festive') return 'festive';
    if (festival.type === 'partial') return 'no-onion-garlic';
    return null;
  }

  /* ---- Cell actions ------------------------------------------------- */
  function toggleLock(dateStr, slotId) {
    const cell = state.plan[dateStr]?.[slotId];
    if (!cell) return;
    cell.locked = !cell.locked;
    saveState();
    render();
  }

  function setCellStatus(dateStr, slotId, status) {
    const cell = state.plan[dateStr]?.[slotId];
    if (!cell) return;
    cell.status = status;
    // Log to history
    state.history.push({
      date: dateStr,
      slot_id: slotId,
      dish_id: cell.dish_id,
      status,
      recorded_at: new Date().toISOString()
    });
    // Trim history to last 90 days
    const cutoff = ymd(addDays(today(), -90));
    state.history = state.history.filter(h => h.date >= cutoff);
    saveState();
    render();
  }

  function manuallySetCell(dateStr, slotId, dishId) {
    if (!state.plan[dateStr]) state.plan[dateStr] = {};
    state.plan[dateStr][slotId] = {
      dish_id: dishId,
      locked: true,
      status: 'planned',
      manually_chosen: true
    };
    saveState();
    render();
  }

  function clearCell(dateStr, slotId) {
    if (state.plan[dateStr]) delete state.plan[dateStr][slotId];
    saveState();
    render();
  }

  /* ---- Toast --------------------------------------------------------- */
  function toast(msg, kind = 'info') {
    const host = document.getElementById('toast-host');
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `${kind === 'success' ? icons.check : kind === 'warn' ? icons.diya : icons.sparkles}<span>${msg}</span>`;
    host.appendChild(el);
    setTimeout(() => {
      el.classList.add('is-leaving');
      setTimeout(() => el.remove(), 200);
    }, 2400);
  }

  /* ---- Rendering ---------------------------------------------------- */
  function dishById(id) { return allDishes().find(d => d.id === id); }

  function renderCell(dateStr, slot, opts = {}) {
    const cell = state.plan[dateStr]?.[slot.id];
    const dish = cell ? dishById(cell.dish_id) : null;
    const classes = ['cell'];
    if (cell?.locked) classes.push('is-locked');
    if (cell?.status === 'cooked') classes.push('is-cooked');
    if (cell?.status === 'skipped') classes.push('is-skipped');
    if (!dish) classes.push('is-empty');

    return `
      <div class="${classes.join(' ')}" data-date="${dateStr}" data-slot="${slot.id}" ${dish ? 'draggable="true"' : ''}>
        ${jharokhaArch}
        ${dish ? `
          <div>
            <div class="cell-slot-label">${slot.label}</div>
            <div class="cell-dish-name">${dish.name}</div>
            <div class="cell-meta">
              <span class="cell-cuisine">${cuisineShort(dish.cuisine)}</span>
              <span class="cell-meta-dot">·</span>
              <span>${dish.prep_time_mins} min</span>
            </div>
          </div>
          <div class="cell-actions">
            <button class="cell-action" data-act="lock" title="${cell.locked ? 'Unlock' : 'Lock'}">${cell.locked ? icons.lock : icons.unlock}</button>
            <button class="cell-action" data-act="regen" title="Re-roll">${icons.refresh}</button>
            <button class="cell-action" data-act="pick" title="Choose from library">${icons.search}</button>
            <button class="cell-action" data-act="cooked" title="Mark cooked">${icons.check}</button>
            <button class="cell-action" data-act="more" title="More">${icons.more}</button>
          </div>
        ` : `
          <div>
            <div class="cell-slot-label">${slot.label}</div>
            <div class="cell-empty-text">— empty —</div>
          </div>
          <div class="cell-actions" style="opacity:1">
            <button class="cell-action" data-act="regen" title="Generate">${icons.sparkles}</button>
            <button class="cell-action" data-act="pick" title="Choose">${icons.search}</button>
          </div>
        `}
      </div>
    `;
  }

  function cuisineShort(c) {
    const map = {
      'south-indian': 'S. Indian',
      'north-indian': 'N. Indian',
      'pan-indian': 'Indian',
      'indo-chinese': 'Indo-Chinese',
      'gujarati': 'Gujarati',
      'continental': 'Continental',
    };
    return map[c] || c;
  }

  function renderDayOverridePill(dateStr) {
    const ov = state.day_overrides[dateStr];
    if (!ov) return '';
    const label = ov.mode === 'no-onion-garlic' ? 'No onion-garlic' : ov.mode;
    return `<span class="day-override-pill mode-${ov.mode}">${label}</span>`;
  }

  /* ---- Views: Today ------------------------------------------------- */
  function viewToday() {
    const dateStr = ymd(today());
    const enabledSlots = state.slots.filter(s => s.enabled);
    const hasPlan = enabledSlots.some(s => state.plan[dateStr]?.[s.id]);
    const todayFestivals = festivalsOn(dateStr);
    const ov = state.day_overrides[dateStr];

    // Auto-suggestion: festival today, no override yet
    let festivalBanner = '';
    if (todayFestivals.length > 0) {
      const f = todayFestivals[0];
      const suggested = festivalSuggestedMode(f);
      festivalBanner = `
        <div class="festival-banner">
          <span class="festival-banner-diya">${icons.diya}</span>
          <div class="festival-banner-text">
            <div class="festival-banner-name">${f.name}${todayFestivals.length > 1 ? ` · +${todayFestivals.length - 1} more` : ''}</div>
            <div class="tiny muted">${f.note || ''} ${(!ov && suggested) ? '· Suggest setting day to ' + suggested : ''}</div>
          </div>
          ${(!ov && suggested) ? `<div class="festival-banner-action"><button class="btn btn--secondary" data-action="apply-festival" data-date="${dateStr}" data-mode="${suggested}">Apply</button></div>` : ''}
        </div>
      `;
    }

    return `
      <div class="stack stack--lg">
        <div class="plan-header">
          <div class="plan-title-block">
            <span class="eyebrow eyebrow--start">${today().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            <h1 class="h1">Today's plan</h1>
            ${renderDayOverridePill(dateStr)}
            ${festivalBanner}
          </div>
          <div class="plan-actions">
            <button class="btn btn--secondary" data-action="day-override" data-date="${dateStr}">${icons.calendar}<span>Day mode</span></button>
            <button class="btn btn--primary btn--large" data-action="generate-today">${icons.sparkles}<span>${hasPlan ? 'Regenerate today' : 'Generate today'}</span></button>
          </div>
        </div>

        <div class="plan-grid plan-grid--today">
          ${enabledSlots.map(s => renderCell(dateStr, s)).join('')}
        </div>

        <div class="row row--wrap" style="margin-top:12px">
          <p class="muted tiny">Tap any cell to swap, lock, or mark cooked. Drag a dish onto another cell to move or swap it.</p>
        </div>
      </div>
    `;
  }

  /* ---- Views: Week -------------------------------------------------- */
  function viewWeek() {
    const dates = weekDates(state.ui.week_offset);
    const enabledSlots = state.slots.filter(s => s.enabled);
    const todayStr = ymd(today());
    const weekLabel = `${dates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${dates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

    return `
      <div class="stack stack--lg">
        <div class="plan-header">
          <div class="plan-title-block">
            <span class="eyebrow eyebrow--start">Week view</span>
            <h1 class="h1">${weekLabel}</h1>
          </div>
          <div class="plan-actions">
            <button class="btn btn--ghost btn--icon" data-action="week-prev" aria-label="Previous week">${icons.chevronLeft}</button>
            <button class="btn btn--ghost" data-action="week-current">This week</button>
            <button class="btn btn--ghost btn--icon" data-action="week-next" aria-label="Next week">${icons.chevronRight}</button>
            <button class="btn btn--secondary" data-action="print">${icons.printer}<span>Print / PDF</span></button>
            <button class="btn btn--primary btn--large" data-action="generate-week">${icons.sparkles}<span>Generate the week</span></button>
          </div>
        </div>

        <div class="plan-grid plan-grid--week">
          <div class="slot-label"></div>
          ${dates.map(d => {
            const isToday = ymd(d) === todayStr;
            const fests = festivalsOn(ymd(d));
            return `<div class="plan-day-header ${isToday ? 'is-today' : ''}">
              ${dayName(d, true)}
              <span class="date-num">${d.getDate()}</span>
              ${renderDayOverridePill(ymd(d))}
              ${fests.length ? `<span class="tag tag--festive" style="margin-top:2px;font-size:8px;padding:1px 6px" title="${fests.map(f=>f.name).join(', ')}">${fests[0].name.split(' ')[0]}</span>` : ''}
            </div>`;
          }).join('')}
          ${enabledSlots.map(slot => `
            <div class="slot-label">${slot.label}</div>
            ${dates.map(d => renderCell(ymd(d), slot)).join('')}
          `).join('')}
        </div>
      </div>
    `;
  }

  /* ---- Views: Month ------------------------------------------------- */
  function viewMonth() {
    // Compute the month being shown
    const base = today();
    const cursor = new Date(base.getFullYear(), base.getMonth() + state.ui.month_offset, 1);
    const monthLabel = cursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    // Build the 6-week grid: start from the Monday on or before the 1st
    const first = new Date(cursor);
    const firstDow = first.getDay(); // 0=Sun
    const offset = firstDow === 0 ? -6 : 1 - firstDow;
    const gridStart = addDays(first, offset);

    const cells = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
    const todayStr = ymd(today());
    const enabledSlots = state.slots.filter(s => s.enabled);

    return `
      <div class="stack stack--lg">
        <div class="plan-header">
          <div class="plan-title-block">
            <span class="eyebrow eyebrow--start">Month view</span>
            <h1 class="h1">${monthLabel}</h1>
            <p class="muted">Bird's-eye plan. Tap any day for details or to set an override.</p>
          </div>
          <div class="plan-actions">
            <button class="btn btn--ghost btn--icon" data-action="month-prev" aria-label="Previous month">${icons.chevronLeft}</button>
            <button class="btn btn--ghost" data-action="month-current">This month</button>
            <button class="btn btn--ghost btn--icon" data-action="month-next" aria-label="Next month">${icons.chevronRight}</button>
          </div>
        </div>

        <div class="month-grid">
          ${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => `<div class="month-header">${d}</div>`).join('')}
          ${cells.map(d => {
            const dStr = ymd(d);
            const inMonth = d.getMonth() === cursor.getMonth();
            const isToday = dStr === todayStr;
            const ov = state.day_overrides[dStr];
            const fests = festivalsOn(dStr);
            const plan = state.plan[dStr];
            const dishes = plan ? enabledSlots.map(s => plan[s.id]).filter(c => c && c.dish_id).map(c => dishById(c.dish_id)).filter(Boolean) : [];

            const classes = ['month-day'];
            if (!inMonth) classes.push('is-other-month');
            if (isToday) classes.push('is-today');
            if (ov) classes.push('has-override');
            if (fests.length) classes.push('has-festival');

            return `
              <div class="${classes.join(' ')}" ${inMonth ? `data-month-cell="${dStr}"` : ''}>
                <div class="month-day-num">${d.getDate()}</div>
                ${fests.length ? `<div class="month-day-festival" title="${fests.map(f=>f.name).join(', ')}">${fests[0].name}</div>` : ''}
                ${ov ? `<div class="day-override-pill mode-${ov.mode}" style="margin:0;font-size:8px;padding:0 4px">${ov.mode}</div>` : ''}
                <div class="month-day-dishes">
                  ${dishes.slice(0, 3).map(d => `<div class="month-day-dish">${d.name}</div>`).join('')}
                  ${dishes.length > 3 ? `<div class="month-day-dish muted">+${dishes.length - 3} more</div>` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  /* ---- Views: Library ----------------------------------------------- */
  let libraryFilter = { search: '', cuisine: 'all', slot: 'all', tag: 'all' };

  function viewLibrary() {
    const all = allDishes();
    const filtered = all.filter(d => {
      if (libraryFilter.search && !d.name.toLowerCase().includes(libraryFilter.search.toLowerCase())) return false;
      if (libraryFilter.cuisine !== 'all' && d.cuisine !== libraryFilter.cuisine) return false;
      if (libraryFilter.slot !== 'all' && !d.suitable_slots.includes(libraryFilter.slot)) return false;
      if (libraryFilter.tag !== 'all' && !d.tags.includes(libraryFilter.tag)) return false;
      return true;
    });

    const cuisines = [...new Set(all.map(d => d.cuisine))];

    return `
      <div class="stack stack--lg">
        <div class="plan-header">
          <div class="plan-title-block">
            <span class="eyebrow eyebrow--start">Library</span>
            <h1 class="h1">${all.length} dishes</h1>
            <p class="muted">${filtered.length} matching</p>
          </div>
          <div class="plan-actions">
            <button class="btn btn--primary" data-action="add-dish">${icons.plus}<span>Add custom dish</span></button>
          </div>
        </div>

        <div class="library-toolbar glass glass--padded">
          <input type="text" class="input" placeholder="Search dishes..." value="${libraryFilter.search}" data-lib-input="search">
          <select class="select" data-lib-input="cuisine">
            <option value="all">All cuisines</option>
            ${cuisines.map(c => `<option value="${c}" ${libraryFilter.cuisine === c ? 'selected' : ''}>${cuisineShort(c)}</option>`).join('')}
          </select>
          <select class="select" data-lib-input="slot">
            <option value="all">All slots</option>
            ${state.slots.map(s => `<option value="${s.id}" ${libraryFilter.slot === s.id ? 'selected' : ''}>${s.label}</option>`).join('')}
          </select>
          <select class="select" data-lib-input="tag">
            <option value="all">All tags</option>
            ${['quick', 'heavy', 'light', 'vrat-friendly', 'vegan', 'NOG', 'festive', 'meal-prep-friendly', 'kid-friendly'].map(t => `<option value="${t}" ${libraryFilter.tag === t ? 'selected' : ''}>${t}</option>`).join('')}
          </select>
        </div>

        ${filtered.length === 0 ? `
          <div class="empty">
            ${emptyJharokha}
            <div class="empty-title">No dishes match</div>
            <div class="muted">Try clearing filters</div>
          </div>
        ` : `
          <div class="dish-list">
            ${filtered.map(renderDishCard).join('')}
          </div>
        `}
      </div>
    `;
  }

  function renderDishCard(d) {
    return `
      <div class="dish-card ${!d.enabled ? 'is-disabled' : ''}" data-dish="${d.id}">
        <div class="dish-card-title">${d.name}</div>
        <div class="dish-card-meta">
          <span class="tag tag--cuisine">${cuisineShort(d.cuisine)}</span>
          ${d.suitable_slots.map(s => `<span class="tag">${s}</span>`).join('')}
          <span class="tag">${d.prep_time_mins}m</span>
          ${d.tags.includes('vrat-friendly') ? '<span class="tag tag--vrat">vrat</span>' : ''}
          ${d.tags.includes('festive') ? '<span class="tag tag--festive">festive</span>' : ''}
          ${d.tags.includes('quick') ? '<span class="tag tag--quick">quick</span>' : ''}
          ${d.tags.includes('heavy') ? '<span class="tag tag--heavy">heavy</span>' : ''}
        </div>
      </div>
    `;
  }

  /* ---- Views: Calendar (day overrides + festivals) ------------------ */
  function viewCalendar() {
    const upcoming = Array.from({ length: 30 }, (_, i) => addDays(today(), i));
    const upFests = upcomingFestivals(45);

    return `
      <div class="stack stack--lg">
        <div class="plan-header">
          <div class="plan-title-block">
            <span class="eyebrow eyebrow--start">Calendar</span>
            <h1 class="h1">Day overrides & festivals</h1>
            <p class="muted">Mark fasting / vegan / festive days. Festivals are auto-suggested; you stay in control.</p>
          </div>
          <div class="plan-actions">
            <button class="btn btn--secondary" data-action="manage-festivals">${icons.diya}<span>Manage festivals</span></button>
          </div>
        </div>

        ${upFests.length > 0 ? `
          <div class="glass glass--padded-lg">
            <h2 class="h2" style="margin-bottom:12px">Coming up</h2>
            <div class="stack">
              ${upFests.slice(0, 8).map(f => {
                const fDate = parseYmd(f.date);
                const daysAway = Math.round((fDate - today()) / 86400000);
                const dayLabel = daysAway === 0 ? 'today' : daysAway === 1 ? 'tomorrow' : `in ${daysAway} days`;
                const ov = state.day_overrides[f.date];
                const suggested = festivalSuggestedMode(f);
                return `
                  <div class="row" style="justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap">
                    <div style="flex:1;min-width:0">
                      <div style="font-weight:600">${f.name} <span class="muted" style="font-weight:400">· ${dayLabel}</span></div>
                      <div class="tiny muted">${fDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}${f.note ? ' · ' + f.note : ''}</div>
                    </div>
                    <div class="row" style="gap:6px">
                      ${ov ? `<span class="day-override-pill mode-${ov.mode}">${ov.mode}</span>` :
                        suggested ? `<button class="btn btn--ghost" data-action="apply-festival" data-date="${f.date}" data-mode="${suggested}">Apply ${suggested}</button>` : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}

        <h2 class="h2">Next 30 days</h2>
        <div class="dish-list">
          ${upcoming.map(d => {
            const dStr = ymd(d);
            const ov = state.day_overrides[dStr];
            const fests = festivalsOn(dStr);
            const isToday = dStr === ymd(today());
            return `
              <div class="dish-card" data-cal-date="${dStr}" style="cursor:pointer">
                <div class="row" style="justify-content:space-between">
                  <div>
                    <div class="dish-card-title" style="font-size:14px">${dayName(d, true)}, ${monthName(d, true)} ${d.getDate()}${isToday ? ' · today' : ''}</div>
                    <div class="dish-card-meta">
                      ${ov ? `<span class="tag tag--vrat">${ov.mode}</span>` : ''}
                      ${fests.length ? `<span class="tag tag--festive">${fests[0].name}</span>` : ''}
                      ${!ov && !fests.length ? '<span class="tag">no override</span>' : ''}
                    </div>
                  </div>
                  <button class="btn btn--ghost" data-action="set-override" data-date="${dStr}">${icons.edit}</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  /* ---- Views: Shopping list ----------------------------------------- */
  function viewShopping() {
    // Roll up next 7 days of the plan
    const dates = Array.from({ length: 7 }, (_, i) => ymd(addDays(today(), i)));
    const byCategory = {};
    const dishesInWindow = [];

    dates.forEach(dStr => {
      const daySlots = state.plan[dStr] || {};
      Object.values(daySlots).forEach(cell => {
        if (!cell || cell.status === 'skipped') return;
        const dish = dishById(cell.dish_id);
        if (!dish) return;
        dishesInWindow.push(dish);
        dish.ingredients.forEach(ing => {
          if (!byCategory[ing.category]) byCategory[ing.category] = {};
          if (!byCategory[ing.category][ing.name]) byCategory[ing.category][ing.name] = { count: 0, dishes: [] };
          byCategory[ing.category][ing.name].count++;
          byCategory[ing.category][ing.name].dishes.push(dish.name);
        });
      });
    });

    const checkedMap = JSON.parse(sessionStorage.getItem('rasoi-shop-checked') || '{}');
    const categoryLabels = {
      vegetable: 'Vegetables',
      'dal-grain': 'Dals, Grains & Flours',
      dairy: 'Dairy',
      spice: 'Spices & Herbs',
      other: 'Other'
    };
    const categoryOrder = ['vegetable', 'dal-grain', 'dairy', 'spice', 'other'];

    return `
      <div class="stack stack--lg">
        <div class="plan-header">
          <div class="plan-title-block">
            <span class="eyebrow eyebrow--start">Next 7 days</span>
            <h1 class="h1">Shopping list</h1>
            <p class="muted">${dishesInWindow.length} dishes planned · ingredients grouped by section. Tick as you shop.</p>
          </div>
        </div>

        ${dishesInWindow.length === 0 ? `
          <div class="empty">
            ${emptyJharokha}
            <div class="empty-title">No plan yet</div>
            <div class="muted">Generate a week first to see your shopping list.</div>
          </div>
        ` : categoryOrder.filter(c => byCategory[c]).map(cat => {
          const items = Object.entries(byCategory[cat]).sort((a, b) => b[1].count - a[1].count);
          return `
            <div class="shopping-section">
              <div class="shopping-section-title">
                <h3>${categoryLabels[cat]}</h3>
                <span class="shopping-section-count">${items.length} items</span>
              </div>
              <div class="shopping-items">
                ${items.map(([name, info]) => {
                  const key = cat + ':' + name;
                  const checked = checkedMap[key];
                  return `
                    <div class="shopping-item ${checked ? 'is-checked' : ''}" data-shop-item="${key}">
                      <span class="shopping-checkbox">${checked ? icons.check : ''}</span>
                      <span class="shopping-item-name">${name}</span>
                      <span class="shopping-item-count">${info.count}×</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  /* ---- Views: Settings ---------------------------------------------- */
  function viewSettings() {
    const h = state.household;
    return `
      <div class="stack stack--lg">
        <div class="plan-header">
          <div class="plan-title-block">
            <span class="eyebrow eyebrow--start">Settings</span>
            <h1 class="h1">Household & preferences</h1>
          </div>
        </div>

        <div class="glass glass--padded-lg">
          <h2 class="h2" style="margin-bottom:16px">Household</h2>
          <div class="stack">
            <div class="field">
              <label class="label">Number of people</label>
              <input type="number" class="input" min="1" max="20" value="${h.member_count}" data-setting="member_count" style="max-width:120px">
            </div>
            <div class="field">
              <label class="label">Default diet</label>
              <div class="checkbox-row">
                ${['veg', 'vegan', 'no-onion-garlic'].map(t => `
                  <button class="chip ${h.global_diet.includes(t) ? 'is-on' : ''}" data-toggle-diet="${t}">${t === 'no-onion-garlic' ? 'No onion-garlic' : t}</button>
                `).join('')}
              </div>
              <div class="tiny muted">These rules apply to every day. Override specific dates from the Calendar tab.</div>
            </div>
          </div>
        </div>

        <div class="glass glass--padded-lg">
          <h2 class="h2" style="margin-bottom:16px">Meal slots</h2>
          <div class="stack">
            ${state.slots.map(s => `
              <div class="row" style="justify-content:space-between">
                <div>
                  <div style="font-weight:500">${s.label}</div>
                  <div class="tiny muted">at ${s.time}</div>
                </div>
                <button class="chip ${s.enabled ? 'is-on--teal' : ''}" data-toggle-slot="${s.id}">${s.enabled ? 'on' : 'off'}</button>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="glass glass--padded-lg">
          <h2 class="h2" style="margin-bottom:16px">Generation rules</h2>
          <div class="stack">
            <div class="field">
              <label class="label">Default cooldown (days before a dish can repeat)</label>
              <input type="number" class="input" min="1" max="30" value="${state.default_cooldown_days}" data-setting="default_cooldown_days" style="max-width:120px">
            </div>
            <div class="row row--wrap">
              ${[
                ['weekend_heavy_bias', 'Weekend = heavier/festive dishes'],
                ['weekday_quick_bias', 'Weekday breakfast = quick'],
                ['cuisine_balance', 'Balance cuisines across the week'],
              ].map(([k, label]) => `
                <button class="chip ${state.settings[k] ? 'is-on--teal' : ''}" data-toggle-setting="${k}">${label}</button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="glass glass--padded-lg">
          <h2 class="h2" style="margin-bottom:16px">Backup & data</h2>
          <div class="row row--wrap">
            <button class="btn btn--secondary" data-action="export">${icons.download}<span>Export backup</span></button>
            <button class="btn btn--secondary" data-action="import">${icons.upload}<span>Import backup</span></button>
            <button class="btn btn--ghost btn--danger" data-action="reset">${icons.trash}<span>Reset everything</span></button>
          </div>
          <div class="tiny muted" style="margin-top:8px">All your data lives in this browser. Export a backup before clearing browser data.</div>
        </div>
      </div>
    `;
  }

  /* ---- Modal: Dish picker ------------------------------------------- */
  function openDishPicker(dateStr, slotId) {
    const slot = state.slots.find(s => s.id === slotId);
    const all = allDishes().filter(d => d.enabled && d.suitable_slots.includes(slotId));

    showModal({
      title: `Choose for ${slot.label}`,
      body: `
        <input type="text" class="input" placeholder="Search dishes..." id="picker-search" style="margin-bottom:12px">
        <div class="dish-list" id="picker-list" style="max-height:50vh;overflow-y:auto">
          ${all.map(d => `
            <div class="dish-card" data-pick="${d.id}">
              <div class="dish-card-title">${d.name}</div>
              <div class="dish-card-meta">
                <span class="tag tag--cuisine">${cuisineShort(d.cuisine)}</span>
                <span class="tag">${d.prep_time_mins}m</span>
                ${d.tags.includes('vrat-friendly') ? '<span class="tag tag--vrat">vrat</span>' : ''}
              </div>
            </div>
          `).join('')}
        </div>
      `,
      footer: `<button class="btn btn--ghost" data-modal-close>Cancel</button>`,
      onOpen: () => {
        const search = document.getElementById('picker-search');
        const list = document.getElementById('picker-list');
        search.focus();
        search.addEventListener('input', () => {
          const q = search.value.toLowerCase();
          list.querySelectorAll('.dish-card').forEach(card => {
            const name = card.querySelector('.dish-card-title').textContent.toLowerCase();
            card.style.display = name.includes(q) ? '' : 'none';
          });
        });
        list.addEventListener('click', (e) => {
          const card = e.target.closest('[data-pick]');
          if (!card) return;
          manuallySetCell(dateStr, slotId, card.dataset.pick);
          closeModal();
          toast('Dish set', 'success');
        });
      }
    });
  }

  /* ---- Modal: Day override ------------------------------------------ */
  function openDayOverride(dateStr) {
    const current = state.day_overrides[dateStr];
    const modes = [
      { id: 'none', label: 'No override', desc: 'Use default household rules.' },
      { id: 'no-onion-garlic', label: 'No onion-garlic', desc: 'Only dishes without onion or garlic.' },
      { id: 'vegan', label: 'Vegan', desc: 'No dairy products.' },
      { id: 'fasting', label: 'Fasting (vrat)', desc: 'Only vrat-friendly dishes. No onion-garlic. No grains for strict vrat.' },
      { id: 'festive', label: 'Festive', desc: 'Bias toward elaborate, festive dishes.' },
    ];

    showModal({
      title: `Mark ${parseYmd(dateStr).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`,
      body: `
        <div class="stack">
          ${modes.map(m => `
            <button class="dish-card ${(current?.mode || 'none') === m.id ? 'is-selected' : ''}" data-mode="${m.id}" style="width:100%;text-align:left">
              <div class="dish-card-title">${m.label}</div>
              <div class="tiny muted">${m.desc}</div>
            </button>
          `).join('')}
        </div>
      `,
      footer: `<button class="btn btn--ghost" data-modal-close>Cancel</button>`,
      onOpen: () => {
        document.querySelector('.modal-body').addEventListener('click', (e) => {
          const btn = e.target.closest('[data-mode]');
          if (!btn) return;
          const mode = btn.dataset.mode;
          if (mode === 'none') delete state.day_overrides[dateStr];
          else state.day_overrides[dateStr] = { mode, source: 'user' };
          saveState();
          closeModal();
          toast(mode === 'none' ? 'Override cleared' : `Set to ${mode}`, 'success');
          render();
        });
      }
    });
  }

  /* ---- Modal: Add custom dish --------------------------------------- */
  function openAddDish() {
    const slotOptions = state.slots.map(s => s.id);
    const cuisineOptions = ['south-indian', 'north-indian', 'pan-indian', 'indo-chinese', 'gujarati', 'continental', 'other'];
    const tagOptions = ['quick', 'heavy', 'light', 'vegan', 'NOG', 'vrat-friendly', 'festive', 'comfort', 'meal-prep-friendly', 'kid-friendly', 'fried'];

    showModal({
      title: 'Add a dish',
      body: `
        <div class="stack">
          <div class="field">
            <label class="label">Name</label>
            <input type="text" class="input" id="ad-name" placeholder="e.g. Mom's khichdi">
          </div>
          <div class="row" style="gap:12px">
            <div class="field" style="flex:1">
              <label class="label">Cuisine</label>
              <select class="select" id="ad-cuisine">
                ${cuisineOptions.map(c => `<option value="${c}">${cuisineShort(c)}</option>`).join('')}
              </select>
            </div>
            <div class="field" style="flex:1">
              <label class="label">Prep time (min)</label>
              <input type="number" class="input" id="ad-prep" value="30" min="5">
            </div>
          </div>
          <div class="field">
            <label class="label">Suitable slots</label>
            <div class="checkbox-row" id="ad-slots">
              ${slotOptions.map(s => `<button class="chip" data-slot-pick="${s}">${s}</button>`).join('')}
            </div>
          </div>
          <div class="field">
            <label class="label">Tags</label>
            <div class="checkbox-row" id="ad-tags">
              ${tagOptions.map(t => `<button class="chip" data-tag-pick="${t}">${t}</button>`).join('')}
            </div>
          </div>
          <div class="field">
            <label class="label">Main ingredients <span class="muted">(comma-separated)</span></label>
            <input type="text" class="input" id="ad-ingredients" placeholder="rice, dal, turmeric, ghee">
          </div>
          <div class="field">
            <label class="label">Recipe URL <span class="muted">(optional)</span></label>
            <input type="url" class="input" id="ad-recipe-url" placeholder="https://...">
          </div>
        </div>
      `,
      footer: `
        <button class="btn btn--ghost" data-modal-close>Cancel</button>
        <button class="btn btn--primary" id="ad-save">${icons.plus}<span>Add to library</span></button>
      `,
      onOpen: () => {
        const selectedSlots = new Set();
        const selectedTags = new Set();
        document.querySelectorAll('[data-slot-pick]').forEach(b => b.addEventListener('click', () => {
          const v = b.dataset.slotPick;
          if (selectedSlots.has(v)) { selectedSlots.delete(v); b.classList.remove('is-on'); }
          else { selectedSlots.add(v); b.classList.add('is-on'); }
        }));
        document.querySelectorAll('[data-tag-pick]').forEach(b => b.addEventListener('click', () => {
          const v = b.dataset.tagPick;
          if (selectedTags.has(v)) { selectedTags.delete(v); b.classList.remove('is-on'); }
          else { selectedTags.add(v); b.classList.add('is-on'); }
        }));
        document.getElementById('ad-save').addEventListener('click', () => {
          const name = document.getElementById('ad-name').value.trim();
          if (!name) { toast('Dish needs a name', 'warn'); return; }
          if (selectedSlots.size === 0) { toast('Pick at least one slot', 'warn'); return; }
          const ingText = document.getElementById('ad-ingredients').value.trim();
          const ingredients = ingText.split(',').map(s => s.trim()).filter(Boolean).map(name => ({
            name, category: guessIngredientCategory(name)
          }));
          const newDish = {
            id: 'u_' + Date.now(),
            name,
            cuisine: document.getElementById('ad-cuisine').value,
            category: 'custom',
            suitable_slots: [...selectedSlots],
            tags: [...selectedTags],
            prep_time_mins: parseInt(document.getElementById('ad-prep').value, 10) || 30,
            cooldown_days: state.default_cooldown_days,
            ingredients,
            image_url: null,
            recipe_url: document.getElementById('ad-recipe-url').value.trim() || undefined,
            enabled: true,
            source: 'user'
          };
          state.custom_dishes.push(newDish);
          saveState();
          closeModal();
          toast(`"${name}" added`, 'success');
          render();
        });
      }
    });
  }

  function guessIngredientCategory(name) {
    const n = name.toLowerCase();
    if (/(milk|curd|paneer|ghee|butter|cream|cheese|yogurt)/.test(n)) return 'dairy';
    if (/(rice|dal|flour|wheat|maida|besan|semolina|sago|oats|noodles|pasta|bread|pav|roti)/.test(n)) return 'dal-grain';
    if (/(masala|powder|seed|leaf|leaves|chilli|chili|cumin|turmeric|cardamom|cinnamon|clove|coriander|salt|pepper|garam|ginger|garlic|tamarind|mint|tadka)/.test(n)) return 'spice';
    if (/(potato|onion|tomato|carrot|spinach|cauliflower|paneer|brinjal|okra|peas|beans|cucumber|capsicum|bell pepper|cabbage|mushroom|cheese|corn)/.test(n)) return 'vegetable';
    return 'other';
  }

  /* ---- Modal: Manage festivals -------------------------------------- */
  function openManageFestivals() {
    const sorted = (state.festivals || []).slice().sort((a, b) => a.date.localeCompare(b.date));
    const upcoming = sorted.filter(f => f.date >= ymd(today()));

    showModal({
      title: 'Festivals & fasting days',
      body: `
        <div class="stack">
          <p class="muted tiny">${state.festivals.length} festivals total · ${upcoming.length} upcoming. These come pre-seeded for FY26–27 and you can add your own.</p>

          <div class="glass glass--padded">
            <div class="label" style="margin-bottom:8px">Add a festival</div>
            <div class="row" style="gap:8px;flex-wrap:wrap">
              <input type="date" class="input" id="nf-date" style="flex:1;min-width:160px">
              <input type="text" class="input" id="nf-name" placeholder="Name (e.g. Diwali)" style="flex:2;min-width:200px">
              <select class="select" id="nf-type" style="flex:1">
                <option value="festive">festive</option>
                <option value="fasting">fasting</option>
                <option value="partial">partial (NOG)</option>
              </select>
              <button class="btn btn--primary" id="nf-add">${icons.plus}<span>Add</span></button>
            </div>
          </div>

          <div class="stack" style="gap:6px;max-height:50vh;overflow-y:auto;margin-top:8px">
            ${upcoming.length === 0 ? '<div class="empty"><div class="empty-title">No upcoming festivals</div></div>' :
              upcoming.map((f, idx) => {
                const realIdx = state.festivals.indexOf(f);
                return `
                  <div class="row" style="justify-content:space-between;padding:8px 12px;background:rgba(255,255,255,0.4);border-radius:10px;gap:8px;flex-wrap:wrap">
                    <div style="flex:1;min-width:0">
                      <div style="font-weight:500;font-size:13px">${f.name}</div>
                      <div class="tiny muted">${f.date} · ${f.type}${f.source === 'seed' ? ' · pre-seeded' : ''}</div>
                    </div>
                    <button class="btn btn--ghost btn--danger" data-fest-remove="${realIdx}" title="Remove">${icons.trash}</button>
                  </div>
                `;
              }).join('')}
          </div>
        </div>
      `,
      footer: `<button class="btn btn--ghost" data-modal-close>Close</button>`,
      onOpen: () => {
        document.getElementById('nf-add').addEventListener('click', () => {
          const date = document.getElementById('nf-date').value;
          const name = document.getElementById('nf-name').value.trim();
          const type = document.getElementById('nf-type').value;
          if (!date || !name) { toast('Date and name required', 'warn'); return; }
          state.festivals.push({ date, name, type, note: '', source: 'user' });
          saveState();
          closeModal();
          toast('Festival added', 'success');
          openManageFestivals(); // reopen with updated list
        });
        document.querySelectorAll('[data-fest-remove]').forEach(b => b.addEventListener('click', () => {
          const idx = parseInt(b.dataset.festRemove, 10);
          state.festivals.splice(idx, 1);
          saveState();
          closeModal();
          toast('Removed', 'success');
          openManageFestivals();
        }));
      }
    });
  }

  /* ---- Modal infrastructure ----------------------------------------- */
  let modalOpen = false;
  function showModal({ title, body, footer, onOpen }) {
    const host = document.getElementById('modal-host');
    host.innerHTML = `
      <div class="modal-backdrop" data-modal-backdrop>
        <div class="modal" role="dialog" aria-modal="true">
          <div class="modal-header">
            <h2 class="h2">${title}</h2>
            <button class="btn btn--ghost btn--icon" data-modal-close>${icons.x}</button>
          </div>
          <div class="modal-body">${body}</div>
          ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
        </div>
      </div>
    `;
    modalOpen = true;
    host.querySelectorAll('[data-modal-close]').forEach(b => b.addEventListener('click', closeModal));
    host.querySelector('[data-modal-backdrop]').addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-modal-backdrop')) closeModal();
    });
    if (onOpen) onOpen();
  }

  function closeModal() {
    document.getElementById('modal-host').innerHTML = '';
    modalOpen = false;
  }

  /* ---- Onboarding wizard -------------------------------------------- */
  let wizardStep = 0;
  let wizardData = null;

  function renderWizard() {
    if (!wizardData) {
      wizardData = {
        member_count: 4,
        diets: ['veg'],
      };
    }

    const steps = [
      // Step 0: welcome + diet
      `
        <div class="wizard-step">
          <span class="eyebrow eyebrow--start">Welcome</span>
          <h2 class="h2" style="font-size:32px">Let's set up your kitchen.</h2>
          <p class="muted">Two questions and you're cooking. Nothing leaves this device.</p>

          <div class="field" style="margin-top:8px">
            <label class="label">How many people are you cooking for?</label>
            <input type="number" class="input" min="1" max="20" value="${wizardData.member_count}" id="wiz-count" style="max-width:120px">
          </div>

          <div class="field">
            <label class="label">Default diet for everyone</label>
            <div class="checkbox-row" id="wiz-diets">
              ${['veg', 'vegan', 'no-onion-garlic'].map(t => `
                <button class="chip ${wizardData.diets.includes(t) ? 'is-on' : ''}" data-wiz-diet="${t}">${t === 'no-onion-garlic' ? 'No onion-garlic' : t}</button>
              `).join('')}
            </div>
            <div class="tiny muted">You can override specific days later (Ekadashi, Navratri, vrat, etc.) from the Calendar tab.</div>
          </div>

          <div class="wizard-actions">
            <div class="wizard-progress">
              <div class="wizard-dot is-active"></div>
              <div class="wizard-dot"></div>
            </div>
            <button class="btn btn--primary btn--large" data-wiz="next">Continue${icons.chevronRight}</button>
          </div>
        </div>
      `,
      // Step 1: confirm slots + done
      `
        <div class="wizard-step">
          <span class="eyebrow eyebrow--start">Almost there</span>
          <h2 class="h2" style="font-size:32px">Four meals a day, right?</h2>
          <p class="muted">Default: Breakfast, Lunch, Snacks, Dinner. You can disable or rename any of these in Settings.</p>

          <div class="stack" style="margin-top:8px">
            ${state.slots.map(s => `
              <div class="row" style="justify-content:space-between; padding:10px 14px; background:rgba(255,255,255,0.5); border-radius:14px">
                <div>
                  <div style="font-weight:500">${s.label}</div>
                  <div class="tiny muted">~ ${s.time}</div>
                </div>
                <span class="chip is-on--teal">on</span>
              </div>
            `).join('')}
          </div>

          <div class="wizard-actions">
            <div>
              <button class="btn btn--ghost" data-wiz="back">${icons.chevronLeft}Back</button>
              <span class="wizard-progress" style="display:inline-flex;margin-left:8px;vertical-align:middle">
                <span class="wizard-dot"></span>
                <span class="wizard-dot is-active"></span>
              </span>
            </div>
            <button class="btn btn--primary btn--large" data-wiz="finish">${icons.sparkles}<span>Start cooking</span></button>
          </div>
        </div>
      `,
    ];

    return `
      <div class="wizard-shell">
        <div class="glass wizard">
          <div class="brand" style="margin-bottom:24px">
            <span class="brand-mark" style="color:var(--terracotta)">${icons.diya}</span>
            <span class="brand-name">Rasoi</span>
            <span class="brand-sub">Randomizer</span>
          </div>
          ${steps[wizardStep]}
        </div>
      </div>
    `;
  }

  function bindWizard() {
    document.querySelectorAll('[data-wiz-diet]').forEach(b => b.addEventListener('click', () => {
      const v = b.dataset.wizDiet;
      const i = wizardData.diets.indexOf(v);
      if (i >= 0) wizardData.diets.splice(i, 1);
      else wizardData.diets.push(v);
      render();
    }));

    const countInput = document.getElementById('wiz-count');
    if (countInput) countInput.addEventListener('input', () => {
      wizardData.member_count = parseInt(countInput.value, 10) || 1;
    });

    document.querySelectorAll('[data-wiz]').forEach(b => b.addEventListener('click', () => {
      const action = b.dataset.wiz;
      if (action === 'next') { wizardStep = 1; render(); }
      if (action === 'back') { wizardStep = 0; render(); }
      if (action === 'finish') {
        state.household.member_count = wizardData.member_count;
        state.household.global_diet = wizardData.diets.slice();
        state.onboarded = true;
        saveState();
        wizardData = null;
        toast('Welcome — your kitchen is ready', 'success');
        render();
      }
    }));
  }

  /* ---- Top-level render --------------------------------------------- */
  function render() {
    const app = document.getElementById('app');

    if (!state.onboarded) {
      app.innerHTML = renderWizard();
      bindWizard();
      return;
    }

    const view = state.ui.current_view;
    let main = '';
    if (view === 'today') main = viewToday();
    else if (view === 'week') main = viewWeek();
    else if (view === 'month') main = viewMonth();
    else if (view === 'library') main = viewLibrary();
    else if (view === 'calendar') main = viewCalendar();
    else if (view === 'shopping') main = viewShopping();
    else if (view === 'settings') main = viewSettings();

    app.innerHTML = `
      <div class="app-shell">
        <header class="topbar">
          <div class="brand">
            <span class="brand-mark">${icons.diya}</span>
            <span class="brand-name">Rasoi</span>
            <span class="brand-sub">Randomizer</span>
          </div>
          <nav class="nav">
            ${[
              ['today', 'Today', icons.sun],
              ['week', 'Week', icons.grid],
              ['month', 'Month', icons.monthGrid],
              ['library', 'Library', icons.library],
              ['calendar', 'Calendar', icons.calendar],
              ['shopping', 'Shopping', icons.bag],
              ['settings', 'Settings', icons.settings],
            ].map(([v, label, icon]) => `
              <button class="nav-link ${view === v ? 'is-active' : ''}" data-view="${v}">${icon}<span>${label}</span></button>
            `).join('')}
          </nav>
        </header>
        <main class="main">${main}</main>
        <footer class="footer">Made with care · Stored locally · No tracking, no AI calls</footer>
      </div>
    `;

    bindEvents();
  }

  /* ---- Event delegation --------------------------------------------- */
  function bindEvents() {
    // Nav
    document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => {
      state.ui.current_view = b.dataset.view;
      saveState();
      render();
    }));

    // Cell action delegation
    document.querySelectorAll('.cell').forEach(cell => {
      cell.addEventListener('click', (e) => {
        const action = e.target.closest('[data-act]');
        if (!action) return;
        const dateStr = cell.dataset.date;
        const slotId = cell.dataset.slot;
        const act = action.dataset.act;
        if (act === 'lock') { toggleLock(dateStr, slotId); render(); }
        else if (act === 'regen') {
          cell.classList.add('is-spinning');
          setTimeout(() => { regenerateCell(dateStr, slotId); render(); }, 200);
        }
        else if (act === 'pick') openDishPicker(dateStr, slotId);
        else if (act === 'cooked') {
          setCellStatus(dateStr, slotId, state.plan[dateStr]?.[slotId]?.status === 'cooked' ? 'planned' : 'cooked');
          toast('Status updated', 'success');
        }
        else if (act === 'more') openCellMore(dateStr, slotId);
      });
    });

    // Generate buttons
    const genToday = document.querySelector('[data-action="generate-today"]');
    if (genToday) genToday.addEventListener('click', () => {
      const d = today();
      generateRange(d, d);
      toast("Today's plan generated", 'success');
      render();
    });

    const genWeek = document.querySelector('[data-action="generate-week"]');
    if (genWeek) genWeek.addEventListener('click', () => {
      const dates = weekDates(state.ui.week_offset);
      generateRange(dates[0], dates[6]);
      toast('Week generated', 'success');
      render();
    });

    // Week navigation
    const wPrev = document.querySelector('[data-action="week-prev"]');
    if (wPrev) wPrev.addEventListener('click', () => { state.ui.week_offset--; saveState(); render(); });
    const wNext = document.querySelector('[data-action="week-next"]');
    if (wNext) wNext.addEventListener('click', () => { state.ui.week_offset++; saveState(); render(); });
    const wNow = document.querySelector('[data-action="week-current"]');
    if (wNow) wNow.addEventListener('click', () => { state.ui.week_offset = 0; saveState(); render(); });

    // Month navigation
    const mPrev = document.querySelector('[data-action="month-prev"]');
    if (mPrev) mPrev.addEventListener('click', () => { state.ui.month_offset--; saveState(); render(); });
    const mNext = document.querySelector('[data-action="month-next"]');
    if (mNext) mNext.addEventListener('click', () => { state.ui.month_offset++; saveState(); render(); });
    const mNow = document.querySelector('[data-action="month-current"]');
    if (mNow) mNow.addEventListener('click', () => { state.ui.month_offset = 0; saveState(); render(); });
    document.querySelectorAll('[data-month-cell]').forEach(c => c.addEventListener('click', () => openDayOverride(c.dataset.monthCell)));

    // Print
    const printBtn = document.querySelector('[data-action="print"]');
    if (printBtn) printBtn.addEventListener('click', () => window.print());

    // Apply festival suggestion
    document.querySelectorAll('[data-action="apply-festival"]').forEach(b => b.addEventListener('click', () => {
      const date = b.dataset.date;
      const mode = b.dataset.mode;
      state.day_overrides[date] = { mode, source: 'festival' };
      saveState();
      toast(`Marked ${date} as ${mode}`, 'success');
      render();
    }));

    // Manage festivals
    const manageBtn = document.querySelector('[data-action="manage-festivals"]');
    if (manageBtn) manageBtn.addEventListener('click', openManageFestivals);

    // Drag-and-drop between cells
    document.querySelectorAll('.cell').forEach(cell => {
      cell.addEventListener('dragstart', (e) => {
        if (!cell.hasAttribute('draggable')) return;
        const dStr = cell.dataset.date;
        const sId = cell.dataset.slot;
        const c = state.plan[dStr]?.[sId];
        if (!c) return;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', JSON.stringify({ date: dStr, slot: sId, dish_id: c.dish_id }));
        cell.classList.add('is-dragging');
      });
      cell.addEventListener('dragend', () => cell.classList.remove('is-dragging'));
      cell.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        cell.classList.add('is-drop-target');
      });
      cell.addEventListener('dragleave', () => cell.classList.remove('is-drop-target'));
      cell.addEventListener('drop', (e) => {
        e.preventDefault();
        cell.classList.remove('is-drop-target');
        let payload;
        try { payload = JSON.parse(e.dataTransfer.getData('text/plain')); } catch { return; }
        if (!payload || !payload.dish_id) return;
        const fromDate = payload.date;
        const fromSlot = payload.slot;
        const toDate = cell.dataset.date;
        const toSlot = cell.dataset.slot;
        if (fromDate === toDate && fromSlot === toSlot) return;

        // Validate: dish must be suitable for target slot
        const dish = dishById(payload.dish_id);
        if (!dish.suitable_slots.includes(toSlot)) {
          toast(`${dish.name} isn't typical for ${toSlot}`, 'warn');
          return;
        }

        // Swap behavior: if target has a dish, swap; if empty, move
        const fromCell = state.plan[fromDate]?.[fromSlot];
        const toCell = state.plan[toDate]?.[toSlot];

        if (!state.plan[toDate]) state.plan[toDate] = {};
        state.plan[toDate][toSlot] = {
          dish_id: payload.dish_id,
          locked: fromCell?.locked || false,
          status: 'planned',
          manually_chosen: true,
        };

        if (toCell && toCell.dish_id) {
          // Swap
          state.plan[fromDate][fromSlot] = {
            dish_id: toCell.dish_id,
            locked: toCell.locked || false,
            status: 'planned',
            manually_chosen: true,
          };
        } else {
          // Move
          delete state.plan[fromDate][fromSlot];
        }
        saveState();
        toast(toCell?.dish_id ? 'Swapped' : 'Moved', 'success');
        render();
      });
    });

    // Day override
    document.querySelectorAll('[data-action="day-override"]').forEach(b => b.addEventListener('click', () => openDayOverride(b.dataset.date)));
    document.querySelectorAll('[data-action="set-override"]').forEach(b => b.addEventListener('click', () => openDayOverride(b.dataset.date)));
    document.querySelectorAll('[data-cal-date]').forEach(card => card.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      openDayOverride(card.dataset.calDate);
    }));

    // Library
    const addDishBtn = document.querySelector('[data-action="add-dish"]');
    if (addDishBtn) addDishBtn.addEventListener('click', openAddDish);
    document.querySelectorAll('[data-lib-input]').forEach(input => {
      const key = input.dataset.libInput;
      const evt = input.tagName === 'SELECT' ? 'change' : 'input';
      input.addEventListener(evt, () => {
        libraryFilter[key] = input.value;
        render();
        // restore focus on search if it's the search field
        if (key === 'search') {
          const el = document.querySelector('[data-lib-input="search"]');
          if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
        }
      });
    });

    document.querySelectorAll('[data-dish]').forEach(card => card.addEventListener('click', () => openDishEdit(card.dataset.dish)));

    // Shopping list checkboxes
    document.querySelectorAll('[data-shop-item]').forEach(item => item.addEventListener('click', () => {
      const key = item.dataset.shopItem;
      const checkedMap = JSON.parse(sessionStorage.getItem('rasoi-shop-checked') || '{}');
      checkedMap[key] = !checkedMap[key];
      sessionStorage.setItem('rasoi-shop-checked', JSON.stringify(checkedMap));
      item.classList.toggle('is-checked');
      const cb = item.querySelector('.shopping-checkbox');
      cb.innerHTML = checkedMap[key] ? icons.check : '';
    }));

    // Settings
    document.querySelectorAll('[data-setting]').forEach(input => input.addEventListener('change', () => {
      const key = input.dataset.setting;
      const val = input.type === 'number' ? parseInt(input.value, 10) : input.value;
      if (key === 'member_count') state.household.member_count = val;
      else if (key === 'default_cooldown_days') state.default_cooldown_days = val;
      saveState();
    }));

    document.querySelectorAll('[data-toggle-diet]').forEach(b => b.addEventListener('click', () => {
      const v = b.dataset.toggleDiet;
      const i = state.household.global_diet.indexOf(v);
      if (i >= 0) state.household.global_diet.splice(i, 1);
      else state.household.global_diet.push(v);
      saveState();
      render();
    }));

    document.querySelectorAll('[data-toggle-slot]').forEach(b => b.addEventListener('click', () => {
      const slot = state.slots.find(s => s.id === b.dataset.toggleSlot);
      slot.enabled = !slot.enabled;
      saveState();
      render();
    }));

    document.querySelectorAll('[data-toggle-setting]').forEach(b => b.addEventListener('click', () => {
      const k = b.dataset.toggleSetting;
      state.settings[k] = !state.settings[k];
      saveState();
      render();
    }));

    const exportBtn = document.querySelector('[data-action="export"]');
    if (exportBtn) exportBtn.addEventListener('click', exportBackup);
    const importBtn = document.querySelector('[data-action="import"]');
    if (importBtn) importBtn.addEventListener('click', importBackup);
    const resetBtn = document.querySelector('[data-action="reset"]');
    if (resetBtn) resetBtn.addEventListener('click', () => {
      if (confirm('This wipes everything: household, library customizations, plans, history. Really reset?')) {
        localStorage.removeItem(STORAGE_KEY);
        state = defaultState();
        saveState();
        render();
        toast('Reset complete', 'success');
      }
    });
  }

  function openCellMore(dateStr, slotId) {
    const cell = state.plan[dateStr]?.[slotId];
    if (!cell) return;
    const dish = dishById(cell.dish_id);
    showModal({
      title: dish.name,
      body: `
        <div class="stack">
          <div class="dish-card-meta">
            <span class="tag tag--cuisine">${cuisineShort(dish.cuisine)}</span>
            <span class="tag">${dish.prep_time_mins} min</span>
            ${dish.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <div>
            <div class="label">Ingredients</div>
            <div style="margin-top:4px">${dish.ingredients.map(i => i.name).join(' · ')}</div>
          </div>
          <div class="row row--wrap">
            <button class="btn btn--secondary" data-cell-act="skipped">Mark skipped</button>
            <button class="btn btn--secondary" data-cell-act="leftover">Mark as leftover</button>
            <button class="btn btn--secondary" data-cell-act="planned">Reset to planned</button>
            <button class="btn btn--ghost btn--danger" data-cell-act="clear">Clear cell</button>
          </div>
        </div>
      `,
      footer: `<button class="btn btn--ghost" data-modal-close>Close</button>`,
      onOpen: () => {
        document.querySelectorAll('[data-cell-act]').forEach(b => b.addEventListener('click', () => {
          const act = b.dataset.cellAct;
          if (act === 'clear') { clearCell(dateStr, slotId); }
          else { setCellStatus(dateStr, slotId, act); }
          closeModal();
        }));
      }
    });
  }

  function openDishEdit(dishId) {
    const dish = dishById(dishId);
    if (!dish) return;
    showModal({
      title: dish.name,
      body: `
        <div class="stack">
          <div class="dish-card-meta">
            <span class="tag tag--cuisine">${cuisineShort(dish.cuisine)}</span>
            <span class="tag">${dish.prep_time_mins} min</span>
            <span class="tag">cooldown ${dish.cooldown_days}d</span>
            ${dish.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <div>
            <div class="label">Suitable for</div>
            <div style="margin-top:4px">${dish.suitable_slots.join(' · ')}</div>
          </div>
          <div>
            <div class="label">Ingredients</div>
            <div style="margin-top:4px">${dish.ingredients.map(i => i.name).join(' · ')}</div>
          </div>
          ${dish.recipe_url ? `
            <div>
              <div class="label">Recipe</div>
              <a class="recipe-link" href="${dish.recipe_url}" target="_blank" rel="noopener">${icons.externalLink}<span>${dish.recipe_url.replace(/^https?:\/\//, '').slice(0, 50)}…</span></a>
            </div>
          ` : ''}
          <div class="field">
            <label class="label">Recipe URL (optional)</label>
            <input type="url" class="input" id="dish-recipe-url" placeholder="https://..." value="${dish.recipe_url || ''}">
          </div>
          <div class="row row--wrap">
            <button class="btn btn--secondary" data-dish-act="save-url">${icons.check}<span>Save URL</span></button>
            <button class="btn btn--secondary" data-dish-act="toggle">${dish.enabled ? 'Disable in generator' : 'Re-enable'}</button>
            ${dish.source === 'user' ? `<button class="btn btn--ghost btn--danger" data-dish-act="delete">${icons.trash}<span>Delete</span></button>` : ''}
          </div>
        </div>
      `,
      footer: `<button class="btn btn--ghost" data-modal-close>Close</button>`,
      onOpen: () => {
        document.querySelectorAll('[data-dish-act]').forEach(b => b.addEventListener('click', () => {
          const act = b.dataset.dishAct;
          if (act === 'save-url') {
            const url = document.getElementById('dish-recipe-url').value.trim();
            dish.recipe_url = url || undefined;
            toast(url ? 'Recipe URL saved' : 'URL cleared', 'success');
          } else if (act === 'toggle') {
            dish.enabled = !dish.enabled;
            toast(dish.enabled ? 'Re-enabled' : 'Disabled', 'success');
          } else if (act === 'delete') {
            state.custom_dishes = state.custom_dishes.filter(d => d.id !== dishId);
            toast('Deleted', 'success');
          }
          saveState();
          closeModal();
          render();
        }));
      }
    });
  }

  /* ---- Backup ------------------------------------------------------- */
  function exportBackup() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rasoi-backup-${ymd(today())}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Backup downloaded', 'success');
  }

  function importBackup() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.addEventListener('change', () => {
      const file = input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          if (!data.version || !data.household) throw new Error('Not a valid backup');
          if (!confirm('This replaces your current data. Continue?')) return;
          state = data;
          saveState();
          render();
          toast('Backup restored', 'success');
        } catch (e) {
          toast('Could not read backup: ' + e.message, 'warn');
        }
      };
      reader.readAsText(file);
    });
    input.click();
  }

  /* ---- Boot --------------------------------------------------------- */
  function boot() {
    state = loadState() || defaultState();

    // Migration: ensure new v0.2 fields exist on old saved state
    if (!state.festivals) state.festivals = [];
    if (typeof state.ui.month_offset !== 'number') state.ui.month_offset = 0;

    // Merge in any new seed festivals the user hasn't already customized
    if (window.SEED_FESTIVALS) {
      const existingDates = new Set(state.festivals.map(f => f.date + '|' + f.name));
      window.SEED_FESTIVALS.forEach(f => {
        if (!existingDates.has(f.date + '|' + f.name)) {
          state.festivals.push({ ...f, source: 'seed' });
        }
      });
    }

    // Ensure newer seed library is reflected (merge by id for source: 'seed')
    if (state.library && state.library.length > 0) {
      const userOverridesById = new Map(state.library.filter(d => d.source !== 'seed' || !d.enabled).map(d => [d.id, d]));
      state.library = window.SEED_LIBRARY.map(seed => userOverridesById.get(seed.id) || seed);
    }
    saveState();
    render();
  }

  document.addEventListener('DOMContentLoaded', boot);
})();
