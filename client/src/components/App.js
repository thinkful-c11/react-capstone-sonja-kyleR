import React, { Component } from 'react';
import CravingSelector from './CravingSelector';
import HealthyAlternatives from './HealthyAlternatives';
import Header from './Header';
import AddOptionForm from './AddOptionForm';
import {resetDefaults} from '../actions';
// import logo from '../logo.svg';
import {connect} from 'react-redux';
import './App.css';

class App extends Component {

  resetApp(event){
    event.preventDefault();
    this.props.dispatch(resetDefaults());
  }

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
        <Header />
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
