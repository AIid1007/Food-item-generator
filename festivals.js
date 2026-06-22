/* =========================================================================
   RASOI RANDOMIZER — Festival & fasting calendar
   Curated set of major Hindu festivals and fasting days for FY 2026–2027.
   Users can add/edit/remove from Calendar > Manage festivals.

   IMPORTANT: Dates here are best-effort and should be cross-checked against
   a regional panchang (e.g. drikpanchang.com). They are loaded at app boot
   into state.festivals — users override at will.

   Each entry:
     date:  YYYY-MM-DD
     name:  Display name
     type:  'festive' | 'fasting' | 'partial'
     note:  short context
   ========================================================================= */

window.SEED_FESTIVALS = [
  /* === 2026 — Second half === */
  { date: '2026-07-09', name: 'Devshayani Ekadashi',     type: 'fasting',  note: 'Vishnu sleeping — fasting day' },
  { date: '2026-07-21', name: 'Guru Purnima',             type: 'festive',  note: 'Honour gurus & elders' },
  { date: '2026-07-29', name: 'Hariyali Teej',            type: 'festive',  note: 'Monsoon festival' },
  { date: '2026-08-11', name: 'Hariyali Amavasya',        type: 'partial',  note: 'New moon — light meals' },
  { date: '2026-08-15', name: 'Independence Day',         type: 'festive',  note: 'National holiday' },
  { date: '2026-08-22', name: 'Raksha Bandhan',           type: 'festive',  note: 'Sweets day' },
  { date: '2026-09-04', name: 'Krishna Janmashtami',      type: 'fasting',  note: 'Fast until midnight, then prasad' },
  { date: '2026-09-14', name: 'Hartalika Teej',           type: 'fasting',  note: 'Nirjala fast (no water)' },
  { date: '2026-09-15', name: 'Ganesh Chaturthi',         type: 'festive',  note: 'Modak & sweets' },
  { date: '2026-10-12', name: 'Sharad Navratri (Day 1)',  type: 'fasting',  note: '9-day fast begins — vrat food' },
  { date: '2026-10-13', name: 'Navratri Day 2',           type: 'fasting',  note: '' },
  { date: '2026-10-14', name: 'Navratri Day 3',           type: 'fasting',  note: '' },
  { date: '2026-10-15', name: 'Navratri Day 4',           type: 'fasting',  note: '' },
  { date: '2026-10-16', name: 'Navratri Day 5',           type: 'fasting',  note: '' },
  { date: '2026-10-17', name: 'Navratri Day 6',           type: 'fasting',  note: '' },
  { date: '2026-10-18', name: 'Navratri Day 7',           type: 'fasting',  note: '' },
  { date: '2026-10-19', name: 'Navratri Day 8 (Ashtami)', type: 'fasting',  note: 'Kanya pujan' },
  { date: '2026-10-20', name: 'Navami / Dussehra eve',    type: 'fasting',  note: 'Last day of fast' },
  { date: '2026-10-21', name: 'Dussehra',                 type: 'festive',  note: 'Victory feast' },
  { date: '2026-10-29', name: 'Karwa Chauth',             type: 'fasting',  note: 'Nirjala fast until moonrise' },
  { date: '2026-11-08', name: 'Diwali',                   type: 'festive',  note: 'Festival of lights — sweets & feast' },
  { date: '2026-11-09', name: 'Govardhan Puja',           type: 'festive',  note: 'Annakut — many dishes offering' },
  { date: '2026-11-10', name: 'Bhai Dooj',                type: 'festive',  note: 'Sister-brother festival' },
  { date: '2026-11-25', name: 'Tulsi Vivah',              type: 'festive',  note: '' },

  /* === 2027 — First half === */
  { date: '2027-01-14', name: 'Makar Sankranti / Pongal', type: 'festive',  note: 'Til-gud, sweet pongal' },
  { date: '2027-01-26', name: 'Republic Day',             type: 'festive',  note: 'National holiday' },
  { date: '2027-02-02', name: 'Basant Panchami',          type: 'festive',  note: 'Saraswati puja' },
  { date: '2027-02-15', name: 'Maha Shivratri',           type: 'fasting',  note: 'Full-day fast for Shiva' },
  { date: '2027-03-22', name: 'Holika Dahan',             type: 'festive',  note: '' },
  { date: '2027-03-23', name: 'Holi',                     type: 'festive',  note: 'Gujiya, thandai' },
  { date: '2027-03-29', name: 'Ram Navami',               type: 'fasting',  note: 'Day fast — Ram\'s birth' },
  { date: '2027-04-06', name: 'Mahavir Jayanti',          type: 'partial',  note: '' },
  { date: '2027-04-14', name: 'Ambedkar Jayanti / Vaisakhi', type: 'festive', note: 'Punjabi new year' },
  { date: '2027-04-22', name: 'Akshaya Tritiya',          type: 'festive',  note: '' },
  { date: '2027-05-04', name: 'Buddha Purnima',           type: 'partial',  note: '' },
];
