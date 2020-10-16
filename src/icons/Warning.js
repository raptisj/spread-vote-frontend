import * as React from "react";
import PropTypes from "prop-types";

function SvgWarning(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        clipRule="evenodd"
        d="M12 3.75v0A8.25 8.25 0 0120.25 12v0A8.25 8.25 0 0112 20.25v0A8.25 8.25 0 013.75 12v0A8.25 8.25 0 0112 3.75z"
        stroke={props.currentColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12.458V7.875M12 15.667a.23.23 0 10.002.458.23.23 0 00-.003-.458"
        stroke={props.currentColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

SvgWarning.propTypes = { currentColor: PropTypes.string };
SvgWarning.defaultProps = { stroke: "#212121" };
export default SvgWarning;
