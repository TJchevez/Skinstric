import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components.jsx/Nav";
import takeTestButton from "../assets/takeTestButton.png";
import discoverButton from "../assets/discoverButton.png";
import gsap from "gsap";
import DiamondTrio from "../Components.jsx/DiamondTrio";

function Home() {
  const headerRef = useRef(null);
  const discoverBtnRef = useRef(null);
  const takeTestBtnRef = useRef(null);
  const diamondLeftRef = useRef(null);
  const diamondRightRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const discoverBtn = discoverBtnRef.current;
    const takeTestBtn = takeTestBtnRef.current;
    const diamondLeft = diamondLeftRef.current;
    const diamondRight = diamondRightRef.current;

    const moveLeft = () => {
      gsap.to(header, { x: -300, duration: 1.5, ease: "power2.out" });
      header.classList.remove("align-center", "align-right");
      header.classList.add("align-left");

      gsap.to([diamondLeft, discoverBtn], { opacity: 0, duration: 0.3 });
    };

    const moveRight = () => {
      gsap.to(header, { x: 300, duration: 1.5, ease: "power2.out" });
      header.classList.remove("align-center", "align-left");
      header.classList.add("align-right");

      gsap.to([diamondRight, takeTestBtn], { opacity: 0, duration: 0.3 });
    };

    const reset = () => {
      gsap.to(header, { x: 0, duration: 1.5, ease: "power2.out" });
      header.classList.remove("align-left", "align-right");
      header.classList.add("align-center");

      gsap.to([diamondLeft, discoverBtn, diamondRight, takeTestBtn], {
        opacity: 1,
        duration: 0.3,
      });
    };

    discoverBtn.addEventListener("mouseenter", moveRight);
    discoverBtn.addEventListener("mouseleave", reset);

    takeTestBtn.addEventListener("mouseenter", moveLeft);
    takeTestBtn.addEventListener("mouseleave", reset);

    return () => {
      discoverBtn.removeEventListener("mouseenter", moveRight);
      discoverBtn.removeEventListener("mouseleave", reset);
      takeTestBtn.removeEventListener("mouseenter", moveLeft);
      takeTestBtn.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <>
      <Nav />
      <div className="dimension-wrap">
        <div className="header-line-wrapper">
          <div className="diamond-left" ref={diamondLeftRef}></div>
          <img
            src={discoverButton}
            alt="Discover"
            className="discover__button-left"
            ref={discoverBtnRef}
          />

          <div className="sophisticatedSkincare__header-home" ref={headerRef}>
            <span className="sophisticatedSkincare__header-font1">
              Sophisticated
            </span>
            <span className="sophisticatedSkincare__header-font2">
              Skincare
            </span>
          </div>

          <div className="diamond-right" ref={diamondRightRef}></div>

          <Link to="/Introduction">
            <img
              src={takeTestButton}
              alt="Take Test"
              className="takeTest__button-right"
              ref={takeTestBtnRef}
            />
          </Link>
        </div>
        <p className="skinstric__home-paragraph">
          Skinstric developed an A.I. that creates a
          <br />
          highly-personalized routine tailored to
          <br />
          what your skin needs.
        </p>
      </div>

      {/* Below is code for dimension */}
      <div className="home_dimension--section hover-target">
      <div className="sophisticatedSkincare__header-home">
        <span className="sophisticatedSkincare__header-font1">
          Sophisticated
        </span>
        <DiamondTrio/>
        <span className="sophisticatedSkincare__header-font2">Skincare</span>
        <p className="skinstric__home-paragraph">
          Skinstric developed an A.I. that creates a
          <br />
          highly-personalized routine tailored to
          <br />
          what your skin needs.
        </p>
        <Link to="/Introduction">
          <img
            src={takeTestButton}
            alt="Take Test"
            className="takeTest__button-right"
            />
        </Link>
      </div>
      </div>
    </>
  );
}

export default Home;
