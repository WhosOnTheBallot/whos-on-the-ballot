const express = require('express');
const passport = require('passport');
const path = require('path');
const passportSetup = require('./passportConfig');
const officialsController = require('./officialsController.js');

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

// Respond with index.html file when user opens the page
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

// Handle route to /election using electionController middleware
app.post('/officials', officialsController.getOfficials, (req, res) => {
  console.log('last middleware in officials endpoint');
  res.status(200).json(res.locals.officialsData);
});

// Upon clicking the "Login with Google" button, users will be redirected to /auth/google
// At this point, we want to make our initial authentication request to Google. This is the
// part where the user will sign in and give us permission to use their info from Google
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

// This is the 2nd request we will make to Google. After the user has given us permissions and we
// received a code from Google, we will make a 2nd request to actually get the user's info
app.get(
  '/auth/google/redirect',
  passport.authenticate('google'),
  (req, res) => {
    // res.json({ success: true });
    // res.redirect('/');
    res.cookie('loggedIn', 'true');
    // res.sendFile(path.resolve(__dirname, '../index.html'));
    res.redirect('/');
  }
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Global error handler
app.use((err, req, res, next) => {
  console.log(`Global error handler received this error: ${err}`);
  res.status(500).send('Internal server error.');
});
