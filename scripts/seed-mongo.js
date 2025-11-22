/* eslint-disable no-console */
require('dotenv').config();
const { getMongoDb, closeMongo } = require('../config/mongo');

async function purgeLegacyCookingTips(db) {
  await db.collection('cookingTips').deleteMany({});
}

async function seedRecipeTips(db) {
  const tips = [
    {
      recipeId: 1,
      title: 'Authentic swap',
      tip: 'Use guanciale instead of bacon for better Carbonara flavor.'
    },
    {
      recipeId: 4,
      title: 'Time saver',
      tip: 'Marinate chicken in yogurt 30 minutes before cooking to tenderize faster.'
    },
    {
      recipeId: 8,
      title: 'Fluffier pancakes',
      tip: 'Let the batter rest 5 minutes so bubbles form before cooking.'
    }
  ].map(tip => ({
    ...tip,
    createdAt: new Date(),
    updatedAt: new Date()
  }));

  const tipsCollection = db.collection('recipeTips');
  await tipsCollection.deleteMany({});
  const result = await tipsCollection.insertMany(tips);
  const insertedTotal = result.insertedCount || Object.keys(result.insertedIds || {}).length || tips.length;
  console.log(`Seeded ${insertedTotal} recipe-linked cooking tips into ${db.databaseName}.`);
}

async function run() {
  const db = await getMongoDb();
  await purgeLegacyCookingTips(db);
  await seedRecipeTips(db);
}

run()
  .then(() => closeMongo())
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error seeding MongoDB recipe tips:', err);
    process.exit(1);
  });
