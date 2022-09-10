import React from "react";
import styled from "styled-components";

function Trailer({ currentMovie, setIsClicked }) {
  return (
    <Container>
      <HomeContainer>
        <Iframe
          src={`https://youtube.com/embed/${currentMovie.key}?
    controls=0&autoplay=1&loop=1&mute=1&playlist=${currentMovie.key}`}
          width="640"
          height="360"
          frameborder="0"
          allow="autoplay; fullscreen"
        ></Iframe>
        <ControllBar>
          <a style={{ cursor: "pointer" }} onClick={() => setIsClicked(false)}>
            X
          </a>
        </ControllBar>
      </HomeContainer>
    </Container>
  );
}

const ControllBar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 80px;
  text-align: right;
  background-color: black;
  color: white;
  font-size: 30px;
  font-weight: 800;
  padding: 25px;
  z-index: 999;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default Trailer;
