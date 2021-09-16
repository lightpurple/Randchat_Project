import Password from '../../containers/Mypage/Password';
import InUseEmail from "../../containers/Mypage/InUseEmail";

const EmailPassword = () => {
return (
    <>
    <div className="MyPagebox">
        
        <div className="Item">
            <p>이메일</p>
        </div>
        <div className="Contents">
            <p><InUseEmail/></p>
            <div className="Change"><Password/>
            </div>
        </div>
        <hr/>
        </div>
        </>
);
};
export default EmailPassword;