require('dotenv').config({ path: __dirname + './../../variables.env' });
const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, {
    useMongoClient: true
});
mongoose.Promise = global.Promise;

const Review = require('../models/Review');

const reviews = JSON.parse(fs.readFileSync(__dirname + '/reviews.json', 'utf-8'));

async function deleteData() {
  await Review.remove();
  console.log('Data deleted.');
  process.exit();
}

async function loadData() {
  try {
    await Review.insertMany(reviews);
    console.log('Done!');
    process.exit();
  } catch(e) {
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
