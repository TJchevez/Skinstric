import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../App.css";

const SpinningSquares = ({ count = 3 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const squares = containerRef.current.querySelectorAll(".square");

    squares.forEach((square, index) => {
      gsap.to(square, {
        rotation: "+=360",
        duration: 5 + index * 1.5,
        repeat: -1,
        ease: "linear",
        transformOrigin: "center center",
      });
    });
  }, []);

  const squareConfigs = [
    { size: 340, color: "#2a2a2a", borderWidth: "2px" },
    { size: 360, color: "#6c6c6c", borderWidth: "2px" },
    { size: 400, color: "#cccccc", borderWidth: "2px" },
  ];

  return (
    <div className="spinning-square-container" ref={containerRef}>
      {squareConfigs.slice(0, count).map((config, idx) => (
        <div
          key={idx}
          className="square"
          style={{
            width: `${config.size}px`,
            height: `${config.size}px`,
            border: `${config.borderWidth} dotted ${config.color}`,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(45deg)",
          }}
        />
      ))}
    </div>
  );
};

export default SpinningSquares;
