const express = require('express');
const path = require('path');
const officialsController = require('./officialsController.js');
const PORT = 3000;

const app = express();

app.use(express.json());

// Respond with index.html file when user opens the page
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

// Handle route to /election using electionController middleware
app.post('/officials', officialsController.getOfficials, (req, res) => {
  res.status(200).json(res.locals.officialsData);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Global error handler
app.use((err, req, res, next) => {
  console.log(`Global error handler received this error: ${err}`);
  res.status(500).send('Internal server error.');
});
