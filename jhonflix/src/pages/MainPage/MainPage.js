import React from "react";
import requests from "../../api/requests";
import Banner from "../../components/Banner";
import Row from "../../components/Row";

const MainPage = () => {
  return (
    <div>
      <Banner></Banner>
      <Row
        title="NETFLIX ORIGINALS"
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      ></Row>
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending}></Row>
      <Row title="Top Rated" id="TN" fetchUrl={requests.fetchTrending}></Row>
      <Row
        title="Action Movies"
        id="TN"
        fetchUrl={requests.fetchActionMovies}
      ></Row>
      <Row
        title="Comedy Movies"
        id="TN"
        fetchUrl={requests.fetchComedyMovies}
      ></Row>
    </div>
  );
};

export default MainPage;
