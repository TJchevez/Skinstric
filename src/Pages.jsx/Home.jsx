import React from "react";
import { Link } from "react-router-dom";
import Nav from "../Components.jsx/Nav";
import takeTestButton from "../assets/takeTestButton.png";
import discoverButton from "../assets/discoverButton.png";

function Home() {
  return (
    <>
      <Nav />

      <div className="header-line-wrapper">
        <div className="diamond-left"></div>
        <img src={discoverButton} alt="" className="discover__button-left" />

        <div className="sophisticatedSkincare__header-home">
          <span className="sophisticatedSkincare__header-font1">
            Sophisticated
          </span>
          <span className="sophisticatedSkincare__header-font2">
            Skincare
          </span>
        </div>

        <div className="diamond-right"></div>
        <img src={takeTestButton} alt="" className="takeTest__button-right" />
      </div>

      <p className="skinstric__home-paragraph">
        Skinstric developed an A.I. that creates a
        <br />
        highly-personalized routine tailored to
        <br />
        what your skin needs.
      </p>
    </>
  );
}

export default Home;
