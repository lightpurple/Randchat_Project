import React, {Component, useEffect, useState} from 'react';
import MatchgenderModal from './MatchgenderModal';
import client from "../../lib/api/client";
import '../../components/chat/CSS/Modal.css'
import { Route, withRouter } from 'react-router';
import ChatPage from '../../pages/ChatPage';


const Matchgender = (props) => {
    const { showModal, closeModal } = props
    const [gender, setGender] = useState(null)

    useEffect(()=>{
        client.get('/chatting/').then((res)=>{
            setGender(res.data.gender)
            console.log(gender)
        })
    })
    
    const samematch = () =>{
        const matchgender = {
            gender : "F" ? "F" : "M"
        }
        client.post('/chatting/',matchgender).then(res =>{
            console.log(matchgender)
            console.log(res.data)
            const roomId = res.data.roomId
            const other = res.data.other
            if(res.status === 200){
                <Route exact path={`/chat/:${roomId}`} component={ChatPage}/>
                localStorage.setItem(`${other}`,roomId)
            }
        })
    }

    const diffmatch = () =>{
        const matchgender = {
            gender : "F" ? "M" : "F"
        }
        client.post('/chatting/',matchgender).then(res =>{
            console.log(matchgender)
            console.log(res.data)
            const roomId = res.data.roomId
            const other = res.data.other
            if(res.status === 200){
                <Route exact path={`/chat/:${roomId}`} component={ChatPage}/>
                localStorage.setItem(`${other}`,roomId)
            }
        })
    }

  
    return (
      <div>
  
        <React.Fragment>
            <MatchgenderModal open={ showModal } close={ closeModal } header="매칭 성별">
                <div>
                    <button className="change" onClick={samematch()}
                    >동성 매칭
                    </button>
                    <button className="change" onClick={diffmatch()}
                    >이성 매칭
                    </button>
                </div>
            </MatchgenderModal>
              
        </React.Fragment>
  
  
      </div>
    );
  }
  
  export default withRouter(Matchgender);