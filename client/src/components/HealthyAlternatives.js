import React, { Component }  from 'react'; 
import { connect } from "react-redux";
//import {fetchHealthyStuff} from '../actions';
//import {store} from '../store.js';

import './HealthyAlternatives.css';

export class HealthyAlternatives extends Component {
    // componentDidMount(){
    //     this.props.dispatch(fetchHealthyStuff(this.props.selectedUnhealthy));
    //     //console.log(this.props.healthyStuff);
    // }

    listHealthyStuff(){
        //console.log(this.props.healthyStuff);
        return this.props.healthyStuff.map((healthyItem) =>{
            return(
                <div className='item'>
                    {healthyItem.name}
                </div>
            );
        });
    }

    render() {
        return(
            <div className='alternatives'>
                {this.listHealthyStuff()}
                <div className='item'>
                    <input type="text" placeholder="Add a craving buster"></input>
                    <button>+</button>
                </div>
            </div>   
        );
    }
}

const mapStateToProps = (state, props) => ({
    healthyStuff: state.healthyStuff,
    selectedUnhealthy: state.selectedUnhealthy
});

export default connect(mapStateToProps)(HealthyAlternatives);