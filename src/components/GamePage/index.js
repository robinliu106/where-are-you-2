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
import Stage from "./Stage";
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

const GamePage = () => {
    const score = useSelector(gameSlice.selectScore);
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

    // useEffect(() => {
    //     console.log("activeRound", activeRound);
    //     setShowSubmitButton(activeRound);
    // }, [activeRound]);

    // const pickNewCity = () => {
    //     const { country, city } = utils.pickRandomCity(cityList);
    //     console.log("picking new city", country, city);
    //     setCurrentPlace({ country, city });
    //     Geocode.fromAddress(city).then(
    //         (response) => {
    //             const { lat, lng } = response.results[0].geometry.location;

    //             let randomPoint = utils.generateRandomPoint({ lat, lng }, 100);
    //             dispatch(gameSlice.updateCity(randomPoint));
    //         },
    //         (error) => {
    //             console.error("geocode error", error);
    //         }
    //     );
    // };

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

    const Score = () => {
        // console.log("score", score);
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
