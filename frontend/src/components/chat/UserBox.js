import React, { Component } from 'react';
import './CSS/UserBox.css'

class UserBox extends Component{
    render(){
        return(
            <div id="userbox">
                <img 
                    src="https://image.flaticon.com/icons/png/512/1946/1946429.png"
                    id="usericon"></img>
                <a id="username">User Name</a>
            </div>
            
        );
    }
}

export default UserBox;