import React, { useState, useEffect } from 'react';
import client from "../../lib/api/client";

function InUseNick() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getNick = async () => {
        setUsers(null);
        const response = await client.get(
          '/auth/mypage?id=1'
        );
        setUsers(response.data); // 데이터는 response.data 안에 들어있음
    };

    getNick();
  }, []);

  if (!users) return null;
  return (
    <>
      {users.map(user => (
        <p key={user.id}>
          {user.nickname}
        </p>
      ))}
    </>
  );
}

export default InUseNick;