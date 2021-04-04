import "../../styles/app.css";
import React, { useState, useEffect } from "react";
import Geocode from "react-geocode";
import { useSelector, useDispatch } from "react-redux";
import retry from "async-retry";
import * as nodeutil from "util";
import Timer from "./Timer";

//Local methods and data
import * as utils from "../../utils/methods";
import * as gameSlice from "./gameSlice";
import cityList from "../../utils/cityList";
import StreetViewMap from "./StreetViewMap";
import MiniMap from "./MiniMap";
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

const GamePage = () => {
    const score = useSelector(gameSlice.selectScore);
    const stage = useSelector(gameSlice.selectStage);

    const cityCoords = useSelector(gameSlice.selectCity);
    const markerCoords = useSelector(gameSlice.selectMarker);
    // const activeRound = useSelector(gameSlice.selectActiveRound);

    const dispatch = useDispatch();

    const [currentPlace, setCurrentPlace] = useState();
    const [polyLineCoords, setPolyLineCoords] = useState();
    const [actualDistance, setActualDistance] = useState();
    const [showSubmitButton, setShowSubmitButton] = useState(true);

    useEffect(() => {
        pickNewCity();
    }, []);

    const pickNewCity = async () => {
        let randomPoint = null;
        console.log("-------------------------");

        try {
            // await retry(
            //     async (bail) => {
            // if anything throws, we retry\
            let { country, city } = utils.pickRandomCity(cityList);
            setCurrentPlace({ country, city });
            console.log("current place", city, country);
            const res = await Geocode.fromAddress(`${city}, ${country}`);
            console.log("res", res);
            const { lat, lng } = await res.results[0].geometry.location;
            // console.log("lat lng", lat, lng);

            randomPoint = utils.generateRandomPoint({ lat, lng }, 100);
            console.log("randomPoint", randomPoint);
            //check that randomPoint streetview is valid

            // let streetViewResponse = await fetch(
            //     `https://maps.googleapis.com/maps/api/streetview/metadata?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&location=${randomPoint.lat},${randomPoint.lng}&return_error_codes=true&radius=100&source=outdoor`
            // );

            //     console.log("content", streetViewResponse.headers.get("content-length"));
            //     console.log("street view", streetViewResponse);

            //     let testResponse = await fetch(
            //         "https://maps.googleapis.com/maps/api/streetview/metadata?size=600x300&location=78.648401,14.194336&fov=90&heading=235&pitch=10&key=AIzaSyDF77ug307u0njuNLmqXfWs5EJfW2r4HcA"
            //     );

            //     console.log("test", testResponse);
            //     },
            //     {
            //         retries: 20,
            //     }
            // );
        } catch (error) {
            console.log("pick new city error:", error);
        }

        dispatch(gameSlice.updateCity(randomPoint));

        console.log("picked new city");
    };

    const handleSubmitButton = () => {
        if (!markerCoords) {
            console.log("marker was not placed, zero points");
            return;
        }

        setPolyLineCoords([cityCoords, markerCoords]);

        const distance = utils.calculateDistance(...Object.values(cityCoords), ...Object.values(markerCoords));

        if (distance && !utils.isNaN(distance)) {
            console.log("actual distance", distance);

            setActualDistance(distance);
            calculateScore(distance);
        }
        setShowSubmitButton(false);
    };

    const handleNextButton = () => {
        dispatch(gameSlice.updateMarker(null));
        setPolyLineCoords(null);
        setActualDistance(null);
        setShowSubmitButton(true);

        pickNewCity();
        dispatch(gameSlice.updateStage());
    };

    const calculateScore = (distance) => {
        let finalScore = 0;

        if (distance < 10) {
            finalScore += 1000;
        } else if (distance < 50) {
            finalScore += 500;
        } else if (distance < 200) {
            finalScore += 400;
        } else if (distance < 1000) {
            finalScore += 300;
        } else if (distance < 5000) {
            finalScore += 200;
        } else if (distance < 10000) {
            finalScore += 100;
        }

        dispatch(gameSlice.updateScore(finalScore));
    };

    const Stage = () => {
        return <p class="lead">{`Stage ${stage}`}</p>;
    };

    const Score = () => {
        return <p class="lead">{`Score: ${score}`}</p>;
    };

    return (
        <div className="container">
            <StreetViewMap />

            <div className="info-section">
                <div className="info-section__top">
                    <h1 className="display-2">Where are you?</h1>

                    <div className="info-box">
                        <Stage />

                        <Score />
                    </div>

                    <MiniMap
                        polyLineCoords={polyLineCoords}
                        currentPlace={currentPlace}
                        actualDistance={actualDistance}
                    />
                </div>

                <div className="info-section__bottom">
                    <button
                        className="btn btn-outline-primary"
                        onClick={handleSubmitButton}
                        disabled={!showSubmitButton}
                    >
                        Submit
                    </button>

                    <button className="btn btn-outline-success" id="next_button" onClick={handleNextButton}>
                        Next City
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GamePage;
// {actualDistance ? (
//     <p class="lead" id="answer">
//         {`Distance to: ${currentPlace.city}, ${currentPlace.country} is ${actualDistance} miles`}
//     </p>
// ) : null}
