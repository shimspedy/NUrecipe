const db = require('./config/db');
const { getMongoDb } = require('./config/mongo');
const { ObjectId } = require('mongodb');
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

// Helper to get a single recipe
function getRecipeById(id, callback) {
  db.query('SELECT * FROM recipes WHERE id = ?', [id], (err, results) => {
    if (err) return callback(err);
    if (!results.length) return callback(null, null);

    const recipe = results[0];
    recipe.ingredients = recipe.ingredients ? JSON.parse(recipe.ingredients) : [];
    callback(null, recipe);
  });
}

// Promise wrapper for easier async/await usage
function getRecipeByIdAsync(id) {
  return new Promise((resolve, reject) => {
    getRecipeById(id, (err, recipe) => {
      if (err) return reject(err);
      resolve(recipe);
    });
  });
}

// Fetch Mongo cooking tips that belong to a recipe
async function getRecipeTips(recipeId) {
  const mongoDb = await getMongoDb();
  const tips = await mongoDb
    .collection('recipeTips')
    .find({ recipeId })
    .sort({ createdAt: -1 })
    .toArray();

  return tips.map(tip => ({
    ...tip,
    id: tip._id.toString()
  }));
}

function toObjectId(id) {
  try {
    return new ObjectId(id);
  } catch (err) {
    return null;
  }
}

// Normalize textarea input into an ingredients array
function parseIngredients(ingredientsInput = '') {
  return ingredientsInput
    .split('\n')
    .map(item => item.trim())
    .filter(Boolean);
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
app.get('/recipes/:id', async (req, res) => {
  const recipeId = parseInt(req.params.id);
  try {
    const recipe = await getRecipeByIdAsync(recipeId);
    if (!recipe) {
      return res.status(404).render('404', { title: 'Recipe Not Found' });
    }
    const tips = await getRecipeTips(recipeId);

    res.render('recipe-detail', {
      title: recipe.title,
      recipe,
      tips
    });
  } catch (err) {
    console.error('Error loading recipe:', err);
    return res.status(500).send('Database error');
  }
});

// Add recipe page - form to create new recipe
app.get('/add-recipe', (req, res) => {
  res.render('add-recipe', {
    title: 'Add New Recipe'
  });
});

// Handle form submission for new recipe
app.post('/recipes', (req, res) => {
  const ingredientsArr = parseIngredients(req.body.ingredients);
  const newRecipe = {
    title: req.body.title,
    description: req.body.description,
    ingredients: JSON.stringify(ingredientsArr),
    instructions: (req.body.instructions || '').trim(),
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

// Edit recipe page
app.get('/recipes/:id/edit', (req, res) => {
  const recipeId = parseInt(req.params.id);
  getRecipeById(recipeId, (err, recipe) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    if (!recipe) {
      return res.status(404).render('404', { title: 'Recipe Not Found' });
    }

    res.render('edit-recipe', {
      title: `Edit ${recipe.title}`,
      recipe,
      ingredientsText: (recipe.ingredients || []).join('\n')
    });
  });
});

// Handle recipe update
app.put('/recipes/:id', (req, res) => {
  const recipeId = parseInt(req.params.id);
  const ingredientsArr = parseIngredients(req.body.ingredients);

  const updatedRecipe = {
    title: req.body.title,
    description: req.body.description,
    ingredients: JSON.stringify(ingredientsArr),
    instructions: (req.body.instructions || '').trim(),
    cookTime: req.body.cookTime,
    servings: parseInt(req.body.servings),
    difficulty: req.body.difficulty,
    category: req.body.category
  };

  db.query('UPDATE recipes SET ? WHERE id = ?', [updatedRecipe, recipeId], (err, result) => {
    if (err) {
      console.error('Error updating recipe:', err);
      return res.status(500).send('Database error');
    }
    if (!result.affectedRows) {
      return res.status(404).render('404', { title: 'Recipe Not Found' });
    }
    res.redirect(`/recipes/${recipeId}`);
  });
});

// Add a MongoDB cooking tip linked to a recipe
app.post('/recipes/:id/tips', async (req, res) => {
  const recipeId = parseInt(req.params.id);
  const title = (req.body.title || '').trim();
  const tipBody = (req.body.tip || '').trim();

  if (!tipBody) {
    return res.redirect(`/recipes/${recipeId}`);
  }

  try {
    const recipe = await getRecipeByIdAsync(recipeId);
    if (!recipe) {
      return res.status(404).render('404', { title: 'Recipe Not Found' });
    }

    const mongoDb = await getMongoDb();
    await mongoDb.collection('recipeTips').insertOne({
      recipeId,
      title: title || 'Cooking Tip',
      tip: tipBody,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.redirect(`/recipes/${recipeId}`);
  } catch (err) {
    console.error('Error adding recipe tip:', err);
    res.status(500).send('NoSQL database error');
  }
});

// Update a MongoDB cooking tip
app.put('/recipes/:id/tips/:tipId', async (req, res) => {
  const recipeId = parseInt(req.params.id);
  const tipId = toObjectId(req.params.tipId);
  const title = (req.body.title || '').trim();
  const tipBody = (req.body.tip || '').trim();

  if (!tipId) {
    return res.status(400).send('Invalid tip id');
  }

  try {
    const mongoDb = await getMongoDb();
    const result = await mongoDb.collection('recipeTips').updateOne(
      { _id: tipId, recipeId },
      {
        $set: {
          title: title || 'Cooking Tip',
          tip: tipBody,
          updatedAt: new Date()
        }
      }
    );

    if (!result.matchedCount) {
      return res.status(404).render('404', { title: 'Recipe Tip Not Found' });
    }

    res.redirect(`/recipes/${recipeId}`);
  } catch (err) {
    console.error('Error updating recipe tip:', err);
    res.status(500).send('NoSQL database error');
  }
});

// Delete a MongoDB cooking tip
app.delete('/recipes/:id/tips/:tipId', async (req, res) => {
  const recipeId = parseInt(req.params.id);
  const tipId = toObjectId(req.params.tipId);

  if (!tipId) {
    return res.status(400).send('Invalid tip id');
  }

  try {
    const mongoDb = await getMongoDb();
    await mongoDb.collection('recipeTips').deleteOne({ _id: tipId, recipeId });
    res.redirect(`/recipes/${recipeId}`);
  } catch (err) {
    console.error('Error deleting recipe tip:', err);
    res.status(500).send('NoSQL database error');
  }
});

// Delete a recipe (and its Mongo cooking tips)
app.delete('/recipes/:id', async (req, res) => {
  const recipeId = parseInt(req.params.id);
  try {
    const result = await new Promise((resolve, reject) => {
      db.query('DELETE FROM recipes WHERE id = ?', [recipeId], (err, mysqlResult) => {
        if (err) return reject(err);
        resolve(mysqlResult);
      });
    });

    if (!result.affectedRows) {
      return res.status(404).render('404', { title: 'Recipe Not Found' });
    }

    const mongoDb = await getMongoDb();
    await mongoDb.collection('recipeTips').deleteMany({ recipeId });

    res.redirect('/recipes');
  } catch (err) {
    console.error('Error deleting recipe:', err);
    res.status(500).send('Database error');
  }
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

// API endpoint to get a single recipe with Mongo cooking tips
app.get('/api/recipes/:id', async (req, res) => {
  const recipeId = parseInt(req.params.id);
  try {
    const recipe = await getRecipeByIdAsync(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    const tips = await getRecipeTips(recipeId);
    res.json({ ...recipe, tips });
  } catch (err) {
    console.error('Error loading recipe via API:', err);
    res.status(500).json({ error: 'Database error', details: err });
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
