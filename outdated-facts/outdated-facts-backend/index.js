const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (update the connection string as needed)
mongoose.connect('mongodb://localhost:27017/outdatedFacts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model for facts
const factSchema = new mongoose.Schema({
  fact: String,
  yearDisproved: Number,
});

const Fact = mongoose.model('Fact', factSchema);

// Seed database with example facts (run this once and comment it out after)
const seedDatabase = async () => {
  const facts = [
    { fact: "Pluto is no longer classified as a planet", yearDisproved: 2006 },
    { fact: "The food pyramid has been replaced by MyPlate", yearDisproved: 2011 },
    { fact: "Vaccines cause autism", yearDisproved: 2004 },
    { fact: "The universe was once thought to be static", yearDisproved: 1929 },
  ];

  await Fact.deleteMany(); // Clear existing facts
  await Fact.insertMany(facts); // Insert new facts
  console.log("Database seeded with initial facts");
};

// Call the seed function
seedDatabase().catch(err => console.error("Error seeding database:", err));

// Define a route to get facts based on graduation year
app.get('/facts/:year', async (req, res) => {
  const year = parseInt(req.params.year);
  const facts = await Fact.find({ yearDisproved: { $gt: year } });
  res.json(facts.map(fact => fact.fact));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
