import React, { Component }  from 'react'; 
import { connect } from "react-redux";
import {fetchHealthyStuff} from '../actions';
import {store} from '../store.js';

import './HealthyAlternatives.css';

export class HealthyAlternatives extends Component {
    componentDidMount(){
        this.props.dispatch(fetchHealthyStuff());
        console.log(store.getState())
    }

    listHealthyStuff(){
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
            </div>   
        );
    }
}

const mapStateToProps = (state, props) => ({
    healthyStuff: state.healthyStuff
});

export default connect(mapStateToProps)(HealthyAlternatives);