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
import Spinner from "./Spinner";
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
//TODO add cors anywhere
const GamePage = () => {
    const score = useSelector(gameSlice.selectScore);
    const stage = useSelector(gameSlice.selectStage);

    const cityCoords = useSelector(gameSlice.selectCity);
    const markerCoords = useSelector(gameSlice.selectMarker);
    // const activeRound = useSelector(gameSlice.selectActiveRound);

    const dispatch = useDispatch();

    // const [currentPlace, setCurrentPlace] = useState();
    const [polyLineCoords, setPolyLineCoords] = useState();
    const [actualDistance, setActualDistance] = useState();
    const [showSubmitButton, setShowSubmitButton] = useState(true);
    const [nextCityCache, setNextCityCache] = useState();
    const [isLoading, setIsLoading] = useState();
    const [cityName, setCityName] = useState();

    useEffect(() => {
        pickNewCity();
    }, []);

    const pickNewCity = async () => {
        setIsLoading(true);
        //if city exists in cache, dispatch from cache
        if (nextCityCache) {
            dispatch(gameSlice.updateCity(nextCityCache));
            await getCityName(nextCityCache); //get city name from current city lat long
            console.log("next city cache exists, using", nextCityCache);
        } else {
            //else get new city
            const currentCity = await getNewCity();
            await dispatch(gameSlice.updateCity(currentCity));
            await getCityName(currentCity); //get city name from current city lat long
        }

        //load next city in cache
        const newCity = await getNewCity();
        await setNextCityCache(newCity);
        setIsLoading(false);
        console.log("next city is set", newCity);
    };

    const getNewCity = async () => {
        let randomPoint = null;
        // const city = null;
        // const country = null;
        console.log("-------------------------");
        try {
            await retry(
                async (bail) => {
                    // if anything throws, we retry\
                    const { country, city } = utils.pickRandomCity(cityList);

                    const res = await Geocode.fromAddress(`${city}, ${country}`);
                    console.log("res", res);
                    const { lat, lng } = await res.results[0].geometry.location;
                    // console.log("lat lng", lat, lng);

                    randomPoint = utils.generateRandomPoint({ lat, lng }, 100);
                    console.log("randomPoint", randomPoint);

                    //check that street view exists
                    let streetViewFetch = await fetch(
                        `https://maps.googleapis.com/maps/api/streetview/metadata?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&location=${randomPoint.lat},${randomPoint.lng}&return_error_codes=true&radius=100&source=outdoor`
                    );
                    let streetViewResponse = await streetViewFetch.json();

                    if (streetViewResponse.status !== "OK") {
                        throw "error";
                    }
                    console.log("streetViewResponse", streetViewResponse);
                },
                {
                    retries: 20,
                }
            );
        } catch (error) {
            console.log("pick new city error:", error);
        }
        // setCurrentPlace({ country, city });
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
        return <p className="lead">{`Stage ${stage}`}</p>;
    };

    const Score = () => {
        return <p className="lead">{`Score: ${score}`}</p>;
    };

    return (
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
                        className="btn btn-outline-primary"
                        onClick={handleSubmitButton}
                        disabled={!showSubmitButton}
                    >
                        Submit
                    </button>

                    <button
                        className="btn btn-outline-success"
                        id="next_button"
                        onClick={handleNextButton}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading" : "Next City"}
                        {isLoading ? <Spinner loading={true} /> : null}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GamePage;
