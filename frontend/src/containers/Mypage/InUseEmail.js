import React, { useState, useEffect } from 'react';
import client from "../../lib/api/client";

function InUseEmail() {
  // const [users, setUsers] = useState(null);

  // useEffect(() => {
  //   const getNick = async () => {
  //       setUsers(null);
  //       const response = await client.get(
  //         '/auth/mypage'
  //       );
  //       setUsers(response.data);
  //   };

  //   getNick();
  // }, []);

  const [email, setUsers] = useState(null);

  client.get("/auth/mypage")
    .then(response => {
      console.log(response.data.email);
      setUsers(response.data.email);
    })
    .catch(error => {
      console.error(error);
    })


  // if (!users) return null;
  return (
    <>
      {/* {users.map(user => (
        <p key={user.id}>
          {user.email}
        </p>
      ))} */}
      <p>{email}</p>
      <input type='text' name='title' className="inputTitle" />
    </>
  );
}

export default InUseEmail;