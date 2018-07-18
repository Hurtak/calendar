import propTypes from "prop-types";

export const views = {
  CLOCK: "CLOCK",
  // CALENDAR: "CALENDAR",
  // YEAR_PROGRESS: "YEAR_PROGRESS",
  AGE: "AGE",
  NOTHING: "NOTHING"
};

export const imageSources = {
  LOCAL: "LOCAL",
  BING: "BING"
};

export const timePropType = propTypes.number.isRequired;
