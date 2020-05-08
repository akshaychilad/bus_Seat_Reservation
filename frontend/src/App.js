import React from 'react';
import { BrowserRouter as Router, NavLink, Route,Redirect,Switch } from "react-router-dom";

import './App.css';
import Login from './Login/Login'
import Home from './home'
import Navbar from './Route/Navbar'
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;
