import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import client from '../../client';
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
                console.log(res);
                console.log(data)
                if(res.status === 200) {
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
            })
        }

        return(
        <>
            <div className="Changebox">
                <div className="Item">
                    <h3>비밀번호 변경</h3>
                </div>
                <div className="PWDiv">
                <div className="Cvaluename">
                    <p>현재 비밀번호</p>
                </div>
                <div className="value">
                    <input type="password" className="inputvalue" onChange={OldPW} value={oldpw || ""} name="old_password"/>
                </div>
                </div>
                <div className="PWDiv">
                <div className="Cvaluename">
                    <p>새 비밀번호</p>
                </div>
                <div className="value">
                    <input type="password" className="inputvalue" onChange={NewPW} value={newpw || ""} name="new_password"/>
                </div>
                </div>
                <div>
                    <h6>* 8자 이상의 영문, 숫자를 입력하세요</h6>
                </div>   
                <button className="b_change" onClick={ChangePassword}> 변경 </button>
                <Link to="/mypage">
                <button className='b_cancel'>취소</button>
                </Link>
            </div>
        </>
        );
    };



export default ChangePW;