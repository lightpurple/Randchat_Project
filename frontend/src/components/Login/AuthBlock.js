import React from "react";

const mainback = {
    position:"absolute",
    left:"0",
    top:"0",
    bottom:"0",
    right:"0",
    background : "#7C9ACC"
};

const AuthBlock = ({children}) => {
    return <div style={mainback}>{children}</div>
}

export default AuthBlock;
