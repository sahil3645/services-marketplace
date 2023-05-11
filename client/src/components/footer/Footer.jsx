import React from 'react'
import "./Footer.scss"

const Footer = () => {
  return (
    <div className='footer'>
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            <div className="cat-spans">
              <span>Graphic & Design</span>
              <span>Photography</span>
              <span>Programming & Tech</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>ServicesMart</h2>
            <span>&copy; Sahil</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/img/twitter.png" alt="twitter-img" />
              <img src="/img/instagram.png" alt="instagram-img" />
              <img src="/img/facebook.png" alt="facebook-img" />
              <img src="/img/linkedin.png" alt="linkedin-img" />
            </div>
            <div className="link">
              <img src="/img/language.png" alt="language-img" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="/img/currency.png" alt="language-img" />
              <span>INR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer