import React, { Component }  from 'react'; //
import { connect } from "react-redux";
import {fetchUnhealthyStuff, selectCraving, fetchHealthyStuff, addOtherCraving} from '../actions';
import store from '../store.js';

import './CravingSelector.css';

export class CravingSelector extends Component{
    componentDidMount(){
        this.props.dispatch(fetchUnhealthyStuff());
        // console.log("what is this:" + this.props.unhealthyStuff);
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
        else{
            this.props.dispatch(selectCraving(e.target.value));
            this.props.dispatch(fetchHealthyStuff(e.target.value));
        }
        // console.log(e.target.value);
        // console.log("selection in the state:" + this.props.selectedUnhealthy);
        // console.log("healthy stuff:" + this.props.healthyStuff);

    }

    render(){
        return(
                <form>
                    <select name="cravings" onChange={e => this.onChange(e)}>
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
    //healthyStuff: state.healthyStuff,
    //error: state.error
});

export default connect(mapStateToProps)(CravingSelector);