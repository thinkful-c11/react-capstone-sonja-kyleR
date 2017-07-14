import React, { Component }  from 'react';
import { connect } from "react-redux";
import {fetchUnhealthyStuff, selectCraving, fetchHealthyStuff, 
        addOtherCraving, resetDefaults} from '../actions';
import store from '../store.js';

import './CravingSelector.css';

export class CravingSelector extends Component{
    componentDidMount(){
        this.props.dispatch(fetchUnhealthyStuff());
        console.log(store.getState())
    }

     listUnhealthyStuff(){
        return this.props.unhealthyStuff.map((unhealthyItem) => {
               return( <option name={(unhealthyItem.name)}>
                    {unhealthyItem.name}
                </option>
            );
        });
    }

    onChange(e){
        if(e.target.value === "Other"){
            this.props.dispatch(addOtherCraving());
        }
        else if(e.target.value === "Select a craving"){
            this.props.dispatch(resetDefaults());
        }
        else{
            this.props.dispatch(selectCraving(e.target.value));
            this.props.dispatch(fetchHealthyStuff(e.target.value));
        }

    }

    render(){
        return(
                <form>
                    <select name="cravings" value={this.props.selectedUnhealthy} 
                            onChange={e => this.onChange(e)}>
                        <option name='choose'>Select a craving</option>
                        {this.listUnhealthyStuff()}
                        <option name='other'>Other</option>
                    </select>
                </form>

        );
    }
}

const mapStateToProps = (state, props) => ({
    unhealthyStuff: state.unhealthyStuff,
    selectedUnhealthy: state.selectedUnhealthy,
});

export default connect(mapStateToProps)(CravingSelector);