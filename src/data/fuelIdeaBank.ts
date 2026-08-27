export interface FuelIdea {
  id: string;
  name: string;
  ingredients: string[];
  prepTime: string;
  equipment: string;
  category: 'meal' | 'road' | 'cheap' | 'snack';
  accessTags: string[]; // 'microwave', 'fridge-microwave', 'kitchen', 'nocook', 'gasstation', 'grocerystore', 'hotel', 'restaurant'
  timingTags: string[]; // 'before', 'after', 'between', 'meal', 'snack', 'travel', 'nospecific'
  dietaryTags: string[]; // 'vegetarian', 'vegan', 'gluten-free', 'dairy-free'
  preferenceTags: string[]; // 'cheap', 'fast', 'portable', 'minimal-cooking', 'minimal-cleanup', 'simple'
  steps: string[];
  easySwap?: string;
  sourceAttribution?: string;
}

export const FUEL_IDEA_BANK: FuelIdea[] = [
  {
    id: 'fuel-1',
    name: 'Microwave Burrito Bowl',
    ingredients: [
      '1 pouch microwave rice',
      '1/2 cup canned black beans (rinsed)',
      '1/2 cup frozen corn or mixed vegetables',
      '2 tbsp salsa',
      '1-2 tbsp shredded cheese or nutritional yeast/avocado'
    ],
    prepTime: '~5 mins',
    equipment: 'Microwave only',
    category: 'meal',
    accessTags: ['microwave', 'fridge-microwave', 'hotel'],
    timingTags: ['after', 'meal', 'nospecific'],
    dietaryTags: ['vegetarian', 'gluten-free', 'dairy-free', 'vegan'],
    preferenceTags: ['cheap', 'fast', 'minimal-cooking', 'minimal-cleanup', 'simple'],
    steps: [
      'Heat rice pouch and frozen vegetables in microwave for 1–2 minutes.',
      'Rinse black beans under cold water and stir into the warm rice.',
      'Add salsa and top with cheese, avocado, or preferred dairy-free alternative.'
    ],
    easySwap: 'Skip cheese or use avocado for a completely dairy-free / vegan bowl.',
    sourceAttribution: 'Adapted from Balanced Microwaveable Meals Guide'
  },
  {
    id: 'fuel-2',
    name: 'Loaded Microwave Potato',
    ingredients: [
      '1 russet or sweet potato',
      '1/2 cup canned beans or vegetarian chili',
      '1/2 cup frozen broccoli or green peas',
      '1-2 tbsp cheese or plain Greek yogurt / alternative'
    ],
    prepTime: '~8 mins',
    equipment: 'Microwave only',
    category: 'meal',
    accessTags: ['microwave', 'fridge-microwave', 'hotel'],
    timingTags: ['after', 'meal', 'nospecific'],
    dietaryTags: ['vegetarian', 'gluten-free', 'dairy-free', 'vegan'],
    preferenceTags: ['cheap', 'minimal-cooking', 'minimal-cleanup', 'simple'],
    steps: [
      'Scrub potato, pierce 4–5 times with a fork, and microwave for 5–7 minutes until fork-tender.',
      'Split open and top with canned beans/chili and frozen vegetables.',
      'Microwave for an additional 60 seconds and top with cheese or Greek yogurt.'
    ],
    easySwap: 'Use black beans and salsa for a quick gluten-free and vegan variation.',
    sourceAttribution: 'Adapted from Easy Balanced Microwaveable Meals'
  },
  {
    id: 'fuel-3',
    name: 'Microwave Quesadilla',
    ingredients: [
      '1 whole wheat or corn tortilla',
      '1/3 cup canned black or pinto beans',
      '1/4 cup shredded cheese or plant-based cheese',
      '2 tbsp salsa'
    ],
    prepTime: '~3 mins',
    equipment: 'Microwave only',
    category: 'snack',
    accessTags: ['microwave', 'fridge-microwave', 'hotel'],
    timingTags: ['between', 'snack', 'after', 'nospecific'],
    dietaryTags: ['vegetarian', 'gluten-free', 'dairy-free'],
    preferenceTags: ['cheap', 'fast', 'minimal-cooking', 'minimal-cleanup', 'simple'],
    steps: [
      'Place tortilla on a paper towel or plate; sprinkle cheese and beans over half.',
      'Fold tortilla in half and microwave for 45–60 seconds until cheese is melted.',
      'Slice in half and serve with salsa.'
    ],
    easySwap: 'Use corn tortillas for a gluten-free option or plant-based cheese for dairy-free.'
  },
  {
    id: 'fuel-4',
    name: 'Microwave Oatmeal Bowl',
    ingredients: [
      '1/2 cup quick or rolled oats',
      '1 cup water, milk, or soy/fortified plant beverage',
      '1 sliced banana or 1/2 cup frozen berries',
      '1 tbsp peanut butter, seed butter, or nuts'
    ],
    prepTime: '~3 mins',
    equipment: 'Microwave only',
    category: 'meal',
    accessTags: ['microwave', 'fridge-microwave', 'hotel'],
    timingTags: ['before', 'between', 'meal', 'snack', 'nospecific'],
    dietaryTags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
    preferenceTags: ['cheap', 'fast', 'portable', 'minimal-cooking', 'minimal-cleanup', 'simple'],
    steps: [
      'Combine oats and liquid in a deep microwave-safe bowl.',
      'Microwave on high for 90 seconds (watch closely to prevent boiling over).',
      'Stir in nut or seed butter and top with sliced fruit.'
    ],
    easySwap: 'Use soy milk for extra protein or sunflower seed butter for a nut-free option.'
  },
  {
    id: 'fuel-5',
    name: 'Ramen Veggie & Edamame Bowl',
    ingredients: [
      '1 pack ramen or rice noodles',
      '1/2 cup frozen mixed vegetables',
      '1/2 cup frozen shelled edamame or pre-boiled egg / tofu',
      'Low sodium soy sauce or half seasoning packet'
    ],
    prepTime: '~5 mins',
    equipment: 'Microwave only',
    category: 'meal',
    accessTags: ['microwave', 'fridge-microwave', 'hotel'],
    timingTags: ['meal', 'after', 'nospecific'],
    dietaryTags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
    preferenceTags: ['cheap', 'fast', 'minimal-cooking', 'simple'],
    steps: [
      'Microwave noodles with water and frozen vegetables for 3 minutes.',
      'Stir in edamame or cubed tofu during the last minute of heating.',
      'Drain excess liquid (or keep as broth) and season with low-sodium soy sauce.'
    ],
    easySwap: 'Use rice noodles or gluten-free ramen for a 100% gluten-free bowl.'
  },
  {
    id: 'fuel-6',
    name: 'Tuna & Rice Bowl',
    ingredients: [
      '1 microwave rice cup or pouch',
      '1 can tuna in water (drained)',
      '1/2 cup pre-washed spinach or cucumber slices',
      '1 tbsp light mayo, sriracha, or soy sauce'
    ],
    prepTime: '~3 mins',
    equipment: 'Microwave only',
    category: 'meal',
    accessTags: ['microwave', 'fridge-microwave', 'nocook'],
    timingTags: ['meal', 'after', 'nospecific'],
    dietaryTags: ['gluten-free', 'dairy-free'],
    preferenceTags: ['cheap', 'fast', 'portable', 'minimal-cooking', 'minimal-cleanup'],
    steps: [
      'Warm rice cup in microwave for 60–90 seconds.',
      'Flake drained canned tuna over the warm rice.',
      'Mix in fresh greens or cucumber and drizzle with sriracha or soy sauce.'
    ],
    easySwap: 'Swap tuna for canned chickpeas or edamame for a vegetarian / vegan version.'
  },
  {
    id: 'fuel-7',
    name: 'Rotisserie Chicken & Rice Bowl',
    ingredients: [
      '1 cup shredded pre-cooked rotisserie chicken',
      '1 pouch microwave rice',
      '1/2 cup frozen green beans or broccoli',
      'Teriyaki sauce, salsa, or low-sodium soy sauce'
    ],
    prepTime: '~5 mins',
    equipment: 'Microwave + Fridge',
    category: 'meal',
    accessTags: ['microwave', 'fridge-microwave', 'grocerystore'],
    timingTags: ['meal', 'after', 'travel', 'nospecific'],
    dietaryTags: ['gluten-free', 'dairy-free'],
    preferenceTags: ['fast', 'simple', 'minimal-cooking'],
    steps: [
      'Heat microwave rice pouch and frozen vegetables together.',
      'Add shredded rotisserie chicken over the warm rice.',
      'Drizzle with sauce and serve.'
    ],
    easySwap: 'Great group meal when stopping at a supermarket during away games.',
    sourceAttribution: 'Adapted from AHS Tournaments & Travel Guide'
  },
  {
    id: 'fuel-8',
    name: 'Greek Yogurt & Berry Recovery Bowl',
    ingredients: [
      '3/4 cup plain or vanilla Greek yogurt (or soy/coconut yogurt)',
      '1/3 cup granola or rolled oats',
      '1/2 cup fresh or frozen berries',
      '1 tbsp chia seeds or sliced almonds'
    ],
    prepTime: '~2 mins',
    equipment: 'Fridge / Mini-fridge',
    category: 'snack',
    accessTags: ['fridge-microwave', 'nocook', 'hotel', 'grocerystore', 'gasstation'],
    timingTags: ['after', 'snack', 'between', 'before', 'nospecific'],
    dietaryTags: ['vegetarian', 'gluten-free', 'dairy-free', 'vegan'],
    preferenceTags: ['cheap', 'fast', 'portable', 'minimal-cooking', 'minimal-cleanup', 'simple'],
    steps: [
      'Scoop Greek yogurt or plant yogurt into a bowl or cup.',
      'Top with granola or oats for sustained carbohydrates.',
      'Add fruit and chia seeds for easy post-workout fuel.'
    ],
    easySwap: 'Use dairy-free soy yogurt for a dairy-free / vegan option high in protein.'
  },
  {
    id: 'fuel-9',
    name: 'Seed / Peanut Butter & Banana Wrap',
    ingredients: [
      '1 whole grain or gluten-free tortilla wrap',
      '2 tbsp peanut butter or sunflower seed butter',
      '1 whole banana',
      'Optional 1 tsp chia seeds or cinnamon'
    ],
    prepTime: '~2 mins',
    equipment: 'No cooking required',
    category: 'road',
    accessTags: ['nocook', 'gasstation', 'grocerystore', 'hotel'],
    timingTags: ['before', 'between', 'travel', 'snack', 'nospecific'],
    dietaryTags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
    preferenceTags: ['cheap', 'fast', 'portable', 'minimal-cooking', 'minimal-cleanup', 'simple'],
    steps: [
      'Spread seed or peanut butter evenly across tortilla wrap.',
      'Place peeled whole banana along one edge and roll tightly.',
      'Slice in half for a clean, portable pre-practice or travel snack.'
    ],
    easySwap: 'Use sunflower seed butter for nut-free team travel environments.',
    sourceAttribution: 'Adapted from Road Trip & Tournament Fueling Guide'
  },
  {
    id: 'fuel-10',
    name: 'Hummus & Pita Snack Box',
    ingredients: [
      '1 pre-portioned hummus cup (or 1/3 cup)',
      '1 whole wheat pita or gluten-free crackers',
      '1/2 cup baby carrots or cucumber slices',
      '1 piece fresh fruit (apple or banana)'
    ],
    prepTime: '~2 mins',
    equipment: 'No cooking required',
    category: 'snack',
    accessTags: ['nocook', 'gasstation', 'grocerystore', 'hotel'],
    timingTags: ['between', 'travel', 'snack', 'before', 'nospecific'],
    dietaryTags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
    preferenceTags: ['cheap', 'fast', 'portable', 'minimal-cooking', 'minimal-cleanup', 'simple'],
    steps: [
      'Open hummus cup and place with sliced pita or crackers.',
      'Add pre-washed baby carrots and cucumber slices.',
      'Pair with fresh fruit for a balanced carbohydrate and fiber snack.'
    ],
    easySwap: 'Use gluten-free crackers to make this 100% gluten-free.'
  },
  {
    id: 'fuel-11',
    name: 'No-Cook Turkey or Tofu Wrap',
    ingredients: [
      '1 whole wheat tortilla or gluten-free wrap',
      '3-4 slices deli turkey or smoked tofu',
      '1/2 cup pre-washed lettuce or spinach',
      '1 tbsp mustard or hummus'
    ],
    prepTime: '~3 mins',
    equipment: 'No cooking required',
    category: 'road',
    accessTags: ['nocook', 'grocerystore', 'hotel', 'gasstation'],
    timingTags: ['meal', 'travel', 'after', 'between', 'nospecific'],
    dietaryTags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
    preferenceTags: ['cheap', 'fast', 'portable', 'minimal-cooking', 'minimal-cleanup', 'simple'],
    steps: [
      'Lay wrap flat and spread mustard or hummus over surface.',
      'Layer turkey or smoked tofu slices with fresh spinach.',
      'Roll tightly and wrap in foil or paper towel for travel.'
    ],
    easySwap: 'Use smoked tofu and hummus for a delicious plant-based / dairy-free wrap.'
  },
  {
    id: 'fuel-12',
    name: 'Overnight Power Oats',
    ingredients: [
      '1/2 cup rolled oats',
      '2/3 cup milk or plant milk',
      '1 tbsp chia seeds',
      '1/2 cup frozen berries or sliced banana',
      '1 tsp maple syrup or honey'
    ],
    prepTime: '~3 mins (prep ahead)',
    equipment: 'Fridge / Mini-fridge',
    category: 'meal',
    accessTags: ['fridge-microwave', 'nocook', 'hotel'],
    timingTags: ['before', 'meal', 'travel', 'snack', 'nospecific'],
    dietaryTags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
    preferenceTags: ['cheap', 'fast', 'portable', 'minimal-cooking', 'minimal-cleanup', 'simple'],
    steps: [
      'In a jar or sealable container, combine oats, milk, and chia seeds.',
      'Top with frozen berries and maple syrup.',
      'Seal and refrigerate overnight; eat cold directly from the jar the next morning.'
    ],
    easySwap: 'Use certified gluten-free oats and soy milk for GF / dairy-free fuel.'
  },
  {
    id: 'fuel-13',
    name: 'Bean & Cheese Nacho Plate',
    ingredients: [
      '1-2 handfuls corn tortilla chips',
      '1/2 cup canned black beans (rinsed)',
      '1/4 cup salsa',
      '1/4 cup shredded cheese or guacamole'
    ],
    prepTime: '~3 mins',
    equipment: 'Microwave only',
    category: 'snack',
    accessTags: ['microwave', 'fridge-microwave', 'hotel'],
    timingTags: ['snack', 'after', 'nospecific'],
    dietaryTags: ['vegetarian', 'gluten-free', 'dairy-free', 'vegan'],
    preferenceTags: ['cheap', 'fast', 'minimal-cooking', 'minimal-cleanup', 'simple'],
    steps: [
      'Spread tortilla chips across a microwave-safe paper plate.',
      'Spoon rinsed black beans and salsa over the chips and sprinkle with cheese.',
      'Microwave for 45–60 seconds until cheese is melted.'
    ],
    easySwap: 'Top with guacamole instead of cheese for a dairy-free option.'
  },
  {
    id: 'fuel-14',
    name: 'Scrambled Eggs, Toast & Fruit',
    ingredients: [
      '2 eggs (or 1/2 cup scrambled tofu)',
      '2 slices whole wheat or gluten-free bread',
      '1 tsp butter, olive oil, or avocado',
      '1 orange or 1/2 cup berries'
    ],
    prepTime: '~7 mins',
    equipment: 'Full kitchen',
    category: 'meal',
    accessTags: ['kitchen'],
    timingTags: ['meal', 'before', 'after', 'nospecific'],
    dietaryTags: ['vegetarian', 'gluten-free', 'dairy-free', 'vegan'],
    preferenceTags: ['cheap', 'simple'],
    steps: [
      'Whisk eggs with a pinch of salt and scramble in a pan over medium heat.',
      'Toast bread and spread with avocado or butter.',
      'Serve alongside fresh orange slices or berries.'
    ],
    easySwap: 'Swap eggs for seasoned scrambled tofu for a 100% plant-based meal.'
  },
  {
    id: 'fuel-15',
    name: 'Pasta with Beans & Frozen Veggies',
    ingredients: [
      '1 cup dry pasta (whole wheat or gluten-free)',
      '1/2 cup canned white beans or cooked chicken',
      '1 cup frozen peas/spinach/carrots',
      '1/2 cup marinara sauce'
    ],
    prepTime: '~12 mins',
    equipment: 'Full kitchen',
    category: 'meal',
    accessTags: ['kitchen'],
    timingTags: ['meal', 'after', 'nospecific'],
    dietaryTags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
    preferenceTags: ['cheap', 'simple', 'minimal-cleanup'],
    steps: [
      'Boil pasta in water; add frozen vegetables during the last 2 minutes of boiling.',
      'Drain pasta and vegetables together.',
      'Stir marinara sauce and rinsed white beans into the warm pot.'
    ],
    easySwap: 'Use chickpea or lentil pasta for extra protein and fiber.'
  },
  {
    id: 'fuel-16',
    name: 'Gas Station Fuel: Trail Mix & Fruit',
    ingredients: [
      '1 bag simple trail mix (nuts & dried fruit)',
      '1 fresh banana or apple',
      '1 bottle water or electrolyte drink'
    ],
    prepTime: '0 mins',
    equipment: 'Convenience store / Gas station',
    category: 'road',
    accessTags: ['gasstation', 'nocook', 'hotel', 'restaurant'],
    timingTags: ['travel', 'before', 'snack', 'nospecific'],
    dietaryTags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
    preferenceTags: ['fast', 'portable', 'minimal-cooking', 'minimal-cleanup', 'simple'],
    steps: [
      'Grab a bag of trail mix containing nuts, seeds, and dried fruit.',
      'Pick up a fresh banana or apple from the counter basket.',
      'Drink water to maintain hydration on the bus trip.'
    ],
    easySwap: 'Look for pumpkin seeds / seed mix if nut-allergic.',
    sourceAttribution: 'Adapted from AHS Tournaments & Travel Guide'
  },
  {
    id: 'fuel-17',
    name: 'Gas Station Recovery: Cheese, Crackers & Juice',
    ingredients: [
      '1-2 string cheese sticks',
      '1 pack whole grain or seed crackers',
      '1 bottle 100% orange juice or chocolate milk'
    ],
    prepTime: '0 mins',
    equipment: 'Convenience store / Gas station',
    category: 'road',
    accessTags: ['gasstation', 'nocook', 'hotel', 'restaurant'],
    timingTags: ['travel', 'after', 'snack', 'nospecific'],
    dietaryTags: ['vegetarian', 'gluten-free'],
    preferenceTags: ['fast', 'portable', 'minimal-cooking', 'minimal-cleanup', 'simple'],
    steps: [
      'Select string cheese and whole grain cracker pack.',
      'Pair with 100% juice or chocolate milk for quick post-game carbohydrate replenishment.',
      'Consume within 30–60 minutes post-competition on the road.'
    ],
    easySwap: 'Swap chocolate milk for soy milk or fortified orange juice if dairy-free.'
  },
  {
    id: 'fuel-18',
    name: 'Supermarket Stop: Rotisserie & Salad Wrap',
    ingredients: [
      '1/2 warm rotisserie chicken',
      '1 pack whole wheat tortillas or GF wraps',
      '1 bag pre-washed Caesar or garden salad kit'
    ],
    prepTime: '~2 mins',
    equipment: 'Grocery store stop',
    category: 'road',
    accessTags: ['grocerystore', 'nocook', 'hotel'],
    timingTags: ['travel', 'meal', 'after', 'nospecific'],
    dietaryTags: ['gluten-free', 'dairy-free'],
    preferenceTags: ['fast', 'portable', 'minimal-cooking', 'simple'],
    steps: [
      'Purchase a warm rotisserie chicken and salad kit at a grocery stop.',
      'Shred chicken into a wrap, add salad greens and light dressing.',
      'Roll tightly and enjoy directly in the bus or hotel room.'
    ],
    easySwap: 'Great high-protein group meal idea when stopping at a supermarket during away games.',
    sourceAttribution: 'Adapted from Road Trip & Tournament Fueling Guide'
  },
  {
    id: 'fuel-19',
    name: 'Hotel Room Microwave Chili & Rice',
    ingredients: [
      '1 can low-sodium bean chili',
      '1 microwave rice cup',
      '1 handful corn tortilla chips'
    ],
    prepTime: '~3 mins',
    equipment: 'Hotel Room Microwave',
    category: 'road',
    accessTags: ['hotel', 'microwave', 'fridge-microwave'],
    timingTags: ['travel', 'meal', 'after', 'nospecific'],
    dietaryTags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
    preferenceTags: ['cheap', 'fast', 'minimal-cooking', 'minimal-cleanup', 'simple'],
    steps: [
      'Microwave rice cup for 60 seconds.',
      'Pour canned chili into a microwave-safe bowl or mug and heat for 2 minutes.',
      'Combine and dip with tortilla chips.'
    ],
    easySwap: 'Naturally vegetarian, gluten-free, and cost-effective on travel trips.'
  },
  {
    id: 'fuel-20',
    name: 'Cottage Cheese or Yogurt Fruit Bowl',
    ingredients: [
      '3/4 cup low-fat cottage cheese or Greek yogurt',
      '1/2 cup canned peaches in juice or fresh berries',
      'Dash of cinnamon or 1 tbsp honey'
    ],
    prepTime: '~2 mins',
    equipment: 'Mini-fridge',
    category: 'snack',
    accessTags: ['fridge-microwave', 'nocook', 'hotel', 'grocerystore'],
    timingTags: ['snack', 'after', 'between', 'nospecific'],
    dietaryTags: ['vegetarian', 'gluten-free'],
    preferenceTags: ['cheap', 'fast', 'minimal-cooking', 'minimal-cleanup', 'simple'],
    steps: [
      'Scoop cottage cheese or Greek yogurt into a bowl.',
      'Top with fruit and a sprinkle of cinnamon.',
      'Great easy recovery protein option before bed or after practice.'
    ],
    easySwap: 'Use plant yogurt for dairy-free option.'
  },
  {
    id: 'fuel-21',
    name: 'Apple & Peanut/Seed Butter Slices',
    ingredients: [
      '1 medium apple or 2 celery stalks',
      '2 tbsp peanut butter or sunflower seed butter',
      '1 tbsp raisins or dried cranberries'
    ],
    prepTime: '~2 mins',
    equipment: 'No cooking required',
    category: 'snack',
    accessTags: ['nocook', 'hotel', 'gasstation', 'grocerystore'],
    timingTags: ['before', 'between', 'snack', 'travel', 'nospecific'],
    dietaryTags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
    preferenceTags: ['cheap', 'fast', 'portable', 'minimal-cooking', 'minimal-cleanup', 'simple'],
    steps: [
      'Slice apple or celery length-wise.',
      'Spread peanut butter or seed butter onto slices.',
      'Press raisins on top for an easy portable fuel snack.'
    ],
    easySwap: 'Nut-free when prepared with sunflower seed butter.'
  },
  {
    id: 'fuel-22',
    name: 'Microwave Mug Scramble & Toast',
    ingredients: [
      '2 eggs',
      '2 tbsp milk or water',
      '1/4 cup diced bell pepper or spinach',
      '1 slice bread'
    ],
    prepTime: '~3 mins',
    equipment: 'Microwave only',
    category: 'meal',
    accessTags: ['microwave', 'fridge-microwave'],
    timingTags: ['meal', 'before', 'between', 'nospecific'],
    dietaryTags: ['vegetarian', 'gluten-free', 'dairy-free'],
    preferenceTags: ['cheap', 'fast', 'minimal-cooking', 'minimal-cleanup', 'simple'],
    steps: [
      'Crack eggs into a microwave-safe mug, add liquid and veggies, whisk with a fork.',
      'Microwave on high for 60–90 seconds, stirring once midway.',
      'Serve alongside bread or wrap in a tortilla.'
    ],
    easySwap: 'Quick warm egg option for residence dorms without a stove.'
  },
  {
    id: 'fuel-23',
    name: 'Warm Edamame & Rice Bowl',
    ingredients: [
      '3/4 cup frozen shelled edamame',
      '1 microwave rice cup',
      '1 tbsp low-sodium soy sauce or tamari',
      '1 tsp sesame seeds'
    ],
    prepTime: '~3 mins',
    equipment: 'Microwave only',
    category: 'meal',
    accessTags: ['microwave', 'fridge-microwave', 'hotel'],
    timingTags: ['meal', 'after', 'between', 'nospecific'],
    dietaryTags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
    preferenceTags: ['cheap', 'fast', 'minimal-cooking', 'minimal-cleanup', 'simple'],
    steps: [
      'Microwave frozen edamame with 1 tbsp water for 2 minutes.',
      'Mix warm edamame into microwave rice cup.',
      'Drizzle with soy sauce or tamari and sprinkle with sesame seeds.'
    ],
    easySwap: '100% plant-based, gluten-free (with tamari), and rich in fiber and protein.'
  },
  {
    id: 'fuel-24',
    name: 'Canned Salmon & Avocado Crackers',
    ingredients: [
      '1 can salmon or tuna (drained)',
      '1/2 mashed avocado or 2 tbsp mayo',
      '1 pack whole grain or gluten-free crackers',
      'Squeeze of lemon juice'
    ],
    prepTime: '~3 mins',
    equipment: 'No cooking required',
    category: 'road',
    accessTags: ['nocook', 'hotel', 'grocerystore', 'gasstation'],
    timingTags: ['travel', 'snack', 'after', 'nospecific'],
    dietaryTags: ['gluten-free', 'dairy-free'],
    preferenceTags: ['fast', 'portable', 'minimal-cooking', 'minimal-cleanup', 'simple'],
    steps: [
      'Mash avocado with drained salmon or tuna and lemon juice in a bowl.',
      'Scoop onto crackers for a quick no-cook protein snack.',
      'Great for bus rides or hotel rooms without a microwave.'
    ],
    easySwap: 'Provides healthy omega-3 fats and protein without requiring cooking.'
  },
  {
    id: 'fuel-25',
    name: 'Frozen Berry & Yogurt Smoothie Bowl',
    ingredients: [
      '3/4 cup Greek or plant yogurt',
      '1/2 cup frozen berries',
      '1/4 cup milk or juice',
      '2 tbsp oats or chia seeds for topping'
    ],
    prepTime: '~3 mins',
    equipment: 'Dorm Blender / Mini-fridge',
    category: 'snack',
    accessTags: ['fridge-microwave', 'kitchen'],
    timingTags: ['after', 'snack', 'before', 'nospecific'],
    dietaryTags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
    preferenceTags: ['fast', 'minimal-cooking', 'simple'],
    steps: [
      'Blend frozen berries, yogurt, and splash of milk/juice until thick.',
      'Pour into a bowl and top with oats or chia seeds.',
      'Eat with a spoon for a refreshing post-workout fuel.'
    ],
    easySwap: 'Use plant yogurt and plant milk for a vegan smoothie bowl.'
  }
];
