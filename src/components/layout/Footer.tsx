import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h3>Digital <span>Heroes</span></h3>
          <p>The premium golf charity subscription platform.</p>
        </div>
        <div className={styles.links}>
          <h4>Platform</h4>
          <ul>
            <li>How it Works</li>
            <li>Charity Partners</li>
            <li>Prize Draws</li>
          </ul>
        </div>
        <div className={styles.legal}>
          <h4>Legal</h4>
          <ul>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; 2024 Digital Heroes. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
