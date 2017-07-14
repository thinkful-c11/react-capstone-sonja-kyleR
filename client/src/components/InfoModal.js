import React from 'react';
import {connect} from 'react-redux';

import {toggleInfoModal} from '../actions';

import './InfoModal.css';

export class InfoModal extends React.Component {
    onClose(event) {
        event.preventDefault();
        this.props.dispatch(toggleInfoModal());
    }

    render() {
        return (
            <div className="overlay" id="modal">
                <div className="content">
                    <h3>What do I do?</h3>
                    <div>
                        <p>This is an app to help you combat unhealthy cravings. <br/>
                        This is how it works: </p>
                        <ul>
                            <li>1. Select your craving from the drop-down menu. 
                                   If you don't see what you want, select <strong>Other</strong> to 
                                   add yours.</li>
                            <li>2. You'll get a list of healthy alternatives. Add more if 
                                   you know some!</li>
                        </ul>
                        <p>Then enjoy improved health and productivity. Happy snacking!</p>
                        <a className="close" href="#" onClick={e => this.onClose(e)}>Got It!</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(InfoModal);
