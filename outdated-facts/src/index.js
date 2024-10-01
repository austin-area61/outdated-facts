const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/outdatedFacts', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const factSchema = new mongoose.Schema({
  fact: String,
  yearDisproved: Number
});

const Fact = mongoose.model('Fact', factSchema);

// Seed database with some example facts
app.get('/facts/:year', async (req, res) => {
  const year = parseInt(req.params.year);
  const facts = await Fact.find({ yearDisproved: { $gt: year } });
  res.json(facts.map(fact => fact.fact));
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
