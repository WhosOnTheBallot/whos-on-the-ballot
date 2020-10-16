const express = require("express");

const NewsAPI = require("newsapi");

require("dotenv").config(); // Load variables into process.env from our .env file

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

officialsController.getNews = (req, res, next) => {
  const getNewsForRep = (arr, idx) => {
    if (idx === arr.length) {
      return next();
    }

    const rep = arr[idx];
    rep.articles = [];

    // Make a query to the newsapi to grab information about the current representative
    newsapi.v2
      .everything({
        q: `${rep.name} ${rep.office}`,
        language: "en",
        sources:
          "cbs-news,associated-press,abc-news,bbc-news,bloomberg,business-insider,cnn,fortune,fox-news,google-news,msnbc,nbc-news,national-review,newsweek,the-wallstreet-journal,the-american-conservative,the-washington-post,time,usa-today,ny-times,the-washington-times,new-york-magazine",
      })
      .then((response) => {
        const { articles } = response;
        const { length } = articles;

        // We want to grab random articles out from what we are given. Otherwise, we'll primarily
        // be grabbing from the first "source" listed in our query
        let i = 0;
        let articleIdx = Math.floor(Math.random() * length);

        // If we have an empty array, articleIdx would be 0 and we would try to access an idx
        // that doesn't exist, so we need to account for that
        if (length !== 0) {
          while (i < 3) {
            rep.articles.push(articles[articleIdx].url);
            articleIdx = Math.floor(Math.random() * length);
            i += 1;
          }
        }

        getNewsForRep(arr, idx + 1);
      });
  };

  // We chose a recursive approach because we are making asynchronous calls. So, if we used a loop,
  // then we move onto the next iteration before the current iteration has received its data.
  // This way, we can only move on to the next element when the current element has finished
  getNewsForRep(res.locals.officialsData, 0);
};

module.exports = officialsController;
