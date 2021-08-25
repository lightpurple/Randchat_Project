import React from 'react';
import './Title.css';

const Title = props =>{
    return(
        <div className="title">
            <h1>{props.title}</h1>
        </div>
    );
    
}

export default Title;