import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../App.css';

const SpinningSquares = ({ size = 80, color = '#ccc', count = 3 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const squares = containerRef.current.querySelectorAll('.square');

    squares.forEach((square, index) => {
      gsap.to(square, {
        rotation: '+=360',
        duration: 5 + index * 1.5,
        repeat: -1,
        ease: 'linear',
        transformOrigin: 'center center',
      });
    });
  }, []);

  return (
    <div className="spinning-square-container" ref={containerRef}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
        key={idx}
        className="square"
        style={{
          width: `${size + idx * 20}px`,
          height: `${size + idx * 20}px`,
          border: `1.25px dotted ${color}`,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(45deg)', 
          }}
        />
      ))}
    </div>
  );
};

export default SpinningSquares;

