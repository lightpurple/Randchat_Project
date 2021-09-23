import React, { useState, useEffect } from 'react';
import client from "../../lib/api/client";

function InUseIntro() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getIntro = async () => {
        setUsers(null);
        const response = await client.get(
          '/auth/mypage?id=1'
        );
        setUsers(response.data);
    };

    getIntro();
  }, []);

  if (!users) return null;
  return (
    <>
      {users.map(user => (
        <p key={user.id}>
          {user.introduce}
        </p>
      ))}
    </>
  );
}

export default InUseIntro;