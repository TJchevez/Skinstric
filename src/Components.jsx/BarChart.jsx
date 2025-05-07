import React from "react";

const BarChart = ({ data, selectedKey, onBarClick }) => {
  const maxValue = Math.max(...data.map((d) => parseFloat(d.value)));

  return (
    <div className="bar-chart">
      {data.map((d) => {
        const widthPercent = (parseFloat(d.value) / maxValue) * 100;
        const isSelected = d.key === selectedKey;

        return (
          <div
            key={d.key}
            className={`bar-chart__row ${isSelected ? "bar-chart__row--selected" : ""}`}
            onClick={() => onBarClick(d.key)}
          >
            <div className="bar-chart__label-container">
              <div className="diamond-button bar-chart__diamond">
                <div className="inner-diamond" />
              </div>
              <span className="bar-chart__label">{d.key}</span>
              <span className="bar-chart__value">{d.value}</span>
            </div>
            <div className="bar-chart__bar-container">
              <div
                className="bar-chart__bar"
                style={{
                    width: `${widthPercent}%`,
                    backgroundColor: isSelected ? "#000" : "#ccc",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BarChart;
