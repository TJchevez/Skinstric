import React from "react";

function DonutChart({ label, percentage }) {
  const dash = `${percentage} ${100 - percentage}`;

  return (
    <div className="donut-chart">
      <svg viewBox="0 0 36 36" className="donut">
        <g transform="rotate(-90 18 18)">
          <circle className="donut-bg" cx="18" cy="18" r="16" />
          <circle
            className="donut-segment"
            cx="18"
            cy="18"
            r="16"
            strokeDasharray={dash}
            strokeDashoffset="0"
          />
        </g>
        <text x="50%" y="50%" className="donut-percent">
          {percentage}%
        </text>
      </svg>
      <div className="donut-label">{label}</div>
    </div>
  );
}

export default DonutChart;
