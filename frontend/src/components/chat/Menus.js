import React, { Component } from 'react';
import './CSS/Menus.css';

class Menus extends Component{
    render(){
        return(
            <div id="menubox">
                <button id="btn">신고하기</button>
                <button id="btn">차단하기</button>
                <button id="btn">나가기</button>
            </div>
        );
    }
}

export default Menus