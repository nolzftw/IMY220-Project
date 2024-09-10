// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PlaylistPage from './pages/PlaylistPage';
import Header from './components/Header';

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={SplashPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/playlist" component={PlaylistPage} />
    </Switch>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
    <App />
);

