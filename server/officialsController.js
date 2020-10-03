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

/*

[
  {
    name: 'President of the United States',
    divisionId: 'ocd-division/country:us',
    levels: [ 'country' ],
    roles: [ 'headOfState', 'headOfGovernment' ],
    officialIndices: [ 0 ]
  },
  {
    name: 'Vice President of the United States',
    divisionId: 'ocd-division/country:us',
    levels: [ 'country' ],
    roles: [ 'deputyHeadOfGovernment' ],
    officialIndices: [ 1 ]
  },
  {
    name: 'U.S. Senator',
    divisionId: 'ocd-division/country:us/state:ny',
    levels: [ 'country' ],
    roles: [ 'legislatorUpperBody' ],
    officialIndices: [ 2, 3 ]
  },
  {
    name: 'U.S. Representative',
    divisionId: 'ocd-division/country:us/state:ny/cd:9',
    levels: [ 'country' ],
    roles: [ 'legislatorLowerBody' ],
    officialIndices: [ 4 ]
  },
  {
    name: 'Governor of New York',
    divisionId: 'ocd-division/country:us/state:ny',
    levels: [ 'administrativeArea1' ],
    roles: [ 'headOfGovernment' ],
    officialIndices: [ 5 ]
  },
  {
    name: 'Lieutenant Governor of New York',
    divisionId: 'ocd-division/country:us/state:ny',
    levels: [ 'administrativeArea1' ],
    roles: [ 'deputyHeadOfGovernment' ],
    officialIndices: [ 6 ]
  },
  {
    name: 'NY State Senator',
    divisionId: 'ocd-division/country:us/state:ny/sldu:21',
    levels: [ 'administrativeArea1' ],
    roles: [ 'legislatorUpperBody' ],
    officialIndices: [ 7 ]
  },
  {
    name: 'NY State Assemblymember',
    divisionId: 'ocd-division/country:us/state:ny/sldl:57',
    levels: [ 'administrativeArea1' ],
    roles: [ 'legislatorLowerBody' ],
    officialIndices: [ 8 ]
  },
  {
    name: 'NY Attorney General',
    divisionId: 'ocd-division/country:us/state:ny',
    levels: [ 'administrativeArea1' ],
    officialIndices: [ 9 ]
  },
  {
    name: 'NY State Comptroller',
    divisionId: 'ocd-division/country:us/state:ny',
    levels: [ 'administrativeArea1' ],
    officialIndices: [ 10 ]
  },
  {
    name: 'Brooklyn District Attorney',
    divisionId: 'ocd-division/country:us/state:ny/county:kings',
    levels: [ 'administrativeArea2' ],
    officialIndices: [ 11 ]
  },
  {
    name: 'Brooklyn Borough President',
    divisionId: 'ocd-division/country:us/state:ny/county:kings',
    levels: [ 'administrativeArea2' ],
    officialIndices: [ 12 ]
  },
  {
    name: 'New York Mayor',
    divisionId: 'ocd-division/country:us/state:ny/place:new_york',
    levels: [ 'locality' ],
    officialIndices: [ 13 ]
  },
  {
    name: 'New York Public Advocate',
    divisionId: 'ocd-division/country:us/state:ny/place:new_york',
    levels: [ 'locality' ],
    officialIndices: [ 14 ]
  },
  {
    name: 'New York City Comptroller',
    divisionId: 'ocd-division/country:us/state:ny/place:new_york',
    levels: [ 'locality' ],
    officialIndices: [ 15 ]
  }
] people length [
  {
    name: 'Donald J. Trump',
    address: [ [Object] ],
    party: 'Republican Party',
    phones: [ '(202) 456-1111' ],
    urls: [ 'https://www.whitehouse.gov/' ],
    photoUrl: 'https://www.whitehouse.gov/sites/whitehouse.gov/files/images/45/PE%20Color.jpg',
    channels: [ [Object], [Object], [Object] ]
  },
  {
    name: 'Mike Pence',
    address: [ [Object] ],
    party: 'Republican Party',
    phones: [ '(202) 456-1111' ],
    urls: [ 'https://www.whitehouse.gov/' ],
    photoUrl: 'https://www.whitehouse.gov/sites/whitehouse.gov/files/images/45/VPE%20Color.jpg',
    channels: [ [Object], [Object] ]
  },
  {
    name: 'Kirsten E. Gillibrand',
    address: [ [Object] ],
    party: 'Democratic Party',
    phones: [ '(202) 224-4451' ],
    urls: [ 'https://www.gillibrand.senate.gov/' ],
    photoUrl: 'http://bioguide.congress.gov/bioguide/photo/G/G000555.jpg',
    channels: [ [Object], [Object], [Object] ]
  },
  {
    name: 'Charles E. Schumer',
    address: [ [Object] ],
    party: 'Democratic Party',
    phones: [ '(202) 224-6542' ],
    urls: [ 'https://www.schumer.senate.gov/' ],
    photoUrl: 'http://bioguide.congress.gov/bioguide/photo/S/S000148.jpg',
    channels: [ [Object], [Object], [Object], [Object] ]
  },
  {
    name: 'Yvette D. Clarke',
    address: [ [Object] ],
    party: 'Democratic Party',
    phones: [ '(202) 225-6231' ],
    urls: [ 'https://clarke.house.gov/' ],
    photoUrl: 'http://bioguide.congress.gov/bioguide/photo/C/C001067.jpg',
    channels: [ [Object], [Object], [Object] ]
  },
  {
    name: 'Andrew M. Cuomo',
    address: [ [Object] ],
    party: 'Democratic Party',
    phones: [ '(518) 474-8390' ],
    urls: [ 'https://andrewcuomo.com/' ],
    channels: [ [Object], [Object], [Object] ]
  },
  {
    name: 'Kathleen C. Hochul',
    address: [ [Object] ],
    party: 'Democratic Party',
    phones: [ '(518) 474-8390' ],
    urls: [ 'http://kathyhochul.com/' ],
    channels: [ [Object], [Object], [Object] ]
  },
  {
    name: 'Kevin S. Parker',
    address: [ [Object] ],
    party: 'Democratic Party, Working Families',
    phones: [ '(718) 629-6401' ],
    urls: [ 'http://www.nysenate.gov/senators-committees' ],
    photoUrl: 'http://www.nysenate.gov/files/profile-pictures/Parker2007Biography.jpg',
    emails: [ 'parker@nysenate.gov' ],
    channels: [ [Object], [Object] ]
  },
  {
    name: 'Walter Mosley',
    address: [ [Object] ],
    party: 'Democratic Party',
    phones: [ '(518) 455-5325' ],
    urls: [ 'https://nyassembly.gov/mem/Walter-T-Mosley' ],
    photoUrl: 'http://nyassembly.gov//mem/pic/057.jpg',
    emails: [ 'MosleyW@nyassembly.gov' ],
    channels: [ [Object], [Object] ]
  },
  {
    name: 'Letitia James',
    party: 'Democratic Party',
    phones: [ '(800) 771-7755' ],
    urls: [ 'https://ag.ny.gov/' ],
    channels: [ [Object], [Object] ]
  },
  {
    name: 'Thomas P. DiNapoli',
    address: [ [Object] ],
    party: 'Democratic Party',
    phones: [ '(518) 474-4044' ],
    emails: [ 'contactus@osc.state.ny.us' ],
    channels: [ [Object], [Object] ]
  },
  {
    name: 'Eric Gonzalez',
    address: [ [Object] ],
    party: 'Democratic Party',
    phones: [ '(718) 250-2340' ],
    urls: [ 'http://www.brooklynda.org/' ],
    channels: [ [Object], [Object] ]
  },
  {
    name: 'Eric L. Adams',
    address: [ [Object] ],
    party: 'Democratic Party',
    phones: [ '(718) 802-3700' ],
    emails: [ 'AskEric@brooklynbp.nyc.gov' ],
    channels: [ [Object], [Object] ]
  },
  {
    name: 'Bill de Blasio',
    address: [ [Object] ],
    party: 'Democratic Party',
    phones: [ '(212) 639-9675' ],
    urls: [ 'http://www1.nyc.gov/office-of-the-mayor/index.page' ],
    photoUrl: 'http://www1.nyc.gov/assets/home/images/mayor/index/deblasio.png',
    channels: [ [Object], [Object], [Object] ]
  },
  {
    name: 'Jumaane D. Williams',
    address: [ [Object] ],
    party: 'Democratic Party',
    phones: [ '(212) 669-7200' ],
    urls: [ 'https://pubadvocate.nyc.gov/' ],
    emails: [ 'reception@advocate.nyc.gov' ],
    channels: [ [Object], [Object] ]
  },
  {
    name: 'Scott M. Stringer',
    address: [ [Object] ],
    party: 'Democratic Party',
    phones: [ '(212) 669-3916' ],
    urls: [ 'https://comptroller.nyc.gov/' ],
    photoUrl: 'https://comptroller.nyc.gov/wp-content/uploads/2013/12/Headshot_ScottStringer_vertical-sm.jpg',
    emails: [ 'action@comptroller.nyc.gov' ],
    channels: [ [Object], [Object] ]
  }



*/
