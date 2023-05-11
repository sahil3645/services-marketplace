import React from 'react';
import './NotFound.scss';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404. Not Found</h1>
      {/* <p>Oops! The page you are looking for is not here.</p> */}
      <p>The One with the Missing Page.</p>
      <Link to={`/`} className="link">
        {/* <button>Take me home!</button> */}
        <button>Take me home!</button>
      </Link>
    </div>
  );
}

export default NotFound;

