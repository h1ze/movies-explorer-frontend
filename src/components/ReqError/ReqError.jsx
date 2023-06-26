import React from 'react';
import './ReqError.css';

const ReqError = ({ children }) => {
  return <p className="request-error">{children}</p>;
};

export default ReqError;
