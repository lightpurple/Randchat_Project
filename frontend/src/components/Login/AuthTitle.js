import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/Title.css';
import {AiFillWechat} from 'react-icons/ai';
import {AiFillPlusCircle} from 'react-icons/ai';
import {BsFillPersonLinesFill} from 'react-icons/bs';


const Title = props =>{
    return(
        <div className="title">
            <h1>{props.title}</h1>
            <Link to="/mypage" className='mbutton'>
                <BsFillPersonLinesFill className='MyIcon'/></Link>
            <Link to="/chatting" className='cbutton'>
                <AiFillWechat className='CIcon'/></Link>
            <Link to="/main" className='mbutton'>
            <AiFillPlusCircle className='MIcon'/></Link>
            <hr/>
        </div>
    );
    
}

export default Title;