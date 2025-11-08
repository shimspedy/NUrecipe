const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Load recipes from JSON file
const dataPath = path.join(__dirname, 'data', 'recipes.json');
let recipes = [];

try {
  const fileData = fs.readFileSync(dataPath, 'utf8');
  recipes = JSON.parse(fileData);
} catch (err) {
  console.error('Error reading recipes.json:', err);
}

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

  // Save to JSON file
  try {
    fs.writeFileSync(dataPath, JSON.stringify(recipes, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving to recipes.json:', err);
  }

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