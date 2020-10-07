import React, { useState } from 'react';
import { useQuery } from 'react-query';
const axios = require('axios');
import Card from './Card.jsx';

const API_KEY = 'AIzaSyCLtsQE_ZZgnVpGOaCGFTH26EJ0QH2fPIM';

const Container = () => {
  const [officials, setOfficials] = useState([]);

  // Call to Google Civics API
  const fetchOfficials = async () => {
    const result = await axios
      .get(
        `https://www.googleapis.com/civicinfo/v2/representatives?key=${API_KEY}&address=75078`
      )
      .then(res => res.data.officials);
    setOfficials(result);
    return result;
  };

  const { isLoading, error, data } = useQuery('officials', fetchOfficials, {
    refetchOnWindowFocus: false,
  });

  return isLoading ? (
    '...Loading'
  ) : error ? (
    error.message
  ) : (
    <div className='container'>
      {data.map(official => {
        return <Card key={official.name} official={official} />;
      })}
    </div>
  );
};

export default Container;
