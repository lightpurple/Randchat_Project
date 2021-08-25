import React, { Component } from 'react';
import Header from '../components/chat/Header';
import Footer from '../components/chat/Footer';
import Contents from '../components/chat/Contents';
import './Chatting.css';

class Chatting extends Component {
    render() {
        return(
            <div id="back">
                <Header/>
                <Contents/>
                <Footer/>
            </div>
        );
    }

}

export default Chatting;