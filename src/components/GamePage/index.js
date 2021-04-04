import "../../styles/app.css";
import React, { useState, useEffect } from "react";
import Geocode from "react-geocode";
import { useSelector, useDispatch } from "react-redux";
import Timer from "./Timer";

//Local methods and data
import * as utils from "../../utils/methods";
import * as gameSlice from "./gameSlice";
import cityList from "../../utils/cityList";
import StreetViewMap from "./StreetViewMap";
import MiniMap from "./MiniMap";
import Stage from "./Stage";
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

const GamePage = () => {
    const score = useSelector(gameSlice.selectScore);
    const cityCoords = useSelector(gameSlice.selectCity);
    const markerCoords = useSelector(gameSlice.selectMarker);
    const activeRound = useSelector(gameSlice.selectActiveRound);

    const dispatch = useDispatch();

    const [currentPlace, setCurrentPlace] = useState();
    const [polyLineCoords, setPolyLineCoords] = useState();
    const [actualDistance, setActualDistance] = useState();
    const [showSubmitButton, setShowSubmitButton] = useState(true);

    useEffect(() => {
        pickNewCity();
    }, []);

    useEffect(() => {
        console.log("activeRound", activeRound);
        setShowSubmitButton(activeRound);
    }, [activeRound]);

    const pickNewCity = () => {
        const { country, city } = utils.pickRandomCity(cityList);
        console.log(country, city);
        setCurrentPlace({ country, city });
        Geocode.fromAddress(city).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;

                let randomPoint = utils.generateRandomPoint({ lat, lng }, 10000);
                dispatch(gameSlice.updateCity(randomPoint));
            },
            (error) => {
                console.error(error);
            }
        );
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

    const Score = () => {
        console.log("score", score);
        return <h1>{`Score: ${score}`}</h1>;
    };

    //Change color based on score
    let scoreColor = "green";

    return (
        <div className="container">
            <StreetViewMap />

            <div className="info-section">
                <div className="info-section__top">
                    <h1>Where are you?</h1>
                    <Timer />
                    <Stage />
                    <MiniMap polyLineCoords={polyLineCoords} />
                </div>

                <div className="info-section__bottom">
                    {showSubmitButton && (
                        <button className="btn btn-primary" onClick={handleSubmitButton}>
                            Submit
                        </button>
                    )}

                    {actualDistance
                        ? `You were ${actualDistance} miles away from ${currentPlace.city}, ${currentPlace.country}`
                        : null}
                    <Score />
                    <button className="btn btn-primary" onClick={handleNextButton}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GamePage;
