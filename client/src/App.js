import React, { Component } from 'react';
import CravingSelector from './CravingSelector';
import HealthyAlternatives from './HealthyAlternatives';
//import logo from './logo.svg';
//import glass from '../public/magnifying-glass.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h2>What are you craving?</h2>
        </div>
        <div className="App-intro">
           <CravingSelector />
           <HealthyAlternatives />
        </div>
      </div>
    );
  }
}

export default App;
