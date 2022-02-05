import React from 'react';
import '../Title.css';


const Title = props =>{
    return(
        <div className="title">
            <h1>{props.title}</h1>
            <hr/>
        </div>
    );
    
}

export default Title;