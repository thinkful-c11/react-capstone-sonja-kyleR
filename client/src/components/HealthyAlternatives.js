import React, { Component }  from 'react'; 
import { connect } from "react-redux";
import {postHealthy, busterAlreadyExistsError} from '../actions';
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

    addCravingBuster(event){
        event.preventDefault();
        const value = this.input.value;
        this.input.value= "";
        if(!this.props.healthyStuff.find( thing => {
            return thing.name === value.trim().toLowerCase();
        })){
           this.props.dispatch(postHealthy({name: value.trim(), 
                correspondingUnhealthyFood: this.props.selectedUnhealthy}));
        }else{
           this.props.dispatch(busterAlreadyExistsError());
        }
    }

    render() {

        let healthyStuff;
        if(this.props.healthyStuff.length > 0){
            healthyStuff =  this.listHealthyStuff();
        }
        else{
            healthyStuff = <div className="item">There are no craving busters, yet. Tell us your favorite!</div>;
        }

        let busterError;
        if(this.props.busterAlreadyExists){
            busterError = <div className="error">Already exists</div>;
        }


        return(
            <div className='alternatives'>
                {healthyStuff}
                <div className='item'>
                    <form onSubmit={e => this.addCravingBuster(e)}>
                        <input type="text" placeholder="Add a craving buster" 
                                ref={input => this.input = input} required/>
                        <button type="submit">+</button>
                        {busterError}
                    </form>
                </div>
            </div>   
        );
    }
}

const mapStateToProps = (state, props) => ({
    healthyStuff: state.healthyStuff,
    selectedUnhealthy: state.selectedUnhealthy,
    busterAlreadyExists: state.busterAlreadyExists,
});

export default connect(mapStateToProps)(HealthyAlternatives);