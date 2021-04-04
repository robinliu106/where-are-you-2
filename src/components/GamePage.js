import "../styles/app.css";
import React, { useState, useEffect } from "react";
import { StreetViewPanorama, GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import Geocode from "react-geocode";

//Local methods and data
import * as utils from "../utils/methods";
import cityList from "../utils/cityList";
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

const bigContainerStyle = {
    height: "80vh",
    width: "80vw",
};
const smallContainerStyle = {
    height: "50vh",
    width: "40vw",
};
const GamePage = () => {
    const [mapRef, setMapRef] = useState(null);
    const [cityCoords, setCityCoords] = useState();
    const [markerCoords, setMarkerCoords] = useState();
    const [polyLineCoords, setPolyLineCoords] = useState();
    const [actualDistance, setActualDistance] = useState();
    const [mapCenter, setMapCenter] = useState({
        lat: 42.3517071,
        lng: -71.0691937,
    });
    const [score, setScore] = useState();

    useEffect(() => {
        generateCityCoords();
    }, []);

    const generateCityCoords = () => {
        const randomCity = utils.pickRandomCity(cityList);
        console.log("randomCity", randomCity);
        Geocode.fromAddress(randomCity).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;

                let randomPoint = utils.generateRandomPoint({ lat, lng }, 100);
                setCityCoords(randomPoint);
            },
            (error) => {
                console.error(error);
            }
        );
    };

    const handleMarkerCoords = (e) => {
        const { lat, lng } = e.latLng.toJSON();
        setMarkerCoords({ lat, lng });
    };

    const handleButton = () => {
        if (!markerCoords) {
            console.log("marker was not placed, zero points");
            return;
        }

        setPolyLineCoords([cityCoords, markerCoords]);

        const distance = utils.calculateDistance(...Object.values(cityCoords), ...Object.values(markerCoords));
        setActualDistance(distance);
    };

    const calculateScore = () => {
        setScore();
    };

    //Change color based on score
    let scoreColor = "green";

    return (
        <div className="container">
            <div className="street-view-map">
                <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={bigContainerStyle}
                        zoom={7}
                        initialCenter={{
                            lat: 42.3517071,
                            lng: -71.0691937,
                        }}
                    >
                        <StreetViewPanorama
                            position={cityCoords}
                            visible={true}
                            options={{
                                disableDefaultUI: true,
                                enableCloseButton: false,
                            }}
                        />
                    </GoogleMap>
                </LoadScript>
            </div>

            <div className="info-section">
                <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                        onLoad={(map) => setMapRef(map)}
                        mapContainerStyle={smallContainerStyle}
                        zoom={1}
                        center={mapCenter}
                        onDragEnd={() => {
                            if (mapRef) {
                                let { lat, lng } = mapRef.getCenter().toJSON();
                                setMapCenter({ lat, lng });
                            }
                        }}
                        onClick={(e) => handleMarkerCoords(e)}
                    >
                        {markerCoords ? (
                            <Marker draggable={true} position={markerCoords} onDragEnd={(e) => handleMarkerCoords(e)} />
                        ) : null}

                        {polyLineCoords ? <Polyline path={polyLineCoords} /> : null}
                    </GoogleMap>
                </LoadScript>

                <button className="btn btn-primary" onClick={handleButton}>
                    Submit
                </button>
                {actualDistance ? `You were ${actualDistance} miles off` : null}
            </div>
        </div>
    );
};

export default GamePage;
