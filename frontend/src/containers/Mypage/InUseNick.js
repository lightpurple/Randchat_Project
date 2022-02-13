import React, { useEffect, useState } from 'react';
import client from "../../client";

function InUseNick() {

  const [nickname, setNickname] = useState("");

  useEffect(()=>{
    client.get("/api/mypage")
      .then(response => {
      console.log(response.data.nickname);
      setNickname(response.data.nickname);
    })
      .catch(error => {
      console.error(error);
    })
  },[nickname])

  return (
    <>
    <div className='Use'>
      <p>{nickname}qwer</p>
    </div>
    </>
  );
}

export default InUseNick;