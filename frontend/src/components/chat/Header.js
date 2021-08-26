import React from "react";

const Header = () => {
    return(
        <div>
            <div className="TopTitle">
                Funny Chatter
            </div>

            <div className="TopBtn">
                <a className="headermenu" href="/">Logout</a>
                <a className="headermenu" href="/My">My</a>
                <a className="headermenu" href="/About">About</a>
            </div>
        </div>
    );
}

export default Header;