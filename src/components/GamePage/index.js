import "./app.css";
import React, { useState, useEffect } from "react";
import Geocode from "react-geocode";
import { useSelector, useDispatch } from "react-redux";
import retry from "async-retry";

import { useHistory, useLocation } from "react-router-dom";

//Local methods and data
import * as utils from "../../utils/methods";
import * as gameSlice from "./gameSlice";
import StreetViewMap from "./StreetViewMap";
import MiniMap from "./MiniMap";
import Spinner from "./Spinner";
import NavBar from "../NavBar";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
//TODO add cors anywhere
const GamePage = () => {
    const score = useSelector(gameSlice.selectScore);
    const stage = useSelector(gameSlice.selectStage);
    const cityCoords = useSelector(gameSlice.selectCity);
    const markerCoords = useSelector(gameSlice.selectMarker);

    const dispatch = useDispatch();

    const [polyLineCoords, setPolyLineCoords] = useState();
    const [actualDistance, setActualDistance] = useState();
    const [showSubmitButton, setShowSubmitButton] = useState(false);
    const [nextCityCache, setNextCityCache] = useState();
    const [isLoadingNext, setIsLoadingNext] = useState();
    const [cityName, setCityName] = useState();

    const location = useLocation();
    const gameId = location.pathname.replace("/game/", "");
    console.log("location", location);
    console.log("gameId", gameId);

    useEffect(() => {
        pickNewCity();
    }, []);

    const pickNewCity = async () => {
        setIsLoadingNext(true);
        //if city exists in cache, dispatch from cache
        if (nextCityCache) {
            dispatch(gameSlice.updateCity(nextCityCache));
            await getCityName(nextCityCache); //get city name from current coords
        } else {
            //else get new city
            const currentCity = await getNewCity();
            await dispatch(gameSlice.updateCity(currentCity)); //dispatch city
            setShowSubmitButton(true);
            getCityName(currentCity); //get city name from current coords
        }

        //load next city in cache
        const newCity = await getNewCity();
        await setNextCityCache(newCity);
        setIsLoadingNext(false);
        // console.log("next city is set", newCity);
    };

    const getNewCity = async () => {
        let randomPoint = null;

        try {
            //async retry will run again if it throws an error
            await retry(
                async (bail) => {
                    // const { country, city } = utils.pickRandomCity(); //capital cities
                    const { country, city } = utils.pickRandomCityTwo(); //all cities

                    const res = await Geocode.fromAddress(`${city}, ${country}`);
                    const { lat, lng } = await res.results[0].geometry.location;

                    randomPoint = utils.generateRandomPoint({ lat, lng }, 100);

                    //check that street view exists
                    let streetViewFetch = await fetch(
                        `https://maps.googleapis.com/maps/api/streetview/metadata?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&location=${randomPoint.lat},${randomPoint.lng}&return_error_codes=true&radius=100&source=outdoor`
                    );
                    let streetViewResponse = await streetViewFetch.json();

                    if (streetViewResponse.status !== "OK") {
                        throw "error";
                    }
                    // console.log("streetViewResponse", streetViewResponse);
                },
                {
                    retries: 20,
                }
            );
        } catch (error) {
            console.log("ERROR PICKING CITY:", error);
        }
        // console.log("current place", city, country);
        return randomPoint;
    };

    const getCityName = async ({ lat, lng }) => {
        try {
            const res = await Geocode.fromLatLng(lat, lng);
            const address = await res.results[0].formatted_address;
            setCityName(address);
            console.log("address is", address);
        } catch (error) {
            console.log("getCityName Error:", error);
        }
    };

    const handleSubmitButton = () => {
        if (!markerCoords) {
            console.log("marker was not placed, zero points");
            return;
        }

        setPolyLineCoords([cityCoords, markerCoords]);

        const distance = utils.calculateDistance(...Object.values(cityCoords), ...Object.values(markerCoords));

        if (distance && !utils.isNaN(distance)) {
            // console.log("actual distance", distance);

            setActualDistance(distance);
            const score = utils.calculateScore(distance);
            dispatch(gameSlice.updateScore(score));
        }
        setShowSubmitButton(false);
    };

    const handleNextButton = () => {
        dispatch(gameSlice.updateMarker(null));
        dispatch(gameSlice.updateStage());

        //reset stuff
        setPolyLineCoords(null);
        setActualDistance(null);
        setShowSubmitButton(true);

        pickNewCity();
    };

    const Stage = () => {
        return <p className="lead">{`City ${stage}`}</p>;
    };

    const Score = () => {
        return <p className="lead">{`Score: ${score}`}</p>;
    };

    return (
        <div>
            <NavBar />
            <div className="container">
                <StreetViewMap />

                <div className="info-section">
                    <div className="info-section__top">
                        <h1 className="display-4">Where are you?</h1>

                        <div className="info-box">
                            <Stage />

                            <Score />
                        </div>

                        <MiniMap polyLineCoords={polyLineCoords} cityName={cityName} actualDistance={actualDistance} />
                    </div>

                    <div className="info-section__bottom">
                        <button
                            className="btn btn-outline-primary btn-lg"
                            onClick={handleSubmitButton}
                            disabled={!showSubmitButton}
                        >
                            Submit
                        </button>

                        <button
                            className="btn btn-outline-success btn-lg"
                            id="next_button"
                            onClick={handleNextButton}
                            disabled={isLoadingNext}
                        >
                            {isLoadingNext ? "Finding Next City" : "Next City"}
                            {isLoadingNext ? <Spinner loading={true} /> : null}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamePage;
