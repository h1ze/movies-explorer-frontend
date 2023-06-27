import React from 'react';
import './ReqError.css';

const ReqError = ({ isError, children }) => {
  return (
    <p className={`request-error ${isError ? 'request-error_active' : ''}`}>
      {children}
    </p>
  );
};

export default ReqError;
