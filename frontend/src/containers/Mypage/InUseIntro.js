import React, { useState } from 'react';
import client from "../../client";

function InUseIntro() {
  // const [users, setUsers] = useState(null);

  // useEffect(() => {
  //   const getIntro = async () => {
  //       setUsers(null);
  //       const response = await client.get(
  //         '/api/mypage'
  //       );
  //       setUsers(response.data);
  //   };
  //   getIntro();
  // }, []);

  const [introduce, setIntroduce] = useState(null);
  

  client.get("/api/mypage")
    .then(response => {
      console.log(response.data.introduce);
      setIntroduce(response.data.introduce);
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
      {/* <Nick ChangeIntro={introduce}>
        </Nick> */}
      <p>{introduce}</p>
    </>//get한 값 서로 modal input에 value로 넣기
  );
}

export default InUseIntro;