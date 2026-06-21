/* =========================================================================
   RASOI RANDOMIZER — Seed dish library
   ~110 dishes spanning South Indian, North Indian, snacks, sweets, vrat-friendly
   All veg by default. Tags drive the generation rules engine.
   ========================================================================= */

window.SEED_LIBRARY = (function() {
  // Shorthand helpers to keep the data dense + readable
  const B = 'breakfast', L = 'lunch', S = 'snacks', D = 'dinner';
  const SI = 'south-indian', NI = 'north-indian', PAN = 'pan-indian', CONT = 'continental';

  // Each dish: name, cuisine, category, slots, tags, prep, cooldown, ingredients
  // tags vocabulary:
  //   diet:        vegan, no-onion-garlic (NOG), vrat-friendly
  //   weight:      light, heavy
  //   effort:      quick (<30min), elaborate (>60min)
  //   style:       fried, festive, comfort, meal-prep-friendly, kid-friendly
  //   default-veg: all dishes are veg unless tagged non-veg (none in this seed)

  const dishes = [
    /* ============= SOUTH INDIAN — Breakfast / Tiffin ============= */
    { name: 'Idli',                 cuisine: SI, cat: 'tiffin',    slots: [B, D],       tags: ['light', 'vegan', 'NOG', 'kid-friendly', 'meal-prep-friendly'], prep: 25, cd: 4, ing: [['rice', 'dal-grain'], ['urad dal', 'dal-grain'], ['fenugreek', 'spice']] },
    { name: 'Plain Dosa',           cuisine: SI, cat: 'dosa',      slots: [B, D],       tags: ['quick', 'vegan', 'NOG', 'meal-prep-friendly'],   prep: 20, cd: 4, ing: [['rice', 'dal-grain'], ['urad dal', 'dal-grain'], ['oil', 'other']] },
    { name: 'Masala Dosa',          cuisine: SI, cat: 'dosa',      slots: [B, L, D],    tags: ['heavy', 'comfort', 'kid-friendly'],              prep: 35, cd: 5, ing: [['rice', 'dal-grain'], ['urad dal', 'dal-grain'], ['potato', 'vegetable'], ['onion', 'vegetable'], ['curry leaves', 'spice'], ['mustard seeds', 'spice']] },
    { name: 'Mysore Masala Dosa',   cuisine: SI, cat: 'dosa',      slots: [B, L, D],    tags: ['heavy', 'comfort'],                              prep: 40, cd: 6, ing: [['rice', 'dal-grain'], ['urad dal', 'dal-grain'], ['potato', 'vegetable'], ['red chutney', 'spice'], ['onion', 'vegetable']] },
    { name: 'Rava Dosa',            cuisine: SI, cat: 'dosa',      slots: [B, D],       tags: ['quick', 'light'],                                prep: 20, cd: 5, ing: [['semolina', 'dal-grain'], ['rice flour', 'dal-grain'], ['cumin', 'spice'], ['green chilli', 'spice']] },
    { name: 'Onion Uthappam',       cuisine: SI, cat: 'dosa',      slots: [B, D],       tags: ['comfort', 'vegan'],                              prep: 30, cd: 5, ing: [['rice', 'dal-grain'], ['urad dal', 'dal-grain'], ['onion', 'vegetable'], ['tomato', 'vegetable'], ['coriander', 'spice']] },
    { name: 'Medhu Vada',           cuisine: SI, cat: 'tiffin',    slots: [B, S],       tags: ['fried', 'comfort'],                              prep: 35, cd: 6, ing: [['urad dal', 'dal-grain'], ['ginger', 'spice'], ['oil', 'other'], ['curry leaves', 'spice']] },
    { name: 'Sambar Vada',          cuisine: SI, cat: 'tiffin',    slots: [B, S],       tags: ['heavy', 'comfort', 'NOG'],                       prep: 45, cd: 6, ing: [['urad dal', 'dal-grain'], ['toor dal', 'dal-grain'], ['vegetables', 'vegetable'], ['tamarind', 'spice'], ['sambar powder', 'spice']] },
    { name: 'Curd Vada',            cuisine: SI, cat: 'tiffin',    slots: [B, S],       tags: ['comfort'],                                       prep: 40, cd: 7, ing: [['urad dal', 'dal-grain'], ['curd', 'dairy'], ['coriander', 'spice'], ['mustard seeds', 'spice']] },
    { name: 'Rava Idli',            cuisine: SI, cat: 'tiffin',    slots: [B, D],       tags: ['quick', 'light', 'kid-friendly'],                prep: 25, cd: 5, ing: [['semolina', 'dal-grain'], ['curd', 'dairy'], ['eno', 'other'], ['ginger', 'spice']] },
    { name: 'Kara Bath',            cuisine: SI, cat: 'tiffin',    slots: [B],          tags: ['quick', 'comfort'],                              prep: 20, cd: 5, ing: [['semolina', 'dal-grain'], ['onion', 'vegetable'], ['ginger', 'spice'], ['ghee', 'dairy']] },
    { name: 'Rava Kesari',          cuisine: SI, cat: 'sweet',     slots: [B, S],       tags: ['festive', 'kid-friendly'],                       prep: 20, cd: 7, ing: [['semolina', 'dal-grain'], ['sugar', 'other'], ['ghee', 'dairy'], ['cashew', 'other'], ['cardamom', 'spice']] },
    { name: 'Poori Masala',         cuisine: SI, cat: 'tiffin',    slots: [B, L, D],    tags: ['fried', 'heavy', 'comfort'],                     prep: 40, cd: 7, ing: [['wheat flour', 'dal-grain'], ['potato', 'vegetable'], ['onion', 'vegetable'], ['oil', 'other'], ['turmeric', 'spice']] },
    { name: 'Ghee Pongal',          cuisine: SI, cat: 'rice',      slots: [B, L],       tags: ['comfort', 'NOG', 'meal-prep-friendly'],          prep: 30, cd: 5, ing: [['rice', 'dal-grain'], ['moong dal', 'dal-grain'], ['ghee', 'dairy'], ['black pepper', 'spice'], ['cumin', 'spice'], ['cashew', 'other']] },
    { name: 'Sweet Pongal',         cuisine: SI, cat: 'sweet',     slots: [B, S],       tags: ['festive', 'NOG'],                                prep: 35, cd: 8, ing: [['rice', 'dal-grain'], ['moong dal', 'dal-grain'], ['jaggery', 'other'], ['ghee', 'dairy'], ['cardamom', 'spice'], ['cashew', 'other']] },
    { name: 'Chow Chow Bath',       cuisine: SI, cat: 'tiffin',    slots: [B],          tags: ['comfort'],                                       prep: 35, cd: 7, ing: [['semolina', 'dal-grain'], ['sugar', 'other'], ['ghee', 'dairy'], ['cashew', 'other'], ['vegetables', 'vegetable']] },
    { name: 'Idiyappam',            cuisine: SI, cat: 'tiffin',    slots: [B, D],       tags: ['light', 'NOG', 'vegan'],                         prep: 30, cd: 6, ing: [['rice flour', 'dal-grain'], ['coconut milk', 'other'], ['salt', 'spice']] },
    { name: 'Appam',                cuisine: SI, cat: 'tiffin',    slots: [B, D],       tags: ['light', 'vegan'],                                prep: 40, cd: 6, ing: [['rice', 'dal-grain'], ['coconut', 'other'], ['yeast', 'other']] },
    { name: 'Adai',                 cuisine: SI, cat: 'tiffin',    slots: [B, L, D],    tags: ['heavy', 'meal-prep-friendly'],                   prep: 35, cd: 6, ing: [['rice', 'dal-grain'], ['mixed dals', 'dal-grain'], ['red chilli', 'spice'], ['curry leaves', 'spice']] },
    { name: 'Ragi Roti',            cuisine: SI, cat: 'tiffin',    slots: [B, D],       tags: ['light', 'comfort'],                              prep: 25, cd: 5, ing: [['ragi flour', 'dal-grain'], ['onion', 'vegetable'], ['coriander', 'spice'], ['cumin', 'spice']] },

    /* ============= SOUTH INDIAN — Lunch / Dinner ============= */
    { name: 'Sambar Rice',          cuisine: SI, cat: 'rice',      slots: [L, D],       tags: ['heavy', 'comfort', 'meal-prep-friendly'],        prep: 50, cd: 4, ing: [['rice', 'dal-grain'], ['toor dal', 'dal-grain'], ['vegetables', 'vegetable'], ['tamarind', 'spice'], ['sambar powder', 'spice'], ['curry leaves', 'spice']] },
    { name: 'Curd Rice',            cuisine: SI, cat: 'rice',      slots: [L, D],       tags: ['light', 'quick', 'NOG', 'kid-friendly'],         prep: 15, cd: 3, ing: [['rice', 'dal-grain'], ['curd', 'dairy'], ['mustard seeds', 'spice'], ['curry leaves', 'spice'], ['ginger', 'spice']] },
    { name: 'Lemon Rice',           cuisine: SI, cat: 'rice',      slots: [L, D],       tags: ['quick', 'light', 'meal-prep-friendly'],          prep: 20, cd: 5, ing: [['rice', 'dal-grain'], ['lemon', 'other'], ['peanut', 'other'], ['curry leaves', 'spice'], ['turmeric', 'spice']] },
    { name: 'Coconut Rice',         cuisine: SI, cat: 'rice',      slots: [L, D],       tags: ['vegan', 'NOG', 'meal-prep-friendly'],            prep: 25, cd: 6, ing: [['rice', 'dal-grain'], ['coconut', 'other'], ['urad dal', 'dal-grain'], ['curry leaves', 'spice']] },
    { name: 'Tamarind Rice',        cuisine: SI, cat: 'rice',      slots: [L, D],       tags: ['vegan', 'meal-prep-friendly'],                   prep: 25, cd: 6, ing: [['rice', 'dal-grain'], ['tamarind', 'spice'], ['peanut', 'other'], ['sesame', 'spice']] },
    { name: 'Bisi Bele Bath',       cuisine: SI, cat: 'rice',      slots: [L, D],       tags: ['heavy', 'comfort', 'meal-prep-friendly'],        prep: 50, cd: 6, ing: [['rice', 'dal-grain'], ['toor dal', 'dal-grain'], ['vegetables', 'vegetable'], ['bisi bele masala', 'spice'], ['tamarind', 'spice'], ['ghee', 'dairy']] },
    { name: 'Vangi Bath',           cuisine: SI, cat: 'rice',      slots: [L, D],       tags: ['vegan'],                                         prep: 35, cd: 6, ing: [['rice', 'dal-grain'], ['brinjal', 'vegetable'], ['vangi bath powder', 'spice'], ['curry leaves', 'spice']] },
    { name: 'Avial',                cuisine: SI, cat: 'curry',     slots: [L, D],       tags: ['NOG', 'comfort'],                                prep: 35, cd: 5, ing: [['mixed vegetables', 'vegetable'], ['coconut', 'other'], ['curd', 'dairy'], ['cumin', 'spice'], ['curry leaves', 'spice']] },
    { name: 'Rasam',                cuisine: SI, cat: 'curry',     slots: [L, D],       tags: ['light', 'quick', 'NOG', 'comfort'],              prep: 20, cd: 3, ing: [['tomato', 'vegetable'], ['tamarind', 'spice'], ['rasam powder', 'spice'], ['curry leaves', 'spice'], ['coriander', 'spice']] },
    { name: 'Kootu',                cuisine: SI, cat: 'curry',     slots: [L, D],       tags: ['NOG', 'comfort', 'vegan'],                       prep: 30, cd: 5, ing: [['mixed vegetables', 'vegetable'], ['moong dal', 'dal-grain'], ['coconut', 'other'], ['cumin', 'spice']] },
    { name: 'Poriyal',              cuisine: SI, cat: 'side',      slots: [L, D],       tags: ['quick', 'vegan', 'NOG'],                         prep: 20, cd: 4, ing: [['vegetables', 'vegetable'], ['coconut', 'other'], ['mustard seeds', 'spice'], ['urad dal', 'dal-grain']] },
    { name: 'Mini Meals',           cuisine: SI, cat: 'thali',     slots: [L],          tags: ['heavy', 'elaborate', 'festive'],                 prep: 75, cd: 7, ing: [['rice', 'dal-grain'], ['sambar', 'dal-grain'], ['rasam', 'spice'], ['vegetables', 'vegetable'], ['curd', 'dairy'], ['papad', 'other']] },
    { name: 'Chapati Kurma',        cuisine: SI, cat: 'curry',     slots: [L, D],       tags: ['comfort'],                                       prep: 45, cd: 5, ing: [['wheat flour', 'dal-grain'], ['mixed vegetables', 'vegetable'], ['coconut', 'other'], ['onion', 'vegetable'], ['ginger-garlic', 'spice']] },
    { name: 'Parota Kurma',         cuisine: SI, cat: 'curry',     slots: [L, D],       tags: ['heavy', 'elaborate'],                            prep: 70, cd: 7, ing: [['maida', 'dal-grain'], ['mixed vegetables', 'vegetable'], ['coconut', 'other'], ['oil', 'other'], ['spices', 'spice']] },

    /* ============= NORTH INDIAN — Breakfast ============= */
    { name: 'Aloo Paratha',         cuisine: NI, cat: 'paratha',   slots: [B, L],       tags: ['heavy', 'comfort', 'kid-friendly'],              prep: 40, cd: 6, ing: [['wheat flour', 'dal-grain'], ['potato', 'vegetable'], ['onion', 'vegetable'], ['ghee', 'dairy'], ['ajwain', 'spice']] },
    { name: 'Gobi Paratha',         cuisine: NI, cat: 'paratha',   slots: [B, L],       tags: ['heavy', 'comfort'],                              prep: 40, cd: 6, ing: [['wheat flour', 'dal-grain'], ['cauliflower', 'vegetable'], ['ghee', 'dairy'], ['ajwain', 'spice'], ['green chilli', 'spice']] },
    { name: 'Methi Paratha',        cuisine: NI, cat: 'paratha',   slots: [B, L],       tags: ['comfort'],                                       prep: 35, cd: 6, ing: [['wheat flour', 'dal-grain'], ['fenugreek leaves', 'vegetable'], ['ghee', 'dairy'], ['cumin', 'spice']] },
    { name: 'Paneer Paratha',       cuisine: NI, cat: 'paratha',   slots: [B, L],       tags: ['heavy', 'kid-friendly'],                         prep: 40, cd: 7, ing: [['wheat flour', 'dal-grain'], ['paneer', 'dairy'], ['ghee', 'dairy'], ['coriander', 'spice'], ['green chilli', 'spice']] },
    { name: 'Poha',                 cuisine: NI, cat: 'tiffin',    slots: [B, S],       tags: ['quick', 'light', 'vegan'],                       prep: 20, cd: 4, ing: [['flattened rice', 'dal-grain'], ['onion', 'vegetable'], ['peanut', 'other'], ['curry leaves', 'spice'], ['turmeric', 'spice'], ['lemon', 'other']] },
    { name: 'Upma',                 cuisine: PAN, cat: 'tiffin',   slots: [B, S],       tags: ['quick', 'light', 'comfort'],                     prep: 20, cd: 4, ing: [['semolina', 'dal-grain'], ['onion', 'vegetable'], ['ginger', 'spice'], ['mustard seeds', 'spice'], ['curry leaves', 'spice']] },
    { name: 'Besan Chilla',         cuisine: NI, cat: 'tiffin',    slots: [B, S],       tags: ['quick', 'light', 'vegan'],                       prep: 20, cd: 5, ing: [['besan', 'dal-grain'], ['onion', 'vegetable'], ['tomato', 'vegetable'], ['coriander', 'spice'], ['ajwain', 'spice']] },
    { name: 'Bedmi Puri',           cuisine: NI, cat: 'tiffin',    slots: [B, S],       tags: ['fried', 'heavy', 'festive'],                     prep: 50, cd: 8, ing: [['wheat flour', 'dal-grain'], ['urad dal', 'dal-grain'], ['oil', 'other'], ['potato', 'vegetable'], ['spices', 'spice']] },
    { name: 'Chole Bhature',        cuisine: NI, cat: 'main',      slots: [B, L],       tags: ['fried', 'heavy', 'festive', 'elaborate'],        prep: 75, cd: 8, ing: [['chickpeas', 'dal-grain'], ['maida', 'dal-grain'], ['onion', 'vegetable'], ['tomato', 'vegetable'], ['chole masala', 'spice'], ['ginger-garlic', 'spice']] },

    /* ============= NORTH INDIAN — Mains / Curries ============= */
    { name: 'Dal Tadka',            cuisine: NI, cat: 'dal',       slots: [L, D],       tags: ['quick', 'comfort', 'meal-prep-friendly'],        prep: 25, cd: 3, ing: [['toor dal', 'dal-grain'], ['onion', 'vegetable'], ['tomato', 'vegetable'], ['ghee', 'dairy'], ['cumin', 'spice'], ['turmeric', 'spice']] },
    { name: 'Dal Makhani',          cuisine: NI, cat: 'dal',       slots: [L, D],       tags: ['heavy', 'elaborate', 'comfort', 'festive'],      prep: 90, cd: 8, ing: [['urad dal', 'dal-grain'], ['rajma', 'dal-grain'], ['butter', 'dairy'], ['cream', 'dairy'], ['tomato', 'vegetable'], ['ginger-garlic', 'spice']] },
    { name: 'Dal Fry',              cuisine: NI, cat: 'dal',       slots: [L, D],       tags: ['comfort', 'meal-prep-friendly'],                 prep: 30, cd: 4, ing: [['toor dal', 'dal-grain'], ['moong dal', 'dal-grain'], ['onion', 'vegetable'], ['tomato', 'vegetable'], ['ghee', 'dairy'], ['cumin', 'spice']] },
    { name: 'Shahi Paneer',         cuisine: NI, cat: 'paneer',    slots: [L, D],       tags: ['heavy', 'festive', 'elaborate'],                 prep: 50, cd: 7, ing: [['paneer', 'dairy'], ['cream', 'dairy'], ['cashew', 'other'], ['tomato', 'vegetable'], ['onion', 'vegetable'], ['garam masala', 'spice']] },
    { name: 'Kadhai Paneer',        cuisine: NI, cat: 'paneer',    slots: [L, D],       tags: ['comfort'],                                       prep: 40, cd: 6, ing: [['paneer', 'dairy'], ['bell pepper', 'vegetable'], ['onion', 'vegetable'], ['tomato', 'vegetable'], ['kadhai masala', 'spice']] },
    { name: 'Palak Paneer',         cuisine: NI, cat: 'paneer',    slots: [L, D],       tags: ['comfort', 'kid-friendly'],                       prep: 45, cd: 6, ing: [['paneer', 'dairy'], ['spinach', 'vegetable'], ['onion', 'vegetable'], ['ginger-garlic', 'spice'], ['cream', 'dairy']] },
    { name: 'Mutter Paneer',        cuisine: NI, cat: 'paneer',    slots: [L, D],       tags: ['comfort', 'kid-friendly'],                       prep: 40, cd: 6, ing: [['paneer', 'dairy'], ['green peas', 'vegetable'], ['tomato', 'vegetable'], ['onion', 'vegetable'], ['garam masala', 'spice']] },
    { name: 'Paneer Bhurji',        cuisine: NI, cat: 'paneer',    slots: [B, L, D],    tags: ['quick', 'comfort'],                              prep: 25, cd: 5, ing: [['paneer', 'dairy'], ['onion', 'vegetable'], ['tomato', 'vegetable'], ['green chilli', 'spice'], ['turmeric', 'spice']] },
    { name: 'Malai Kofta',          cuisine: NI, cat: 'curry',     slots: [L, D],       tags: ['fried', 'heavy', 'festive', 'elaborate'],        prep: 75, cd: 9, ing: [['paneer', 'dairy'], ['potato', 'vegetable'], ['cream', 'dairy'], ['cashew', 'other'], ['onion', 'vegetable'], ['tomato', 'vegetable']] },
    { name: 'Mix Veg',              cuisine: NI, cat: 'curry',     slots: [L, D],       tags: ['comfort'],                                       prep: 35, cd: 5, ing: [['mixed vegetables', 'vegetable'], ['onion', 'vegetable'], ['tomato', 'vegetable'], ['ginger-garlic', 'spice'], ['garam masala', 'spice']] },
    { name: 'Aloo Jeera',           cuisine: NI, cat: 'side',      slots: [L, D],       tags: ['quick', 'comfort', 'NOG'],                       prep: 20, cd: 4, ing: [['potato', 'vegetable'], ['cumin', 'spice'], ['turmeric', 'spice'], ['green chilli', 'spice']] },
    { name: 'Bhindi Masala',        cuisine: NI, cat: 'side',      slots: [L, D],       tags: ['vegan'],                                         prep: 30, cd: 5, ing: [['okra', 'vegetable'], ['onion', 'vegetable'], ['tomato', 'vegetable'], ['amchur', 'spice'], ['coriander', 'spice']] },
    { name: 'Baingan Bharta',       cuisine: NI, cat: 'side',      slots: [L, D],       tags: ['vegan', 'comfort'],                              prep: 40, cd: 6, ing: [['brinjal', 'vegetable'], ['onion', 'vegetable'], ['tomato', 'vegetable'], ['ginger-garlic', 'spice'], ['mustard oil', 'other']] },
    { name: 'Chana Masala',         cuisine: NI, cat: 'main',      slots: [L, D],       tags: ['heavy', 'meal-prep-friendly'],                   prep: 50, cd: 5, ing: [['chickpeas', 'dal-grain'], ['onion', 'vegetable'], ['tomato', 'vegetable'], ['chana masala', 'spice'], ['ginger-garlic', 'spice']] },
    { name: 'Rajma',                cuisine: NI, cat: 'main',      slots: [L, D],       tags: ['heavy', 'comfort', 'meal-prep-friendly'],        prep: 60, cd: 6, ing: [['kidney beans', 'dal-grain'], ['onion', 'vegetable'], ['tomato', 'vegetable'], ['rajma masala', 'spice'], ['ginger-garlic', 'spice']] },
    { name: 'Chhole',               cuisine: NI, cat: 'main',      slots: [L, D],       tags: ['heavy', 'meal-prep-friendly'],                   prep: 50, cd: 5, ing: [['chickpeas', 'dal-grain'], ['onion', 'vegetable'], ['tomato', 'vegetable'], ['chole masala', 'spice'], ['tea bag', 'other']] },
    { name: 'Kadhi Pakoda',         cuisine: NI, cat: 'curry',     slots: [L, D],       tags: ['comfort', 'elaborate'],                          prep: 50, cd: 7, ing: [['curd', 'dairy'], ['besan', 'dal-grain'], ['onion', 'vegetable'], ['turmeric', 'spice'], ['fenugreek seeds', 'spice']] },
    { name: 'Dam Aloo',             cuisine: NI, cat: 'side',      slots: [L, D],       tags: ['festive'],                                       prep: 50, cd: 7, ing: [['baby potato', 'vegetable'], ['curd', 'dairy'], ['cashew', 'other'], ['garam masala', 'spice'], ['cream', 'dairy']] },
    { name: 'Veg Manchurian',       cuisine: 'indo-chinese', cat: 'main', slots: [L, D], tags: ['fried', 'heavy', 'kid-friendly'],               prep: 50, cd: 8, ing: [['mixed vegetables', 'vegetable'], ['cornflour', 'dal-grain'], ['soy sauce', 'other'], ['ginger-garlic', 'spice'], ['spring onion', 'vegetable']] },
    { name: 'Chilli Paneer',        cuisine: 'indo-chinese', cat: 'paneer', slots: [L, D], tags: ['fried', 'heavy'],                              prep: 40, cd: 7, ing: [['paneer', 'dairy'], ['bell pepper', 'vegetable'], ['soy sauce', 'other'], ['ginger-garlic', 'spice'], ['spring onion', 'vegetable']] },

    /* ============= RICE / BIRYANIS ============= */
    { name: 'Veg Biryani',          cuisine: NI, cat: 'rice',      slots: [L, D],       tags: ['heavy', 'festive', 'elaborate', 'meal-prep-friendly'], prep: 75, cd: 8, ing: [['basmati rice', 'dal-grain'], ['mixed vegetables', 'vegetable'], ['curd', 'dairy'], ['biryani masala', 'spice'], ['mint', 'spice'], ['saffron', 'spice']] },
    { name: 'Veg Pulao',            cuisine: NI, cat: 'rice',      slots: [L, D],       tags: ['comfort', 'meal-prep-friendly'],                 prep: 35, cd: 5, ing: [['basmati rice', 'dal-grain'], ['vegetables', 'vegetable'], ['ghee', 'dairy'], ['whole spices', 'spice']] },
    { name: 'Jeera Rice',           cuisine: NI, cat: 'rice',      slots: [L, D],       tags: ['quick', 'NOG', 'meal-prep-friendly'],            prep: 20, cd: 3, ing: [['basmati rice', 'dal-grain'], ['cumin', 'spice'], ['ghee', 'dairy']] },
    { name: 'Plain Rice',           cuisine: PAN, cat: 'rice',     slots: [L, D],       tags: ['quick', 'NOG', 'vegan', 'light'],                prep: 15, cd: 2, ing: [['rice', 'dal-grain']] },
    { name: 'Tehri',                cuisine: NI, cat: 'rice',      slots: [L, D],       tags: ['comfort', 'meal-prep-friendly'],                 prep: 40, cd: 6, ing: [['rice', 'dal-grain'], ['mixed vegetables', 'vegetable'], ['turmeric', 'spice'], ['ghee', 'dairy']] },
    { name: 'Khichdi',              cuisine: PAN, cat: 'rice',     slots: [L, D],       tags: ['light', 'quick', 'NOG', 'comfort', 'meal-prep-friendly'], prep: 25, cd: 3, ing: [['rice', 'dal-grain'], ['moong dal', 'dal-grain'], ['ghee', 'dairy'], ['cumin', 'spice'], ['turmeric', 'spice']] },

    /* ============= BREADS ============= */
    { name: 'Roti',                 cuisine: PAN, cat: 'bread',    slots: [L, D],       tags: ['quick', 'light', 'vegan'],                       prep: 15, cd: 1, ing: [['wheat flour', 'dal-grain']] },
    { name: 'Butter Roti',          cuisine: NI, cat: 'bread',     slots: [L, D],       tags: ['quick', 'kid-friendly'],                         prep: 15, cd: 1, ing: [['wheat flour', 'dal-grain'], ['butter', 'dairy']] },
    { name: 'Tawa Paratha',         cuisine: NI, cat: 'bread',     slots: [L, D],       tags: ['quick', 'comfort'],                              prep: 20, cd: 2, ing: [['wheat flour', 'dal-grain'], ['ghee', 'dairy']] },
    { name: 'Lachha Paratha',       cuisine: NI, cat: 'bread',     slots: [L, D],       tags: ['comfort', 'festive'],                            prep: 35, cd: 5, ing: [['wheat flour', 'dal-grain'], ['ghee', 'dairy']] },
    { name: 'Naan',                 cuisine: NI, cat: 'bread',     slots: [L, D],       tags: ['comfort', 'festive'],                            prep: 30, cd: 6, ing: [['maida', 'dal-grain'], ['curd', 'dairy'], ['yeast', 'other']] },
    { name: 'Missi Roti',           cuisine: NI, cat: 'bread',     slots: [L, D],       tags: ['comfort'],                                       prep: 25, cd: 5, ing: [['wheat flour', 'dal-grain'], ['besan', 'dal-grain'], ['ajwain', 'spice'], ['ghee', 'dairy']] },

    /* ============= CHAATS / SNACKS ============= */
    { name: 'Pani Puri',            cuisine: PAN, cat: 'chaat',    slots: [S],          tags: ['festive', 'kid-friendly'],                       prep: 30, cd: 7, ing: [['puri shells', 'other'], ['mint water', 'other'], ['potato', 'vegetable'], ['chickpeas', 'dal-grain'], ['chutneys', 'other']] },
    { name: 'Bhel Puri',            cuisine: PAN, cat: 'chaat',    slots: [S],          tags: ['quick', 'light'],                                prep: 15, cd: 5, ing: [['puffed rice', 'dal-grain'], ['onion', 'vegetable'], ['tomato', 'vegetable'], ['chutneys', 'other'], ['sev', 'other']] },
    { name: 'Sev Puri',             cuisine: PAN, cat: 'chaat',    slots: [S],          tags: ['quick'],                                         prep: 15, cd: 5, ing: [['papdi', 'other'], ['potato', 'vegetable'], ['onion', 'vegetable'], ['chutneys', 'other'], ['sev', 'other']] },
    { name: 'Dahi Puri',            cuisine: PAN, cat: 'chaat',    slots: [S],          tags: ['quick'],                                         prep: 15, cd: 5, ing: [['puri shells', 'other'], ['curd', 'dairy'], ['potato', 'vegetable'], ['chutneys', 'other']] },
    { name: 'Aloo Chaat',           cuisine: NI, cat: 'chaat',     slots: [S],          tags: ['fried', 'quick'],                                prep: 25, cd: 6, ing: [['potato', 'vegetable'], ['chaat masala', 'spice'], ['lemon', 'other'], ['coriander', 'spice'], ['tamarind chutney', 'other']] },
    { name: 'Samosa',               cuisine: NI, cat: 'snack',     slots: [S],          tags: ['fried', 'heavy', 'comfort'],                     prep: 60, cd: 8, ing: [['maida', 'dal-grain'], ['potato', 'vegetable'], ['green peas', 'vegetable'], ['oil', 'other'], ['spices', 'spice']] },
    { name: 'Kachori',              cuisine: NI, cat: 'snack',     slots: [S],          tags: ['fried', 'heavy'],                                prep: 60, cd: 9, ing: [['maida', 'dal-grain'], ['moong dal', 'dal-grain'], ['oil', 'other'], ['spices', 'spice']] },
    { name: 'Dhokla',               cuisine: 'gujarati', cat: 'snack', slots: [B, S],   tags: ['light', 'vegan', 'meal-prep-friendly'],          prep: 30, cd: 5, ing: [['besan', 'dal-grain'], ['curd', 'dairy'], ['eno', 'other'], ['mustard seeds', 'spice'], ['green chilli', 'spice']] },
    { name: 'Khandvi',              cuisine: 'gujarati', cat: 'snack', slots: [S],      tags: ['light'],                                         prep: 35, cd: 6, ing: [['besan', 'dal-grain'], ['curd', 'dairy'], ['mustard seeds', 'spice'], ['coconut', 'other']] },
    { name: 'Veg Sandwich',         cuisine: CONT, cat: 'snack',   slots: [B, S],       tags: ['quick', 'kid-friendly'],                         prep: 15, cd: 4, ing: [['bread', 'dal-grain'], ['vegetables', 'vegetable'], ['butter', 'dairy'], ['mint chutney', 'other']] },
    { name: 'Grilled Cheese Sandwich', cuisine: CONT, cat: 'snack', slots: [B, S],      tags: ['quick', 'comfort', 'kid-friendly'],              prep: 15, cd: 5, ing: [['bread', 'dal-grain'], ['cheese', 'dairy'], ['butter', 'dairy'], ['vegetables', 'vegetable']] },
    { name: 'Pav Bhaji',            cuisine: NI, cat: 'main',      slots: [L, D, S],    tags: ['heavy', 'comfort', 'kid-friendly', 'festive'],   prep: 50, cd: 7, ing: [['mixed vegetables', 'vegetable'], ['butter', 'dairy'], ['pav', 'dal-grain'], ['pav bhaji masala', 'spice'], ['onion', 'vegetable']] },
    { name: 'Veg Cutlet',           cuisine: PAN, cat: 'snack',    slots: [S],          tags: ['fried', 'kid-friendly'],                         prep: 35, cd: 6, ing: [['potato', 'vegetable'], ['vegetables', 'vegetable'], ['breadcrumbs', 'dal-grain'], ['oil', 'other']] },
    { name: 'Veg Pizza',            cuisine: CONT, cat: 'main',    slots: [D, S],       tags: ['heavy', 'kid-friendly', 'festive'],              prep: 45, cd: 8, ing: [['pizza base', 'dal-grain'], ['cheese', 'dairy'], ['vegetables', 'vegetable'], ['tomato sauce', 'other']] },

    /* ============= SWEETS ============= */
    { name: 'Gulab Jamun',          cuisine: PAN, cat: 'sweet',    slots: [S, D],       tags: ['festive', 'kid-friendly', 'fried'],              prep: 45, cd: 9, ing: [['milk powder', 'dairy'], ['maida', 'dal-grain'], ['sugar', 'other'], ['cardamom', 'spice'], ['ghee', 'dairy']] },
    { name: 'Rasmalai',             cuisine: NI, cat: 'sweet',     slots: [S, D],       tags: ['festive'],                                       prep: 60, cd: 9, ing: [['milk', 'dairy'], ['sugar', 'other'], ['saffron', 'spice'], ['cardamom', 'spice'], ['pistachio', 'other']] },
    { name: 'Rasgulla',             cuisine: NI, cat: 'sweet',     slots: [S, D],       tags: ['festive'],                                       prep: 50, cd: 9, ing: [['milk', 'dairy'], ['sugar', 'other'], ['cardamom', 'spice']] },
    { name: 'Kheer',                cuisine: PAN, cat: 'sweet',    slots: [S, D],       tags: ['festive', 'NOG', 'kid-friendly'],                prep: 45, cd: 8, ing: [['milk', 'dairy'], ['rice', 'dal-grain'], ['sugar', 'other'], ['cardamom', 'spice'], ['cashew', 'other']] },
    { name: 'Sooji Halwa',          cuisine: NI, cat: 'sweet',     slots: [B, S],       tags: ['quick', 'festive', 'NOG'],                       prep: 20, cd: 7, ing: [['semolina', 'dal-grain'], ['sugar', 'other'], ['ghee', 'dairy'], ['cashew', 'other'], ['cardamom', 'spice']] },
    { name: 'Gajar Halwa',          cuisine: NI, cat: 'sweet',     slots: [S, D],       tags: ['festive', 'elaborate'],                          prep: 75, cd: 10, ing: [['carrot', 'vegetable'], ['milk', 'dairy'], ['sugar', 'other'], ['ghee', 'dairy'], ['cashew', 'other']] },
    { name: 'Besan Ladoo',          cuisine: NI, cat: 'sweet',     slots: [S],          tags: ['festive', 'NOG', 'meal-prep-friendly'],          prep: 40, cd: 9, ing: [['besan', 'dal-grain'], ['ghee', 'dairy'], ['sugar', 'other'], ['cardamom', 'spice']] },
    { name: 'Coconut Barfi',        cuisine: PAN, cat: 'sweet',    slots: [S],          tags: ['festive', 'NOG'],                                prep: 30, cd: 9, ing: [['coconut', 'other'], ['sugar', 'other'], ['milk', 'dairy'], ['cardamom', 'spice']] },
    { name: 'Basundi',              cuisine: 'gujarati', cat: 'sweet', slots: [S, D],   tags: ['festive', 'NOG'],                                prep: 50, cd: 9, ing: [['milk', 'dairy'], ['sugar', 'other'], ['saffron', 'spice'], ['nuts', 'other']] },
    { name: 'Jalebi',               cuisine: NI, cat: 'sweet',     slots: [B, S],       tags: ['festive', 'fried'],                              prep: 60, cd: 10, ing: [['maida', 'dal-grain'], ['sugar', 'other'], ['saffron', 'spice'], ['ghee', 'dairy']] },

    /* ============= VRAT-FRIENDLY (fasting day dishes) ============= */
    { name: 'Sabudana Khichdi',     cuisine: PAN, cat: 'tiffin',   slots: [B, L, D],    tags: ['vrat-friendly', 'NOG', 'comfort'],               prep: 30, cd: 5, ing: [['sago', 'dal-grain'], ['potato', 'vegetable'], ['peanut', 'other'], ['cumin', 'spice'], ['green chilli', 'spice']] },
    { name: 'Sabudana Vada',        cuisine: PAN, cat: 'snack',    slots: [S],          tags: ['vrat-friendly', 'fried', 'NOG'],                 prep: 35, cd: 7, ing: [['sago', 'dal-grain'], ['potato', 'vegetable'], ['peanut', 'other'], ['oil', 'other']] },
    { name: 'Kuttu Puri',           cuisine: NI, cat: 'tiffin',    slots: [B, L, D],    tags: ['vrat-friendly', 'fried', 'NOG'],                 prep: 35, cd: 7, ing: [['buckwheat flour', 'dal-grain'], ['potato', 'vegetable'], ['rock salt', 'spice'], ['oil', 'other']] },
    { name: 'Singhara Halwa',       cuisine: NI, cat: 'sweet',     slots: [S, D],       tags: ['vrat-friendly', 'festive', 'NOG'],               prep: 25, cd: 8, ing: [['water chestnut flour', 'dal-grain'], ['ghee', 'dairy'], ['sugar', 'other'], ['cardamom', 'spice']] },
    { name: 'Vrat ke Aloo',         cuisine: NI, cat: 'side',      slots: [L, D],       tags: ['vrat-friendly', 'NOG', 'comfort'],               prep: 25, cd: 5, ing: [['potato', 'vegetable'], ['rock salt', 'spice'], ['cumin', 'spice'], ['green chilli', 'spice']] },
    { name: 'Makhana Kheer',        cuisine: PAN, cat: 'sweet',    slots: [S, D],       tags: ['vrat-friendly', 'festive', 'NOG'],               prep: 30, cd: 8, ing: [['foxnut', 'other'], ['milk', 'dairy'], ['sugar', 'other'], ['cardamom', 'spice']] },
    { name: 'Roasted Makhana',      cuisine: PAN, cat: 'snack',    slots: [S],          tags: ['vrat-friendly', 'quick', 'NOG', 'light'],        prep: 10, cd: 4, ing: [['foxnut', 'other'], ['ghee', 'dairy'], ['rock salt', 'spice']] },
    { name: 'Aloo Tikki (Vrat)',    cuisine: NI, cat: 'snack',     slots: [S],          tags: ['vrat-friendly', 'NOG', 'fried'],                 prep: 30, cd: 6, ing: [['potato', 'vegetable'], ['rock salt', 'spice'], ['green chilli', 'spice'], ['ghee', 'dairy']] },

    /* ============= LIGHT DINNERS / SOUPS ============= */
    { name: 'Tomato Soup',          cuisine: CONT, cat: 'soup',    slots: [D, S],       tags: ['quick', 'light', 'kid-friendly'],                prep: 25, cd: 4, ing: [['tomato', 'vegetable'], ['butter', 'dairy'], ['cream', 'dairy'], ['black pepper', 'spice']] },
    { name: 'Sweet Corn Soup',      cuisine: 'indo-chinese', cat: 'soup', slots: [D, S], tags: ['quick', 'light', 'kid-friendly'],               prep: 20, cd: 5, ing: [['sweet corn', 'vegetable'], ['cornflour', 'dal-grain'], ['vegetables', 'vegetable'], ['black pepper', 'spice']] },
    { name: 'Lemon Coriander Soup', cuisine: CONT, cat: 'soup',    slots: [D, S],       tags: ['quick', 'light', 'vegan'],                       prep: 20, cd: 5, ing: [['vegetables', 'vegetable'], ['lemon', 'other'], ['coriander', 'spice'], ['black pepper', 'spice']] },
    { name: 'Veg Hakka Noodles',    cuisine: 'indo-chinese', cat: 'main', slots: [D, L], tags: ['quick', 'kid-friendly'],                         prep: 30, cd: 6, ing: [['noodles', 'dal-grain'], ['vegetables', 'vegetable'], ['soy sauce', 'other'], ['ginger-garlic', 'spice']] },
    { name: 'Veg Fried Rice',       cuisine: 'indo-chinese', cat: 'rice', slots: [D, L], tags: ['quick', 'kid-friendly'],                         prep: 25, cd: 5, ing: [['rice', 'dal-grain'], ['vegetables', 'vegetable'], ['soy sauce', 'other'], ['spring onion', 'vegetable']] },

    /* ============= ACCOMPANIMENTS ============= */
    { name: 'Bundi Raita',          cuisine: NI, cat: 'side',      slots: [L, D],       tags: ['quick', 'light', 'NOG', 'kid-friendly'],         prep: 10, cd: 3, ing: [['curd', 'dairy'], ['boondi', 'dal-grain'], ['cumin powder', 'spice'], ['mint', 'spice']] },
    { name: 'Mix Raita',            cuisine: NI, cat: 'side',      slots: [L, D],       tags: ['quick', 'light', 'NOG'],                         prep: 10, cd: 3, ing: [['curd', 'dairy'], ['cucumber', 'vegetable'], ['onion', 'vegetable'], ['tomato', 'vegetable'], ['mint', 'spice']] },
    { name: 'Cucumber Raita',       cuisine: PAN, cat: 'side',     slots: [L, D],       tags: ['quick', 'light', 'NOG', 'kid-friendly'],         prep: 8, cd: 3, ing: [['curd', 'dairy'], ['cucumber', 'vegetable'], ['cumin powder', 'spice'], ['mint', 'spice']] },
    { name: 'Green Salad',          cuisine: PAN, cat: 'side',     slots: [L, D],       tags: ['quick', 'light', 'vegan', 'NOG'],                prep: 8, cd: 1, ing: [['cucumber', 'vegetable'], ['tomato', 'vegetable'], ['onion', 'vegetable'], ['lemon', 'other']] },
    { name: 'Papad',                cuisine: PAN, cat: 'side',     slots: [L, D],       tags: ['quick', 'NOG'],                                  prep: 5, cd: 2, ing: [['papad', 'other']] },
  ];

  // Auto-assign IDs and add default fields
  return dishes.map((d, i) => ({
    id: 'd_' + String(i + 1).padStart(3, '0'),
    name: d.name,
    cuisine: d.cuisine,
    category: d.cat,
    suitable_slots: d.slots,
    tags: d.tags,
    prep_time_mins: d.prep,
    cooldown_days: d.cd,
    ingredients: d.ing.map(([name, category]) => ({ name, category })),
    image_url: null,
    enabled: true,
    source: 'seed'
  }));
})();
