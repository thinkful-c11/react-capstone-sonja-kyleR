import React, { Component }  from 'react'; //
import { connect } from "react-redux";
import {fetchUnhealthyStuff} from '../actions';
//import {store} from '../store.js';

import './CravingSelector.css';

export class CravingSelector extends Component{
    componentDidMount(){
        this.props.dispatch(fetchUnhealthyStuff());
        //console.log(store.getState())
    }

     listUnhealthyStuff(){
        return this.props.unhealthyStuff.map((unhealthyItem) =>{
            return(
                <option name={(unhealthyItem.name).toLowerCase()}>
                    {unhealthyItem.name}
                </option>
            );
        });
    }

    render(){
        return(
                <form>
                    <select name="cravings">
                        <option name='choose'>Select a craving</option>
                        {this.listUnhealthyStuff()}
                        {/*<option name='chocolate'>Chocolate</option>
                        <option name='candy'>Candy</option>
                        <option name='fries'>French Fries</option>
                        <option name='carbs'>Bread or Pasta</option>
                        <option name='soda'>Soda</option>*/}
                        <option name='other'>Other</option>
                    </select>
                </form>

        );
    }
}

const mapStateToProps = (state, props) => ({
    unhealthyStuff: state.unhealthyStuff
});

export default connect(mapStateToProps)(CravingSelector);