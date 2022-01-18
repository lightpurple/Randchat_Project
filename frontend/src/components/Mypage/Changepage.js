import React from 'react';
import { Link } from 'react-router-dom';

const Changepage = () => {

    // client.delete("/api/mypage")
    // .then(response => {
    //   console.log(response.data.nickname);
    //   setUsers(response.data.nickname);
    // })
    // .catch(error => {
    //   console.error(error);
    // })

    return (
        <div className="changepage">
            <Link to="/Mypage/Change_password" className="p_button">비밀번호 변경</Link>
        </div>
    );
};
export default Changepage;