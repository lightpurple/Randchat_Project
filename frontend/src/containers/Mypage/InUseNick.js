import React, { useState, useEffect } from 'react';
import client from "../../lib/api/client";

function InUseNick() {
  // const [users, setUsers] = useState(null);

  //   const getNick = async () => {
  //       const response = await client.get(
  //         '/auth/mypage'
  //       );
  //       setUsers(response); // 데이터는 response.data 안에 들어있음
  //       console.log(response);
  //   };
  //   useEffect(() => {
  //   getNick();
  // }, []);

  client.get("/auth/mypage")
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    })


//  if (!users) return null;
  return (
    <>
    <input type='text' name='title' className="inputTitle" />
    </>
  );
}

export default InUseNick;