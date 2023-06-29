import React from 'react';
import './ReqError.css';

const ReqError = ({ isErrorResponse }) => {
  return (
    <p
      className={`request-error ${
        isErrorResponse ? 'request-error_active' : ''
      }`}
    >
      {isErrorResponse}
    </p>
  );
};

export default ReqError;
