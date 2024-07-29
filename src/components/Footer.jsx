import React from 'react';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-text">
        <p>&copy; {new Date().getFullYear()} NoteFlex.All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
