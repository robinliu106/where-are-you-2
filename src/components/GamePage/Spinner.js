import { useState } from "react";
import { css } from "@emotion/react";
import BarLoader from "react-spinners/BarLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const Spinner = ({ loading }) => {
    let color = "#008000";

    return (
        <div className="sweet-loading">
            <BarLoader color={color} loading={true} css={override} size={150} />
        </div>
    );
};

export default Spinner;
