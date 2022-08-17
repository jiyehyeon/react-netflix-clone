import React from "react";
import requests from "./api/requests";
import "./App.css";
import Banner from "./components/Banner";
import Nav from "./components/Nav";
import Row from "./components/Row";

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />
      <Row
        title="TOP 10 영화"
        id="TR"
        fetchUrl={requests.fetchTopRated}
        isLargeRow
      />
      <Row title="요즘 뜨는 콘텐츠" id="TN" fetchUrl={requests.fetchTrending} />
      <Row
        title="오직 넷플릭스에서"
        id="NO"
        fetchUrl={requests.fetchNetFlixOriginals}
      />
      <Row title="액션 영화" id="AM" fetchUrl={requests.fetchActionMovies} />
      <Row
        title="로맨틱한 영화"
        id="RM"
        fetchUrl={requests.fetchRomanceMovies}
      />
      <Row title="코믹 영화" id="CM" fetchUrl={requests.fetchComedyMovies} />
      <Row
        title="다큐멘터리 영화"
        id="DM"
        fetchUrl={requests.fetchDocumentaires}
      />
    </div>
  );
}

export default App;
