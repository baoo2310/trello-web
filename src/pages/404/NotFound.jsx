/* eslint-disable no-undef */
import React from 'react'
import ScarecrowImage from '../../assets/Scarecrow.png';
import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="display">
      <h1 className="nav">404 Not found</h1>
      <div className="display__img">
        <img src={ScarecrowImage} alt="404-Scarecrow" />
      </div>
      <div className="display__content">
        <h2 className="display__content--info">I have bad news for you</h2>
        <p className="display__content--text">
        The page you are looking for might be removed or is temporarily
        unavailable
        </p>
        <Link to="/" style={{ textDecoration: 'none' }}>
            <button className="btn">Back to homepage</button>
        </Link> 
      </div>
    </div>
  );
}

export default NotFound