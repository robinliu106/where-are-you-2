import React, { useEffect, useState } from "react";
import randomWords from "random-words";

const HostGame = () => {
    const [fullURL, setFullUrl] = useState();
    const [localURL, setLocalURL] = useState();

    useEffect(() => {
        generateURL();
    }, []);

    const generateURL = () => {
        const baseURL = "localhost:4200/game/";
        const random = randomWords({ exactly: 5, join: "-" });

        setFullUrl(baseURL.concat(random));
        setLocalURL("/game/".concat(random));
    };

    return (
        <div>
            <div className="input-group mb-3">
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => {
                        navigator.clipboard.writeText(fullURL);
                    }}
                >
                    Copy
                </button>
                <input type="text" className="form-control" value={fullURL} readonly />
                <button className="btn btn-outline-secondary" type="button">
                    <a style={{ textDecoration: "none" }} href={localURL}>
                        Start Game
                    </a>
                </button>
            </div>
        </div>
    );
};

export default HostGame;
