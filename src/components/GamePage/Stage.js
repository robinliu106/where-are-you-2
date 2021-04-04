import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as gameSlice from "./gameSlice";

const Stage = () => {
    const stage = useSelector(gameSlice.selectStage);

    return (
        <div>
            <h1>{`Stage: ${stage}`}</h1>
        </div>
    );
};

export default Stage;
