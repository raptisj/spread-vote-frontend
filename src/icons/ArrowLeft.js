import * as React from "react";
import PropTypes from "prop-types";

function SvgArrowLeft(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M5.583 12h12.834M10.167 7.417L5.583 12M10.167 16.583L5.583 12"
        stroke={props.currentColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

SvgArrowLeft.propTypes = { currentColor: PropTypes.string };
SvgArrowLeft.defaultProps = { stroke: "#212121" };
export default SvgArrowLeft;
