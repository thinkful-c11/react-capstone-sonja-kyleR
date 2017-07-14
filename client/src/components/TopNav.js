import React from 'react';
import {connect} from 'react-redux';

import {toggleInfoModal} from '../actions';

import './TopNav.css';


export class TopNav extends React.Component {

    toggleInfoModal(event) {
        event.preventDefault();
        this.props.dispatch(toggleInfoModal());
        }

    render() {
        return (
            <nav>
                    <a className="what" href="#" onClick={e => this.toggleInfoModal(e)}>
                        <i className="fa fa-question-circle fa-lg"  aria-hidden="true"></i>
                    </a>
            </nav>
        );
    }
};

export default connect()(TopNav);

