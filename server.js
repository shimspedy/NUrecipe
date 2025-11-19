const fs = require('fs');
const db = require('./config/db');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const connectMongo = require("./db/mongo");

// set up MongoDB connection
let mongoDB;
connectMongo().then(dbConn => {
  mongoDB = dbConn;
  console.log("MongoDB ready");
});

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

// Helper to get all recipes from MySQL
function getAllRecipes(callback) {
  db.query('SELECT * FROM recipes', (err, results) => {
    if (err) return callback(err);
    // Parse ingredients JSON for each recipe
    const recipes = results.map(r => ({
      ...r,
      ingredients: r.ingredients ? JSON.parse(r.ingredients) : []
    }));
    callback(null, recipes);
  });
}

// Routes

// Home page - shows featured recipes
app.get('/', (req, res) => {
  getAllRecipes((err, recipes) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    res.render('index', {
      title: 'Recipe App - Home',
      recipes: recipes.slice(0, 3)
    });
  });
});

// All recipes page - browse all recipes
app.get('/recipes', (req, res) => {
  getAllRecipes((err, recipes) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    res.render('recipes', {
      title: 'All Recipes',
      recipes
    });
  });
});

// Single recipe detail page
app.get('/recipes/:id', (req, res) => {
  const recipeId = parseInt(req.params.id);
  db.query('SELECT * FROM recipes WHERE id = ?', [recipeId], (err, results) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    if (!results.length) {
      return res.status(404).render('404', { title: 'Recipe Not Found' });
    }
    const recipe = results[0];
    recipe.ingredients = recipe.ingredients ? JSON.parse(recipe.ingredients) : [];
    res.render('recipe-detail', {
      title: recipe.title,
      recipe
    });
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
  const ingredientsArr = req.body.ingredients.split('\n').filter(i => i.trim() !== '');
  const newRecipe = {
    title: req.body.title,
    description: req.body.description,
    ingredients: JSON.stringify(ingredientsArr),
    instructions: req.body.instructions,
    cookTime: req.body.cookTime,
    servings: parseInt(req.body.servings),
    difficulty: req.body.difficulty,
    category: req.body.category
  };
  db.query('INSERT INTO recipes SET ?', newRecipe, (err) => {
    if (err) {
      console.error('Error saving to MySQL:', err);
      return res.status(500).send('Database error');
    }
    res.redirect('/recipes');
  });
});

// About page - information about the app
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Recipe App'
  });
});
// API endpoint to get all recipes as JSON
app.get('/api/recipes', (req, res) => {
  getAllRecipes((err, recipes) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err });
    }
    res.json(recipes);
  });
});

// NoSQL: Get all documents from MongoDB
app.get('/nosql', async (req, res) => {
  try {
    const collection = mongoDB.collection("nosql_recipes");
    const data = await collection.find().toArray();

    res.render('nosql', {
      title: 'NoSQL Data',
      data
    });
  } catch (err) {
    console.error("MongoDB Query Error:", err);
    res.status(500).send("NoSQL database error");
  }
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