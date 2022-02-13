import InUseEmail from "../../containers/Mypage/InUseEmail";

const EmailPassword = () => {
return (
    <>
        <div className="MyPagebox">
        
            <div className="Item">
                <p>이메일</p>
            </div>
            <div className="Contents">
                <InUseEmail/>
            </div>
            <hr style={
                    {margin: "5px 20px 15px 30px",
                    padding: "0 10px 0 0",
                    width: "530px",
                    border: "solid thin #d0d0d0"}}/>
        </div>
    </>
);
};
export default EmailPassword;