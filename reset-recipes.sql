-- Drop and recreate the database
DROP DATABASE IF EXISTS recipe_app;
CREATE DATABASE recipe_app;
USE recipe_app;

DROP TABLE IF EXISTS recipes;
CREATE TABLE recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  difficulty VARCHAR(20),
  cookTime VARCHAR(20),
  servings INT,
  ingredients TEXT,
  instructions TEXT
);


-- Insert recipe data
--Minor SQL code fixes, added some missing ' or " or [] when needed 
INSERT INTO recipes (id, title, description, category, difficulty, cookTime, servings, ingredients, instructions) VALUES
(1, 'Spaghetti Carbonara TEST', 'Classic Italian pasta dish with eggs, cheese, and pancetta', 'Italian', 'Medium', '20', 4, '[]', ''), 
(2, 'Chocolate Chip Cookies', 'Soft and chewy homemade chocolate chip cookies', 'Dessert', 'Easy', '25', 36, '[]', ''),
(3, 'Grilled Chicken Salad', 'Healthy grilled chicken salad with mixed greens and vinaigrette', 'Main Course', 'Easy', '30', 2, '[]', ''),
(4, 'Butter Chicken', 'Rich and creamy Indian curry made with spiced tomato sauce and tender chicken.', 'Dinner', 'Medium', '45 minutes', 4, '["chicken", "butter", "tomato sauce", "cream", "garlic", "ginger", "garam masala"]', 'Cook chicken in spices. Make sauce with butter, tomato, and cream. Simmer until thick and serve with rice.'),
(5, 'Chicken Stir Fry', 'Quick vegetable and chicken stir fry.', 'Dinner', 'Medium', '25 minutes', 3, '["chicken breast", "soy sauce", "broccoli", "carrots", "garlic", "rice"]', 'Cook chicken. Add veggies. Stir fry with sauce. Serve over rice.'),
(6, 'Vegetable Tacos', 'Simple vegetarian tacos with fresh toppings.', 'Lunch', 'Easy', '15 minutes', 2, '["tortillas", "bell peppers", "onion", "cheese", "lettuce", "salsa"]', 'Sauté vegetables. Warm tortillas. Assemble with toppings.'),
(7, 'Beef Chili', 'Hearty chili with beans and spices.', 'Dinner', 'Medium', '1 hour', 6, '["ground beef", "kidney beans", "tomato sauce", "onion", "chili powder", "garlic"]', 'Brown beef. Add vegetables and spices. Simmer for 45 minutes.'),
(8, 'Pancakes', 'Fluffy breakfast pancakes.', 'Breakfast', 'Easy', '20 minutes', 4, '["flour", "milk", "eggs", "butter", "baking powder", "sugar"]', 'Mix ingredients. Pour batter onto griddle. Flip once bubbles form.'),
(9, 'Caesar Salad', 'Classic Caesar salad with homemade dressing.', 'Lunch', 'Easy', '10 minutes', 2, '["romaine lettuce", "croutons", "parmesan", "Caesar dressing", "lemon"]', 'Chop lettuce. Toss with dressing. Add croutons and cheese.'),
(10, 'Tomato Soup', 'Creamy tomato soup perfect with grilled cheese.', 'Dinner', 'Easy', '30 minutes', 4, '["tomatoes", "onion", "garlic", "cream", "broth", "basil"]', 'Cook onions and garlic. Add tomatoes and broth. Blend and finish with cream.'),
(11, 'Garlic Shrimp Pasta', 'Light pasta tossed with garlic sautéed shrimp and herbs.', 'Dinner', 'Easy', '25 minutes', 2, '["shrimp", "spaghetti", "garlic", "olive oil", "parsley", "lemon"]', 'Cook pasta. Sauté shrimp with garlic. Toss together with herbs and lemon.'),
(12, 'BBQ Pulled Pork Sandwiches', 'Slow-cooked pulled pork served on toasted buns with BBQ sauce.', 'Lunch', 'Medium', '8 hours', 6, '["pork shoulder", "BBQ sauce", "buns", "onion", "salt", "pepper"]', 'Slow cook pork until tender. Shred and mix with BBQ sauce. Serve on buns.'),
(13, 'Vegetable Fried Rice', 'Simple fried rice loaded with vegetables and soy sauce.', 'Lunch', 'Easy', '20 minutes', 3, '["rice", "carrots", "peas", "eggs", "soy sauce", "green onion"]', 'Cook rice. Stir fry veggies and egg. Add rice and soy sauce.'),
(14, 'Beef Tacos', 'Seasoned ground beef served in tortillas with classic toppings.', 'Dinner', 'Easy', '20 minutes', 4, '["tortillas", "ground beef", "taco seasoning", "lettuce", "cheese", "salsa"]', 'Brown beef with seasoning. Fill tortillas and add toppings.'),
(15, 'Tomato Basil Bruschetta', 'Toasted bread topped with fresh tomato basil mixture.', 'Appetizer', 'Easy', '15 minutes', 6, '["baguette", "tomatoes", "basil", "olive oil", "garlic", "salt"]', 'Mix tomatoes and basil. Toast bread. Spoon mixture over slices.'),
(16, 'Creamy Mushroom Soup', 'Warm and creamy soup made with sautéed mushrooms and herbs.', 'Dinner', 'Medium', '35 minutes', 4, '["mushrooms", "onion", "garlic", "cream", "broth", "thyme"]', 'Sauté mushrooms. Add broth and simmer. Blend and stir in cream.'),
(17, 'Turkey Club Sandwich', 'Stacked sandwich with turkey, bacon, lettuce, and tomato.', 'Lunch', 'Easy', '10 minutes', 1, '["turkey", "bacon", "lettuce", "tomato", "mayo", "bread"]', 'Layer turkey, bacon, lettuce, and tomato on toasted bread with mayo.'),
(18, 'Greek Salad', 'Refreshing salad with tomatoes, cucumbers, olives, and feta.', 'Lunch', 'Easy', '10 minutes', 2, '["cucumber", "tomatoes", "red onion", "olives", "feta", "olive oil"]', 'Chop vegetables. Toss with olives, feta, and olive oil.'),
(19, 'Honey Glazed Salmon', 'Pan-seared salmon finished with a sweet honey glaze.', 'Dinner', 'Medium', '20 minutes', 2, '["salmon", "honey", "soy sauce", "garlic", "lemon"]', 'Sear salmon. Add glaze ingredients. Simmer until coated.'),
(20, 'Banana Pancakes', 'Soft pancakes made with mashed bananas and vanilla.', 'Breakfast', 'Easy', '15 minutes', 3, '["bananas", "flour", "eggs", "milk", "vanilla", "baking powder"]', 'Mix batter. Cook on griddle until golden.');
  
