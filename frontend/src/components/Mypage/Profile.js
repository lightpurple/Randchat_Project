import { useState, useEffect } from "react";
import Intro from "../../containers/Mypage/Intro";
import InUseIntro from "../../containers/Mypage/InUseIntro";
import client from "../../lib/api/client";
import "./CSS/Mypagebox.css";
import "./CSS/Profile.css";

const Profile = () => {

    const [fileUrl, setFileUrl] = useState(null);

    const onChange = (e) => {
        const ImageFile = e.target.files[0];
        const image = new FormData();
        const imageUrl = URL.createObjectURL(ImageFile);
        setFileUrl(imageUrl)
        image.append('image', ImageFile);

        client.post('/api/mypage/upload', image)
           .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.error(err);
              })
    }

    const [url, setNickname] = useState("");

    useEffect(()=>{
      client.get("/api/mypage/upload")
        .then(response => {
        console.log(response.data.url);
        setNickname(response.data.url);
      })
        .catch(error => {
        console.error(error);
      })
    },[url])

    // const onClick = (e) => {
    //     client
    //     .post('api/mypage/upload', formData)
    //         .then(res => {
    //             console.log(res.data);
    //           })
    //           .catch(err => {
    //             console.error(err);
    //           })
    //     }

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
                    color: "#cccccc"}}
                />
            </div>

            <div className="itemSelect">
                <label className="inputFileButton" htmlFor="file">
                    사진 선택
                </label>
                <input className="itemFile" type="file" id="file" onChange={onChange} />
                {/* <button onClick={onClick}>저장하기</button> */}
            </div>
        </div>
    );
};
export default Profile;