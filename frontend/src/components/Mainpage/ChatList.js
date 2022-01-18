import React, { useEffect, useState } from 'react';
import client from '../../lib/api/client';
import Loader from "./Loader";
import { Link } from "react-router-dom";
import "./CSS/Mainpage.css";

const ChatList = ( props ) => {
    const { socket, user, gender, other, roomId, disconnect, findChat, cancel, loading, introduce, data} = props

    var matchgender = ''

    const onLogout = () => {
        localStorage.clear();
    };

    const match_gender = ()=>{ 
        props.MatchGender(matchgender)
    }


    return(
    <div className="MainpageBox">
        <Link to="/" className="headermenu" onClick={onLogout}>Logout</Link>
        <p>{user}</p>
        <div className="ProfileImg">
            <div className="Img1"></div>
            <div className="Img2"></div>
            <div className="Img3"></div>
        </div>
        <div className='Match'>
            {loading ? <Loader></Loader> : <p>상대방을 선택하여 대화를 시작해보세요</p>}
            { loading? (
                <button onClick={()=>{   
                    cancel()
                }}>취소</button>
            ):(
                <>
                    <button 
                        id='matchgender'
                        onClick={()=>{
                            matchgender = 'M'
                            match_gender()
                            findChat()
                        }}
                    >Male</button>
                    <button
                        id='matchgender'
                        onClick={()=>{
                            matchgender = 'F'
                            match_gender()
                            findChat()
                        }}
                    >Female</button>
                </>
            )}
        </div>
        <div className="ProfileImg">
            <div className="Img3"></div>
            <div className="Img1"></div>
            <div className="Img2"></div>
        </div>
    </div>
    )
}
export default ChatList;