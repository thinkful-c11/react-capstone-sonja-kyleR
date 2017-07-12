import React from 'react'; //, { Component } 
import './AddOptionForm.css';

export default function AddOptionForm(){

    return(
        <div className='addOption'>
            Don't see your craving? Tell us what you're after!
            <input type="text" placeholder="Vegan cheese"></input>
            <button>Tell us!</button>
        </div>
    );

}