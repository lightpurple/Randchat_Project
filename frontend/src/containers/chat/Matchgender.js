import React from 'react';
import MatchgenderModal from './MatchgenderModal';
import '../../components/chat/CSS/Modal.css'
import { withRouter } from 'react-router';

const Matchgender = (props) => {
    const { showModal, closeModal, cancel , loading, findChat} = props
    var matchgender = ''

    const match_gender = () =>{
        props.propFunction(matchgender)
    }

    return (
        <div>
  
            <React.Fragment>
                <MatchgenderModal open={ showModal } close={ closeModal } header="매칭 성별" cancel={cancel}>
                    { loading ? 
                        <div>대화상대를 찾고 있습니다.</div> 
                        :<div>
                            <button className="change"
                                id="matchgender"
                                onClick={()=>{
                                    matchgender = 'M';
                                    match_gender();
                                    findChat()
                                }}
                                
                            >Male</button>
                            <button className="change" id="matchgender"
                                onClick ={()=>{
                                    matchgender='F'
                                    match_gender();
                                    findChat();
                                }}
                            >Female</button>
                        </div>
                    }
                    
                </MatchgenderModal>
                
            </React.Fragment>


        </div>
    );
}

export default withRouter(Matchgender);