import React, { Component, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useQuery } from "react-query";
const axios = require("axios");
import Home from "./Home.jsx";
import Display from "./Display.jsx";
import Card from "./Card.jsx";

const API_KEY = "AIzaSyCLtsQE_ZZgnVpGOaCGFTH26EJ0QH2fPIM";

const Container = () => {
  const [officials, setOfficials] = useState([]);

  // Call to Google Civics API
  const fetchOfficials = async () => {
    const result = await axios
      .get(`https://www.googleapis.com/civicinfo/v2/representatives?key=${API_KEY}&address=75078`)
      .then((res) => res.data.officials);
    setOfficials(result);
    return result;
  };

  const { isLoading, error, data } = useQuery("officials", fetchOfficials);

  return isLoading ? (
    "...Loading"
  ) : error ? (
    error.message
  ) : (
    <div className='container'>
      {data.map((official) => {
        return <Card key={official.name} official={official} />;
      })}
    </div>
  );

  // return status === "loading" ? (
  //   <span>Loading...</span>
  // ) : status === "error" ? (
  //   <span>Error: {error.message}</span>
  // ) : (
  //   <>
  //     {isFetching ? <div>Refreshing...</div> : null}

  //     <div>
  //       <h1>Finished</h1>
  //       {/* {officials.map((official) => (
  //         <li key={}>{official}</li>
  //       ))} */}
  //     </div>
  //   </>
  // );
};

export default Container;
