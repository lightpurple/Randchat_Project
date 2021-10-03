import React, { useState, useEffect } from 'react';
import client from "../../lib/api/client";

function InUseEmail() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getNick = async () => {
        setUsers(null);
        const response = await client.get(
          '/auth/mypage?id=1'
        );
        setUsers(response.data);
    };

    getNick();
  }, []);

  if (!users) return null;
  return (
    <>
      {users.map(user => (
        <p key={user.id}>
          {user.email}
        </p>
      ))}
    </>
  );
}

export default InUseEmail;