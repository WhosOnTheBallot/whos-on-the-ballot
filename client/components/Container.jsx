import React, { Component, useState } from "react";
import { render } from "react-dom";
import Home from "./Home.jsx";
import Display from "./Display.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useQuery } from "react-query";
const axios = require("axios");

const API_KEY = "AIzaSyCLtsQE_ZZgnVpGOaCGFTH26EJ0QH2fPIM";

const Container = () => {
  const [officials, setOfficials] = useState([]);

  const fetchOfficials = () => {
    return axios
      .get(`https://www.googleapis.com/civicinfo/v2/representatives?key=${API_KEY}&address=75078`)
      .then((res) => res.data.officials);
  };

  const { isLoading, error, data } = useQuery("officials", fetchOfficials);

  console.log(data);

  return isLoading ? (
    "...Loading"
  ) : error ? (
    error.message
  ) : (
    <div>
      <ul>
        {data.map((official) => {
          return <li key={official.name}>{official.name}</li>;
        })}
      </ul>
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
