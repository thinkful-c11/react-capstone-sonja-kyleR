import React from 'react'; //{ Component } 
import './CravingSelector.css';

export default function CravingSelector(){

    return(
            <form>
                <select name="cravings">
                    <option name='choose'>Select a craving</option>
                    <option name='chocolate'>Chocolate</option>
                    <option name='candy'>Candy</option>
                    <option name='fries'>French Fries</option>
                    <option name='carbs'>Bread or Pasta</option>
                    <option name='soda'>Soda</option>
                    <option name='other'>Other</option>
                </select>
        	  </form>

    );
}