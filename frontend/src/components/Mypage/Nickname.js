import Nick from '../../containers/Mypage/Nick';
import InUseNick from '../../containers/Mypage/InUseNick';

const nickname = () => {
return (
    <>
        <div className="MyPagebox">
            
            <div className="Item">
                <p>닉네임</p>
                <div className="Change">
                    <Nick/>
                </div>
            </div>
            <div className="Contents">
                <InUseNick/>
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
export default nickname;