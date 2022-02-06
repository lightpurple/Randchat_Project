import React, { useState } from 'react';
import client from "../../client";

function InUseEmail() {
  // const [users, setUsers] = useState(null);

  // useEffect(() => {
  //   const getNick = async () => {
  //       setUsers(null);
  //       const response = await client.get(
  //         '/api/mypage'
  //       );
  //       setUsers(response.data);
  //   };

  //   getNick();
  // }, []);

  const [email, setEmail] = useState("");

  client.get("/api/mypage")
    .then(response => {
      console.log(response.data.email);
      setEmail(response.data.email);
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
    </>
  );
}

export default InUseEmail;