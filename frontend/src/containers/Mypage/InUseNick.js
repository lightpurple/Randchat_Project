import React, { useEffect, useState } from 'react';
import client from "../../lib/api/client";
// import Nick from './Nick';

function InUseNick() {
  // const [users, setUsers] = useState(null);

  //   const getNick = async () => {
  //       const response = await client.get(
  //         '/api/mypage'
  //       );
  //       setUsers(response); // 데이터는 response.data 안에 들어있음
  //       console.log(response);
  //   };
  //   useEffect(() => {
  //   getNick();
  // }, []);

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

  


//  if (!users) return null;
  return (
    <>
      <p>{nickname}</p>
    </>
  );
}

export default InUseNick;