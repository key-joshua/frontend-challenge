import Helmet from 'react-helmet';
import React, { Component } from 'react';

class Landing extends Component {
  handleBook(key) {
    key.preventDefault();
    const redirectUrl = '/book';
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 1000);
  }

  render() {
    return (
      <div className="landing-page">

        <Helmet>
          <style>{'body { background-color: #ffff;}'}</style>
        </Helmet>

        <div className="container">

          <div className="content-container">

            <h1>Frontend Challenge</h1>

            <p>
              <span>Endpoint /posts, Method GET.</span>
            </p>

            <button type="submit" onClick={(key) => { this.handleBook(key); }}>Check Books Now</button>

          </div>

        </div>

      </div>

    );
  }
}

export default Landing;
