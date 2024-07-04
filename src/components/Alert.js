
import React from 'react';
import PropTypes from 'prop-types';

const Alert = (props) => {
  return (
    <div style={{ height: '50px' }}>
      {props.alert && (
        <div className={`alert alert-${props.alert.type}`} role="alert">
          <strong>{props.alert.msg}</strong>
        </div>
      )}
    </div>
  );
};

Alert.propTypes = {
  alert: PropTypes.shape({
    msg: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

export default Alert;

