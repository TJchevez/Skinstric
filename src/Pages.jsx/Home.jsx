import React from "react";
import { Link } from "react-router-dom";
import Nav from "../Components.jsx/Nav";

function Home() {
  return (
    <>
        <Nav />
        <div className="sophisticatedSkincare__header-home">
          <span className="sophisticatedSkincare__header-font1">Sophisticated </span> 
          <span className="sophisticatedSkincare__header-font2">Skincare</span>
        </div>
        <ul>
          <li>
          <Link to="/Form">Take Test</Link>
          </li>
        </ul>
    </>
  );
}

export default Home;
