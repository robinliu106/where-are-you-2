import React from "react";

const NavBar = () => {
    return (
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="#">
                        Host a game
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        Join a game
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        Link
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default NavBar;
