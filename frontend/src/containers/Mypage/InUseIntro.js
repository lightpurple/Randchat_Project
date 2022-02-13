import React, { useState } from 'react';
import client from "../../client";

function InUseIntro() {

  const [introduce, setIntroduce] = useState(null);
  
  client.get("/api/mypage")
    .then(response => {
      console.log(response.data.introduce);
      setIntroduce(response.data.introduce);
    })
    .catch(error => {
      console.error(error);
    })

  return (
    <>
      <p>{introduce}</p>
    </>
  );
}

export default InUseIntro;