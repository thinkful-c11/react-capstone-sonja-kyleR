import React, { Component } from 'react';
import CravingSelector from './CravingSelector';
import HealthyAlternatives from './HealthyAlternatives';
import AddOptionForm from './AddOptionForm';
// import logo from '../logo.svg';
import {connect} from 'react-redux';
import './App.css';

class App extends Component {

  render() {

    let healthyOptions;
    let addCraving;
    if (this.props.showHealthyStuff) {
        healthyOptions = <HealthyAlternatives />;
    }

    if(this.props.showAddOption){
      addCraving = <AddOptionForm />;
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src="http://image.flaticon.com/icons/png/512/31/31034.png" 
            className="App-logo" alt="logo" />
          <img src="https://cdn4.iconfinder.com/data/icons/mathematical-symbols/50/Greater_Than-256.png"
            className="App-logo" alt="logo" />
          <img src="http://icons.iconarchive.com/icons/icons8/windows-8/512/Food-Hamburger-icon.png" 
            className="App-logo" alt="logo" />
          <h2>What are you craving?</h2>
        </div>
        <div className="App-intro">
           <CravingSelector />
           {healthyOptions}
           {addCraving}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    showHealthyStuff: state.showHealthyStuff,
    showAddOption: state.showAddOption,
});


export default connect(mapStateToProps)(App);
