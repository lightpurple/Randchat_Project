import { Link } from "react-router-dom";

const chatpage = () => {

    // client.delete("/auth/mypage")
    // .then(response => {
    //   console.log(response.data.nickname);
    //   setUsers(response.data.nickname);
    // })
    // .catch(error => {
    //   console.error(error);
    // })

return (
    <div className="chat">
    <a className="c_button" href='/chat'>채팅하기</a>
    </div>
);
};
export default chatpage;