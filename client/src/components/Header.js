import React from 'react';
import {connect} from 'react-redux';

import TopNav from './TopNav';
import InfoModal from './InfoModal';

import './Header.css';

export class Header extends React.Component  {

    render() {
        let infoModal;
        if (this.props.showInfoModal) {
            infoModal = <InfoModal />;
        }

        return (
            <header className="header">
                <TopNav />
                {infoModal}
                <h2>Tasty Alternatives</h2>
                <img src="http://image.flaticon.com/icons/png/512/31/31034.png" 
                    className="logo" alt="logo" />
                 <img src="https://cdn4.iconfinder.com/data/icons/mathematical-symbols/50/Greater_Than-256.png"
                     className="logo" alt="logo" />
                <img src="http://icons.iconarchive.com/icons/icons8/windows-8/512/Food-Hamburger-icon.png" 
                    className="logo" alt="logo" />
                <h3>What are you craving?</h3>
            </header>
        );
    }
};

const mapStateToProps = state => ({
    showInfoModal: state.showInfoModal
});

export default connect(mapStateToProps)(Header);