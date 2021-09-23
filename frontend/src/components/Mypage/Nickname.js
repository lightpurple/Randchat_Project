import Nick from '../../containers/Mypage/Nick';
import InUseNick from '../../containers/Mypage/InUseNick';

const nickname = () => {
return (
    <>
    <div className="MyPagebox">
        
        <div className="Item">
            <p>닉네임</p>
        </div>
        <div className="Contents">

            <p>
            <InUseNick/>
            </p>

            <div className="Change">
            <Nick/>
            </div>
        </div>
        <hr/>
        </div>
        </>
);
};
export default nickname;