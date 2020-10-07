import React, { useState } from 'react';
import { useQuery } from 'react-query';
const axios = require('axios');
import Card from './Card.jsx';
import VoterCard from './VoterCard.jsx';

const API_KEY = 'AIzaSyCLtsQE_ZZgnVpGOaCGFTH26EJ0QH2fPIM';

const Container = () => {
  const [officials, setOfficials] = useState([]);
  const [selected, setSelected] = useState([]);
  function selectOfficial(name) {
    setSelected([...selected, name]);
  }
  // Call to Google Civics API
  async function fetchOfficials() {
    const result = await axios
      .get(
        `https://www.googleapis.com/civicinfo/v2/representatives?key=${API_KEY}&address=75078`
      )
      .then(res => res.data.officials);
    setOfficials(result);
    return result;
  }

  // Call to Twilio API
  async function sendSMS(phoneNumber) {
    console.log('sending sms to', phoneNumber);
    const result = await axios
      .get(`/send-sms?tel=${phoneNumber}`)
      .then(res => res.data);
    console.log(result);
    return result;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const phoneNumber = e.target.phoneNumber.value;
    sendSMS(phoneNumber);
  }

  const { isLoading, error, data } = useQuery('officials', fetchOfficials, {
    refetchOnWindowFocus: false,
  });

  return isLoading ? (
    '...Loading'
  ) : error ? (
    error.message
  ) : (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='phoneNumber'>Phone Number</label>
          <br />
          <input id='phoneNumber' type='tel' />
        </div>
        <button type='submit'>Send SMS</button>
      </form>
      <div>
        <VoterCard selected={selected} />
      </div>
      <div className='container'>
        {data.map(official => {
          return (
            <Card
              key={official.name}
              official={official}
              selectOfficial={selectOfficial}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Container;
