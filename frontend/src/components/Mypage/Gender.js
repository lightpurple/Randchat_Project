import axios from 'axios';
import React, {useState, useEffect} from 'react';
import "./CSS/Gender.css";

const Gender = () => {
    const [gender, setUsers] = useState(null);

    useEffect(() => {
      const getNick = async () => {
          setUsers(null);
          const response = await axios.get(
            'http://localhost:3001/nickname?id=1'
          );
          setUsers(response.data); // 데이터는 response.data 안에 들어있음
      };
  
      getNick();
    }, []);

    if (!gender) return null;
    // const onClickF = () => {
    //     setMessage('여자');
    // }
    // const onClickM = () => {
    //     setMessage('남자');
    // }
    //알림이 계속 뜸. 함수 각각말고 하나로. 삼항 연산자 사용? message를 gender로 변경하기. 파일 이름도 gender 관련으로 변경.


    // 함수 호출의 경우 컴포넌트가 render할 때 호출 결과가 onClick에 바인딩 되기 때문에 클릭할 때 변화가 없음 -> 함수를 바로 정의하여 해결
    return (
        <>
        <div className="MyPagebox">
        <div className="Item">
            <p>매칭 성별</p>
        </div>
        <div className="Contents">
        {gender.map(user => (
            <p key={user.id}>
            {user.gender}
            </p>
        ))}
            <button className="s_button" onClick={ () => {
                axios.patch('http://localhost:3001/nickname/1', {gender: "F"})
                .catch(error => {
                    console.error('Error!', error);
                });
                alert('매칭 성별이 변경되었습니다');
                window.location.reload();
            }
            }>Female</button>
            <button className="s_button" onClick={ () => {
                axios.patch('http://localhost:3001/nickname/1', {gender: "M"})
                .catch(error => {
                    console.error('Error!', error);
                });
                alert('매칭 성별이 변경되었습니다');
                window.location.reload();
            }
            }>Male</button>
        </div>
        <hr/>
        </div>
        </>
    );
};

export default Gender;