import React from 'react';
import { Link } from 'react-router-dom';
import '../Title.css';
import {AiFillWechat} from 'react-icons/ai';
import {AiFillPlusCircle} from 'react-icons/ai';
import {RiLogoutBoxRLine} from 'react-icons/ri';


const Title = props =>{

    const onLogout = () => {
        localStorage.clear();
    };

    return(
        <div className="title">
            <h1>{props.title}</h1>
            <Link to="/" className="headermenu" onClick={onLogout}>
                <RiLogoutBoxRLine className="OIcon"/></Link>
            <Link to="/chat" className='cbutton'>
                <AiFillWechat className='CIcon'/></Link>
            <Link to="/main" className='mbutton'>
            <AiFillPlusCircle className='MIcon'/></Link>
            <hr/>
        </div>
    );
    
}

export default Title;