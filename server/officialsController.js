const express = require('express');
const axios = require('axios');

const NewsAPI = require('newsapi');

require('dotenv').config(); // Load variables into process.env from our .env file

const { API_KEY } = process.env; // Grab our API_KEY from the .env file
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

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

  // return officials.reverse();
  return officials;
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

officialsController.getNews = (req, res, next) => {
  console.log('in get news');

  const getNewsForRep = async (arr, idx) => {
    if (idx === arr.length) {
      return next();
    }

    const rep = arr[idx];
    rep.articles = [];

    await newsapi.v2
      .everything({
        q: rep.name,
        language: 'en',
      })
      .then((response) => {
        for (let i = 0; i < 3; i += 1) {
          if (response.articles[i]) {
            rep.articles.push(response.articles[i].url);
          }
        }

        // response.articles.forEach((article) => {
        //   // console.log(article);
        // });
        // rep.articles = rep.articles(slice(3))
        getNewsForRep(arr, idx + 1);
      });
  };

  getNewsForRep(res.locals.officialsData, 0);

  // res.locals.officialsData.forEach((official) => {
  //   console.log('in for each');
  //   official.articles = [];
  //   // async issue, forEach finishes before get requests are over
  // });
};

module.exports = officialsController;
