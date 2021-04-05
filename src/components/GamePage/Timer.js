import React from "react";
import { useTimer } from "react-timer-hook";
import { useSelector, useDispatch } from "react-redux";

const MyTimer = ({ expiryTimestamp }) => {
    const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
        expiryTimestamp,
        onExpire: () => {
            console.warn("onExpire called");
        },
    });

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "100px" }}>
                <span>{minutes}</span>:<span>{seconds}</span>
            </div>
        </div>
    );
};

const App = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 90);
    return (
        <div>
            <MyTimer expiryTimestamp={time} />
        </div>
    );
};

export default App;
