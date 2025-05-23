import React, { useState } from "react";
import NavForAnalysis from "../Components.jsx/NavForAnalysis";
import DonutChart from "./DonutChart";
import BarChart from "./BarChart";

function sortAndFormat(obj) {
  return Object.entries(obj)
    .sort(([, a], [, b]) => b - a)
    .map(([key, value]) => ({
      key,
      value: (value * 100).toFixed(2) + "%",
    }));
}

function sortAgeLabels(obj) {
  return Object.entries(obj)
    .sort(([aKey], [bKey]) => {
      const aStart = parseInt(aKey.split("-")[0]);
      const bStart = parseInt(bKey.split("-")[0]);
      return aStart - bStart;
    })
    .map(([key, value]) => ({
      key,
      value: (value * 100).toFixed(2) + "%",
    }));
}

function Demographics() {
  const [selectedCategory, setSelectedCategory] = useState("race");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [userSelections, setUserSelections] = useState({
    race: null,
    age: null,
    gender: null,
  });

  const [confirmedResults, setConfirmedResults] = useState({
    race: null,
    age: null,
    gender: null,
  });
  const storedData = JSON.parse(localStorage.getItem("demographic_result"));
  if (!storedData) return <p>No demographic data found.</p>;

  const { race, age, gender } = storedData.data;

  const formattedRace = sortAndFormat(race);
  const formattedAgeByConfidence = sortAndFormat(age);
  const formattedAgeByLabel = sortAgeLabels(age);
  const formattedGender = sortAndFormat(gender);

  const displayResults = {
    race: confirmedResults.race || formattedRace[0]?.key,
    age: confirmedResults.age || formattedAgeByConfidence[0]?.key,
    gender: confirmedResults.gender || formattedGender[0]?.key,
  };

  const categoryOrder = ["race", "age", "gender"];
  const currentIndex = categoryOrder.indexOf(selectedCategory);
  const goToPreviousCategory = () => {
    setSelectedCategory(
      categoryOrder[
        (currentIndex - 1 + categoryOrder.length) % categoryOrder.length
      ]
    );
    setHasInteracted(true);
  };
  const goToNextCategory = () => {
    setSelectedCategory(
      categoryOrder[(currentIndex + 1) % categoryOrder.length]
    );
    setHasInteracted(true);
  };

  return (
    <>
      <NavForAnalysis />

      <div
        className={`demographics_navButton-wrapper ${
          hasInteracted ? "fade-in" : "hidden"
        }`}
      >
        <div
          className="diamond-button hover-target"
          onClick={goToPreviousCategory}
        >
          <div className="inner-diamond" />
          <div className="mini-triangle-left" />
        </div>
        <div className="diamond-button hover" onClick={goToNextCategory}>
          <div className="inner-diamond" />
          <div className="mini-triangle-right" />
        </div>
      </div>

      <h3 className="demographics__headline-font">DEMOGRAPHICS</h3>
      <p className="demographics__headline-subFont">PREDICTED RACE & AGE</p>

      <div className="demographics__wrapper-columns">
        {/* Left Column */}
        <div className="demographics__results-columnLeft">
          {["race", "age", "gender"].map((category) => (
            <div
              key={category}
              className={`demographic_columnLeft-result ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setHasInteracted(true);
              }}
            >
              <h4>{category.toUpperCase()}</h4>
              <p className="demographic_textTransform-uppercase">
                {displayResults[category]}
              </p>
            </div>
          ))}
        </div>

        {/* Middle Column */}
        <div className="demographics__results-columnMiddle">
          <div className="demographics__middle-content">
            <div className="demographics__category-label">
              {selectedCategory === "race" &&
                (confirmedResults.race || formattedRace[0]?.key)?.toUpperCase()}
              {selectedCategory === "age" &&
                `${(
                  confirmedResults.age || formattedAgeByConfidence[0]?.key
                )?.toUpperCase()} y.o`}
              {selectedCategory === "gender" &&
                (
                  confirmedResults.gender || formattedGender[0]?.key
                )?.toUpperCase()}
            </div>
            <div className="demographics__donut-wrapper">
              {selectedCategory === "race" && formattedRace.length > 0 && (
                <DonutChart
                  percentage={parseFloat(
                    formattedRace.find(
                      (item) =>
                        item.key ===
                        (confirmedResults.race || formattedRace[0]?.key)
                    )?.value || 0
                  )}
                />
              )}

              {selectedCategory === "age" &&
                formattedAgeByConfidence.length > 0 && (
                  <DonutChart
                    percentage={parseFloat(
                      formattedAgeByConfidence.find(
                        (item) =>
                          item.key ===
                          (confirmedResults.age ||
                            formattedAgeByConfidence[0]?.key)
                      )?.value || 0
                    )}
                  />
                )}

              {selectedCategory === "gender" && formattedGender.length > 0 && (
                <DonutChart
                  percentage={parseFloat(
                    formattedGender.find(
                      (item) =>
                        item.key ===
                        (confirmedResults.gender || formattedGender[0]?.key)
                    )?.value || 0
                  )}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="demographics__results-columnRight">
          <div className="header_rightcolumn-fontWrapper">
            <p>{selectedCategory.toUpperCase()}</p>
            <p>A.I Confidence</p>
          </div>
          <BarChart
            data={
              selectedCategory === "race"
                ? formattedRace
                : selectedCategory === "age"
                ? formattedAgeByLabel
                : formattedGender
            }
            selectedKey={userSelections[selectedCategory]}
            onBarClick={(key) =>
              setUserSelections({ ...userSelections, [selectedCategory]: key })
            }
          />
        </div>
      </div>

      {/* Bottom Buttons */}
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
            onClick={() => {
              setUserSelections({ race: null, age: null, gender: null });
              setConfirmedResults({ race: null, age: null, gender: null });
            }}
          >
            RESET
          </button>
          <button
            className="demographics__button-confirm"
            onClick={() => {
              const selected = userSelections[selectedCategory];
              if (selected) {
                setConfirmedResults({
                  ...confirmedResults,
                  [selectedCategory]: selected,
                });
              }
            }}
          >
            CONFIRM
          </button>
        </div>
      </div>
    </>
  );
}

export default Demographics;
