import { useState } from "react";
import Intro from "../../containers/Mypage/Intro";
import InUseIntro from "../../containers/Mypage/InUseIntro";
import "./CSS/Profile.css";

const Profile = () => {

    const [fileUrl, setFileUrl] = useState(null);

    function handleFileChange(event){
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setFileUrl(imageUrl)
     }

return (
    <>
    <div className="MyPageProfile">
    
    <div className="imageBox">
    
    <div>
    <img className="image" src={fileUrl} alt=""/>
    </div>
     
    </div>

    <div className="Item">
        <p>소개 한마디</p>
    </div>
    <div className="Contents">
    <p>
            <InUseIntro/>
            </p>
        <div className="Change">
            <Intro/>
        </div>
        <hr style={
            {margin: "20px 0 20px 30px",
            width: "60%",
            border: "solid 1px",
            color: "#cccccc"}}/>
            </div>

    <div className="itemSelect">
    <label className="inputFileButton" for="file">
  사진 선택
</label>
      <input className="itemFile" type="file" id="file" onChange={handleFileChange} />
    </div>
    </div>
    </>
);
};
export default Profile;