import * as React from "react";
import PropTypes from "prop-types";

function SvgEyeClosed(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 48 48" fill="none" {...props}>
      <path
        d="M35.62 26.78A17.86 17.86 0 0042 15.24a2.014 2.014 0 00-4-.48 14.14 14.14 0 01-28 0 2.014 2.014 0 10-4 .48 17.86 17.86 0 006.36 11.54l-4.6 4.64a2 2 0 002.82 2.82l5.22-5.2a18.12 18.12 0 006.2 1.84V38a2 2 0 004 0v-7.12a18.12 18.12 0 006.2-1.84l5.22 5.2a2 2 0 002.82-2.82l-4.62-4.64z"
        fill={props.currentColor}
      />
    </svg>
  );
}

SvgEyeClosed.propTypes = { currentColor: PropTypes.string };
SvgEyeClosed.defaultProps = { fill: "#000" };
export default SvgEyeClosed;
