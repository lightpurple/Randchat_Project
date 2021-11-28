import React, {useState} from 'react';

    function ChangePW(){

        const [text, setText] = useState(null);
        const onChange = (e) => {
            console.log(e.target.value);
            setText(e.target.value);
        }

        
        //패스워드 유효성 검사
        var condition = /^[0-9a-zA-Z]+$/;
        var result=condition.test(text);

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
        <input type="text" className="inputvalue" onChange={onChange} value={text} name="password"/>
        </div>
        <div className="Cvaluename">
        <p>새 비밀번호</p>
        </div>
        {/* <div className="value">
        <input type="text" className="inputvalue" onChange={onChange} value={text} name="password"/>
        </div>
        <div className="Cvaluename">
        <p>새 비밀번호 확인</p>
        </div>
        <div className="value">
        <input type="text" className="inputvalue" onChange={onChange} value={text} name="password"/>
        </div> */}
        <div>
            <h4>* 8자 이상의 영문, 숫자</h4>
        </div>   
        <button className="b_change" disabled> 변경 </button>
            <button className="b_cancel"> 취소 </button>
            </div>
</>
        );
    };



export default ChangePW;