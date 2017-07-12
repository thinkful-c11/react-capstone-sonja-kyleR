import React, {Component} from 'react'; //
import {connect} from 'react-redux';

import {postUnhealthy} from '../actions';
import './AddOptionForm.css';

export class AddOptionForm extends Component{

    onSubmit(event){
        event.preventDefault();
        const value = this.input.value;
        this.props.dispatch(postUnhealthy({name:value}));
    }

    render(){
        return(
            <div className='addOption'>
                Don't see your craving? Tell us what you're after!
                <form onSubmit={e => this.onSubmit(e)}>
                    <input type="text" placeholder="Vegan cheese" 
                        ref={input => this.input = input} required/>
                    <button type="submit">Tell us!</button>
                </form>
            </div>
        );
    }

}

export default connect()(AddOptionForm);
