import React, { useState } from "react";
import NavForAnalysis from "../Components.jsx/NavForAnalysis";
import DonutChart from "./DonutChart";

function sortAndFormat(obj) {
  return Object.entries(obj)
    .sort(([, a], [, b]) => b - a)
    .map(([key, value]) => ({
      key,
      value: (value * 100).toFixed(2) + "%",
    }));
}

function Demographics() {
  const [selectedCategory, setSelectedCategory] = useState("race");
  const storedData = JSON.parse(localStorage.getItem("demographic_result"));
  if (!storedData) return <p>No demographic data found.</p>;
  
  const { race, age, gender } = storedData.data;
  
  const formattedRace = sortAndFormat(race);
  const formattedAge = sortAndFormat(age);
  const formattedGender = sortAndFormat(gender);
  


  return (
    <>
      <NavForAnalysis />

      <h3 className="demographics__headline-font">DEMOGRAPHICS</h3>
      <p className="demographics__headline-subFont">PREDICTED RACE & AGE</p>

      <div className="demographics__wrapper-columns">
        <div className="demographics__results-columnLeft">
          <div
            className={`demographic_columnLeft-result ${
              selectedCategory === "race" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("race")}
          >
            <h4>RACE</h4>
            <p className="demographic_textTransform-uppercase">
              {formattedRace.length > 0 && formattedRace[0].key}
            </p>
          </div>
          <div
            className={`demographic_columnLeft-result ${
              selectedCategory === "age" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("age")}
          >
            <h4>AGE</h4>
            <p className="demographic_textTransform-uppercase">
              {formattedAge.length > 0 && formattedAge[0].key}
            </p>
          </div>
          <div
            className={`demographic_columnLeft-result ${
              selectedCategory === "gender" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("gender")}
          >
            <h4>GENDER</h4>
            <p className="demographic_textTransform-uppercase">
              {formattedGender.length > 0 && formattedGender[0].key}
            </p>
          </div>
        </div>

        <div className="demographics__results-columnMiddle">
          <div className="demographics__middle-content">
            <div className="demographics__category-label">
              {selectedCategory === "race" &&
                formattedRace[0]?.key.toUpperCase()}
              {selectedCategory === "age" &&
                `${formattedAge[0]?.key.toUpperCase()} y.o`}
              {selectedCategory === "gender" &&
                formattedGender[0]?.key.toUpperCase()}
            </div>
            <div className="demographics__donut-wrapper">
              {selectedCategory === "race" && formattedRace.length > 0 && (
                <DonutChart percentage={parseFloat(formattedRace[0].value)} />
              )}
              {selectedCategory === "age" && formattedAge.length > 0 && (
                <DonutChart percentage={parseFloat(formattedAge[0].value)} />
              )}
              {selectedCategory === "gender" && formattedGender.length > 0 && (
                <DonutChart percentage={parseFloat(formattedGender[0].value)} />
              )}
            </div>
          </div>
        </div>

        <div className="demographics__results-columnRight">
        <div
            className={`demographic_columnLeft-result ${
              selectedCategory === "race" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("race")}
          >
            <h4>RACE</h4>
            <p className="demographic_textTransform-uppercase">
              {formattedRace.length > 0 && formattedRace[0].key}
            </p>
          </div>
        <div
            className={`demographic_columnLeft-result ${
              selectedCategory === "age" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("age")}
          >
            <h4>AGE</h4>
            <p className="demographic_textTransform-uppercase">
              {formattedAge.length > 0 && formattedAge[0].key}
            </p>
          </div>
          <div
            className={`demographic_columnLeft-result ${
              selectedCategory === "gender" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("gender")}
          >
            <h4>GENDER</h4>
            <p className="demographic_textTransform-uppercase">
              {formattedGender.length > 0 && formattedGender[0].key}
            </p>
          </div>
          </div>
          
      </div>

      <h2>Race</h2>
      <ul>
        {formattedRace.map(({ key, value }) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>

      <h2>Age</h2>
      <ul>
        {formattedAge.map(({ key, value }) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>

      <h2>Gender</h2>
      <ul>
        {formattedGender.map(({ key, value }) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>

      <div className="demographics__buttons-bottomWrapper">
        <div
          className="button-wrapper-left"
          onClick={() => window.history.back()}
        >
          <div className="diamond-button hover-target">
            <div className="inner-diamond" />
            <div className="mini-triangle-left" />
          </div>
          <p className="button__copy">BACK</p>
        </div>
        <p className="demographics__aiEstimate-font">
          If A.I estimate is wrong, select the correct one.
        </p>
        <div>
          <button
            className="demographics__button-reset"
            onClick={() => alert("You can soon fix results here.")}
          >
            RESET
          </button>
          <button
            className="demographics__button-confirm"
            onClick={() => alert("You can soon fix results here.")}
          >
            CONFIRM
          </button>
        </div>
      </div>
    </>
  );
}

export default Demographics;
