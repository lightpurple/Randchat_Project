import React from 'react'; 
import ReactLoading from 'react-loading'; 
function Loader({type, color, message}) { 
    return ( 
        <div className="contentWrap"> 
            <div style={
                { position: "fixed", 
                top: "40%", 
                left: "45%", 
                transform: "translate(-50%, -50%)" 
            }}> 
            <h2>{message}</h2> 
            <ReactLoading type={type} color={"black"} height={'100px'} width={'100px'} /> </div> 
        </div> 
    ); 
} 
export default Loader;
