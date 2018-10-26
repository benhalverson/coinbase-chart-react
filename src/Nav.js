import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

const Home = () => (
  <div className="main-content">
    <HomePage />
  </div>
);

const About = () => (
  <div className="main-content">
    <AboutPage />
  </div>
);

class Nav extends Component {  
  render() {
    return( 
        <Router>
          <div>
            <div className="nav-container">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
            </div>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
          </div>
        </Router>
    );
  }
}

export default Nav;