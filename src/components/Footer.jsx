import React from 'react';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-text">
        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
