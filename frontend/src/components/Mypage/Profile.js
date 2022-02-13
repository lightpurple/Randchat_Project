import { useState, useEffect } from "react";
import Intro from "../../containers/Mypage/Intro";
import InUseIntro from "../../containers/Mypage/InUseIntro";
import client from "../../client";
import "./CSS/Mypagebox.css";
import "./CSS/Profile.css";

function Profile() {

    const onChangeImg = async (e) => {
        e.preventDefault();
        
        if(e.target.files){
          const uploadFile = e.target.files[0]
          const formData = new FormData()
          formData.append('image',uploadFile)

          await client({
            method: 'post',
            url: '/api/mypage/upload',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        })
        .then(res => {
                alert("사진이 변경되었습니다");     
              })
        .catch(err => {
                alert("파일 크기가 4MB를 초과합니다");
              })
        };
    };      

    const [url, seturl] = useState("");

    useEffect(()=>{
      client.get("/api/mypage")
        .then(response => {
        console.log(response.data.image);
        seturl(response.data.image);
      })
        .catch(error => {
        console.error(error);
      })
    },[])

    return (

        <div className="MyPageProfile">
        
            <div className="imageBox">
                <img className="image" src={url} alt=""/>
            </div>

            <div className="Item">
                <p>소개 한마디</p>
                <div className="Change">
                    <Intro/>
                </div>
            </div>
            
            <div className="Contents">
                <InUseIntro/>
                <hr style={
                    {margin: "35px 20px 20px 0",
                    padding: "0 10px 0 0",
                    width: "348px",
                    border: "solid thin #d0d0d0"}}
                />
            </div>

            <div className="itemSelect">
                <form>
                <label htmlFor="profile"  className="FileSelect">사진 변경</label>
                    <input type="file" id="profile" accept="image/png, image/jpeg" className="Filebutton" name="image" onChange={onChangeImg}/>
                </form>
            </div>
        </div>
    );
};
export default Profile;