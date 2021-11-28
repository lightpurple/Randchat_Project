import { Link } from "react-router-dom";

const Changepage = () => {

    // client.delete("/auth/mypage")
    // .then(response => {
    //   console.log(response.data.nickname);
    //   setUsers(response.data.nickname);
    // })
    // .catch(error => {
    //   console.error(error);
    // })

return (
    <div className="changepage">
    <a className="c_button" href='/chat'>채팅하기</a>
    <a className="p_button" href='/Mypage/Change_password'>비밀번호 변경</a>
    </div>
);
};
export default Changepage;