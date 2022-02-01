import { useState, useEffect } from "react";
import Intro from "../../containers/Mypage/Intro";
import InUseIntro from "../../containers/Mypage/InUseIntro";
import client from "../../lib/api/client";
import "./CSS/Mypagebox.css";
import "./CSS/Profile.css";

const Profile = () => {

    // const [imageUrl, setFileUrl] = useState("");

    // const onClick = (e) => {
    //     const ImageFile = e.target.files[0];
    //     const image = new FormData();
    //     const imageUrl = URL.createObjectURL(ImageFile);
    //     setFileUrl(imageUrl)
    //     image.append('image', ImageFile);

    //     client.post('/api/mypage/upload', image)
    //        .then(res => {
    //             console.log(res);
    //           })
    //           .catch(err => {
    //             console.error(err);
    //           })
    // }

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
                {/* <form method="post" action="/api/mypage/upload" enctype="multipart/form-data"> */}
                {/* <label className="inputFileButton" htmlFor="file">
                    사진 선택
                </label> */}
                {/* <input className="itemFile" type="file" id="file" accept="image/png, image/jpeg"/>
                <input type="submit"/> */}

                {/* </form> */}
                {/* <button onClick={onClick}>저장하기</button> */}

                <form action='/api/mypage/upload'>
                <input className="itemFile" type="file" id="file" accept="image/png, image/jpeg"/>
                <input type='submit' value='저장'/>
                </form>

            </div>
        </div>
    );
};
export default Profile;