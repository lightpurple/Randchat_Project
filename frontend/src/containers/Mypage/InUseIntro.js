import React, { useState, useEffect } from 'react';
import client from "../../lib/api/client";

function InUseIntro() {
  // const [users, setUsers] = useState(null);

  // useEffect(() => {
  //   const getIntro = async () => {
  //       setUsers(null);
  //       const response = await client.get(
  //         '/auth/mypage'
  //       );
  //       setUsers(response.data);
  //   };
  //   getIntro();
  // }, []);

  const [introduce, setUsers] = useState(null);

  client.get("/auth/mypage")
    .then(response => {
      console.log(response.data.introduce);
      setUsers(response.data.introduce);
    })
    .catch(error => {
      console.error(error);
    })


  // if (!users) return null;
  return (
    <>
      {/* {users.map(user => (
        <p key={user.id}>
          {user.introduce}
        </p>
      ))} */}
      <p>{introduce}</p>
      <input type='text' name='title' className="inputTitle" />
    </>
  );
}

export default InUseIntro;