import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CircleIcon({ icon, size = "1x", color = "#000", background = "#fff" }) {
  return (
    <div className="circle-icon" style={{ background }}>
      <FontAwesomeIcon icon={icon} size={size} color={color} />
    </div>
  );
}

export default CircleIcon;
