import React, { useState } from 'react';
import client from "../../client";

function InUseEmail() {
  const [email, setEmail] = useState("");

  client.get("/api/mypage")
    .then(response => {
      console.log(response.data.email);
      setEmail(response.data.email);
    })
    .catch(error => {
      console.error(error);
    })

  return (
    <>
      <div className='Use'>
        <p>{email}qwr@qwer.com</p>
      </div>
    </>
  );
}

export default InUseEmail;