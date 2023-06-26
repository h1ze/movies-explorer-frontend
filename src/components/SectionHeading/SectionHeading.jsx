import React from 'react';
import('./SectionHeading.css');

const SectionHeading = ({ children }) => {
  return <h2 className="section-heading">{children}</h2>;
};

export default SectionHeading;
