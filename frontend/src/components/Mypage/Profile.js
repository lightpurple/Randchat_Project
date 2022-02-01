import { useState, useEffect } from "react";
import Intro from "../../containers/Mypage/Intro";
import InUseIntro from "../../containers/Mypage/InUseIntro";
import client from "../../lib/api/client";
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
    },[url])

    return (

        <div className="MyPageProfile">
        
            <div className="imageBox">
                <img className="image" src={url} alt=""/>
            </div>

            <div className="Item">
                <p>소개 한마디</p>
            </div>
            
            <div className="Contents">

                <InUseIntro/>

                <div className="Change">
                    <Intro/>
                </div>
                <hr style={
                    {margin: "20px 0 20px 30px",
                    width: "60%",
                    border: "solid 1px",
                    color: "f7f7f7"}}
                />
            </div>

            <div className="itemSelect">
                <form>
                    <label htmlFor="profile"/>
                    <input type="file" id="profile" className="FileSelect" accept="image/png, image/jpeg" name="image" onChange={onChangeImg}/>
                </form>
            </div>
        </div>
    );
};
export default Profile;