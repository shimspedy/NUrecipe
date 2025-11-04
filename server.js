const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Sample recipe data (in a real app, this would come from a database)
let recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    description: "Classic Italian pasta dish with eggs, cheese, and pancetta",
    ingredients: ["400g spaghetti", "200g pancetta", "4 large eggs", "100g Parmesan cheese", "Black pepper", "Salt"],
    instructions: "1. Cook pasta according to package directions. 2. Fry pancetta until crispy. 3. Mix eggs and cheese. 4. Combine all ingredients while pasta is hot.",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "Medium",
    category: "Italian"
  },
  {
    id: 2,
    title: "Chocolate Chip Cookies",
    description: "Soft and chewy homemade chocolate chip cookies",
    ingredients: ["2¼ cups flour", "1 tsp baking soda", "1 tsp salt", "1 cup butter", "¾ cup brown sugar", "¾ cup white sugar", "2 eggs", "2 cups chocolate chips"],
    instructions: "1. Preheat oven to 375°F. 2. Mix dry ingredients. 3. Cream butter and sugars. 4. Add eggs and vanilla. 5. Combine wet and dry ingredients. 6. Fold in chocolate chips. 7. Bake for 9-11 minutes.",
    cookTime: "25 minutes",
    servings: 36,
    difficulty: "Easy",
    category: "Dessert"
  }
];

// Routes

// Home page - shows featured recipes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Recipe App - Home',
    recipes: recipes.slice(0, 3) // Show first 3 recipes as featured
  });
});

// All recipes page - browse all recipes
app.get('/recipes', (req, res) => {
  res.render('recipes', { 
    title: 'All Recipes',
    recipes: recipes 
  });
});

// Single recipe detail page
app.get('/recipes/:id', (req, res) => {
  const recipeId = parseInt(req.params.id);
  const recipe = recipes.find(r => r.id === recipeId);
  
  if (!recipe) {
    return res.status(404).render('404', { title: 'Recipe Not Found' });
  }
  
  res.render('recipe-detail', { 
    title: recipe.title,
    recipe: recipe 
  });
});

// Add recipe page - form to create new recipe
app.get('/add-recipe', (req, res) => {
  res.render('add-recipe', { 
    title: 'Add New Recipe'
  });
});

// Handle form submission for new recipe
app.post('/recipes', (req, res) => {
  const newRecipe = {
    id: recipes.length + 1,
    title: req.body.title,
    description: req.body.description,
    ingredients: req.body.ingredients.split('\n').filter(i => i.trim() !== ''),
    instructions: req.body.instructions,
    cookTime: req.body.cookTime,
    servings: parseInt(req.body.servings),
    difficulty: req.body.difficulty,
    category: req.body.category
  };
  
  recipes.push(newRecipe);
  res.redirect('/recipes');
});

// About page - information about the app
app.get('/about', (req, res) => {
  res.render('about', { 
    title: 'About Recipe App'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Recipe App server is running on http://localhost:${PORT}`);
});

module.exports = app;