const express = require('express');
const axios = require('axios');

require('dotenv').config(); // Load variables into process.env from our .env file

const API_KEY = process.env.API_KEY; // Grab our API_KEY from the .env file

const formatOfficialsData = (officialsObject) => {
  // Grab the "offices" array which contains information about each title, such as
  // "Vice President of the United States"
  const officeTitles = officialsObject.offices;

  // Iterate through the "officials" array and grab the individual's name, party, and photoUrl.
  // Example: "Mike Pence", "Republican Party",
  // "https://www.whitehouse.gov/sites/whitehouse.gov/files/images/45/VPE%20Color.jpg"
  const officials = officialsObject.officials.map((official) => {
    return {
      name: official.name,
      party: official.party,
      photoUrl: official.photoUrl,
    };
  });

  // Our "officials" array has all the info we need except the office titles, so we will iterate
  // through each officeTitle and add them to our "officials" array
  officeTitles.forEach((titleObj) => {
    // This tells us which officials from our "officials" array correspond with the current job title
    const correspondingIndices = titleObj.officialIndices;

    // Iterate through each of these correspondingIndices and grab the official that this
    // index points to (from our officials array)
    correspondingIndices.forEach((officialsIndex) => {
      // Add a property called office to the current official. The value is grabbed from the
      // current title (which is titleObj.name)
      officials[officialsIndex].office = titleObj.name;
    });
  });

  return officials.reverse();
};

const officialsController = {};

officialsController.getOfficials = (req, res, next) => {
  axios
    .get(
      `https://www.googleapis.com/civicinfo/v2/representatives?key=${API_KEY}&address=${req.body.address}`
    )
    .then((result) => {
      res.locals.officialsData = formatOfficialsData(result.data);
      next();
    })
    .catch((err) => next(err));
};

module.exports = officialsController;
