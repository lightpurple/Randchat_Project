import React from "react";

const Responsive = ({children, ...rest}) =>{
    return(
        <div {...rest}>{children}</div>
    );
}

export default Responsive;