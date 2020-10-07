const express = require('express');
const passport = require('passport');
const path = require('path');
const passportSetup = require('./passportConfig');
const officialsController = require('./officialsController.js');
const smsController = require('./smsController.js');

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

// Respond with index.html file when user opens the page
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

// Respond with index.html file when user signs in
app.get('/search', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

// Handle route to /officials using officialsController middleware
app.post(
  '/officials',
  officialsController.getOfficials,
  officialsController.getNews,
  (req, res) => {
    res.status(200).json(res.locals.officialsData);
  }
);

app.post('/send-sms', smsController.sendSMS, (req, res) => {
  return res.end();
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
    res.redirect('/search');
  }
);

// Global error handler
app.use((err, req, res, next) => {
  console.log(`Global error handler received this error: ${err}`);
  res.status(500).send('Internal server error.');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
