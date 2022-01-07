import React, {useState} from 'react';
import client from '../../lib/api/client';
const queryString = require('query-string');

    function ChangePW(){
        const [oldpw, setOldpw] = useState(null);
        const OldPW = (e) => {
            console.log(e.target.value);
            setOldpw(e.target.value);
        }

        const [newpw, setNewpw] = useState(null);
        const NewPW = (e) => {
            console.log(e.target.value);
            setNewpw(e.target.value);
        }

        const ChangePassword = () => {
            const data = {
                old_password: oldpw, 
                new_password: newpw
            }

            client.post('/api/mypage/change_password',queryString.stringify(data)).then(res => {
                alert(res.status);
                alert(res.data.msg);
                // window.location.replace ("/mypage");
                console.log(res);
                console.log(data)
                if(res.status === 200) {
                    // window.location.href = '/mypage'
                    setOldpw(null)
                    setNewpw(null)
                    localStorage.clear()
                    window.location.href = '/'
                    alert("비밀번호 변경 성공! 다시 로그인해주세요")
                    
                }
            
            })
            .catch(res => {
                console.log("error");
                alert(res);
                // window.location.replace ("/chat");
            })
        }

        
        
        //패스워드 유효성 검사
        // var condition = /^[0-9a-zA-Z]+$/;
        // var result=condition.test(text);

        return(
        <>
            <div className="Changebox">
                <div className="Item">
                    <h3>비밀번호 변경</h3>
                </div>
                <div className="Cvaluename">
                    <p>현재 비밀번호</p>
                </div>
                <div className="value">
                    <input type="password" className="inputvalue" onChange={OldPW} value={oldpw || ""} name="old_password"/>
                </div>
                <div className="Cvaluename">
                    <p>새 비밀번호</p>
                </div>
                <div className="value">
                    <input type="password" className="inputvalue" onChange={NewPW} value={newpw || ""} name="new_password"/>
                </div>
                <div>
                    <h4>* 8자 이상의 영문, 숫자</h4>
                </div>   
                <button className="b_change" onClick={ChangePassword}> 변경 </button>
                <button className="b_cancel"> 취소 </button>
            </div>
        </>
        );
    };



export default ChangePW;