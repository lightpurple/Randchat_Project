import React, {useState} from 'react';
import './CSS/Footer.css';
import { Link } from 'react-router-dom';

export default function Tab() {
    const [currentTab, setTab]=useState(0);

    const [currentCont1, setCont]=useState(false);
    const [currentCont2, setContent]=useState(false);


    const tabClick=(index)=>{
        setTab(index);
        setCont(view => view ? false : true);setContent(view => view ? false : true);
    };

    const tabContArr=[
        {
            Title:(
                <div className={currentTab===0 ? "active" : "unactive"} onClick={()=>tabClick(0)}>Developer</div>
            ),
            Content:(
                <div className={currentCont1===false ? "none" : "content"}>
                <div className='dev'>
                <div className="web">FRONTEND</div>
                <a href="https://github.com/jin0610" className='name'>서지인</a>
                <a href="https://github.com/phseon" className='name'>박혜선</a>
                </div>
                <div className='dev'>
                <div className="web">BACKEND</div>
                <a href="https://github.com/lightpurple" className='name'>홍은성</a>
                </div>
                </div>
            )
        },
        {
            Title:(
                <div className={currentTab===1 ? "active" : "unactive"} onClick={()=>tabClick(1)}>About</div>
            ),
            Content:(
                <div className={currentCont2===false ? "none" : "content"}><div className='abt'>
                    <div className="about"> 새로운 사람을 만나기 어려워진 지금</div>
                    <div className="about">
                    온라인으로 친구를 만들어보세요</div>
                    <div className="about">
                    랜덤으로 매칭된 상대방과 대화를 시작하여</div>
                    <div className="about">
                    관심사를 공유하며 새로운 인연을 맺어볼 수 있습니다</div>
                    </div>
                    </div>
            )
        }
    ];

    return (
        <div>
          <div className="tabTitle">
            {tabContArr.map((section, index)=>{
                return section.Title
            })}
          </div>
          <div className="tabContent">
          	{tabContArr[currentTab].Content}
          </div>
        </div>
    );
}