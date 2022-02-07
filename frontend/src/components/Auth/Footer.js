import React, {useState} from 'react';
import './CSS/Footer.css';

export default function Tab() {
    const [currentTab, setTab]=useState(0);

    const [currentCont, setCont]=useState(0);

    const tabClick=(index)=>{
        setTab(index);
        setCont(index);
    };

    const tabContArr=[
        {
            Title:(
                <div className={currentTab===0 ? "active" : "unactive"} onClick={()=>tabClick(0)}>Developer</div>
            ),
            Content:(
                <div className={currentCont===0 ? "current" : "none"}> 탭1 내용 </div>
            )
        },
        {
            Title:(
                <div className={currentTab===1 ? "active" : "unactive"} onClick={()=>tabClick(1)}>About</div>
            ),
            Content:(
                <div className={currentCont===1 ? "current" : "none"}>  탭2 내용 </div>
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