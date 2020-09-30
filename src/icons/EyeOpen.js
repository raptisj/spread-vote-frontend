import * as React from "react";
import PropTypes from 'prop-types';

function SvgEyeOpen(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 48 48" fill="none" {...props}>
      <path
        d="M43.74 23c-1.28-2.22-8.32-13.36-20.28-13C12.4 10.28 6 20 4.26 23a2 2 0 000 2c1.26 2.18 8 13 19.78 13h.5c11.06-.28 17.48-10 19.2-13a2 2 0 000-2zm-19.3 11c-8.62.2-14.24-7.18-16-10 2-3.22 7.22-9.8 15.22-10 8.58-.22 14.22 7.18 16 10-2.06 3.22-7.22 9.8-15.22 10z"
        fill={props.currentColor}
      />
      <path
        d="M24 17a7 7 0 100 14 7 7 0 000-14zm0 10a3 3 0 110-5.999A3 3 0 0124 27z"
        fill={props.currentColor}
      />
    </svg>
  );
}

SvgEyeOpen.propTypes = { currentColor: PropTypes.string };SvgEyeOpen.defaultProps = { fill: '#000' };export default SvgEyeOpen;
