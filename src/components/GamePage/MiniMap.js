import React, { useState, useEffect } from "react";

import { GoogleMap, InfoWindow, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";

import * as gameSlice from "./gameSlice";

const smallContainerStyle = {
    height: "50vh",
    width: "30vw",
};

const MiniMap = ({ polyLineCoords, currentPlace, actualDistance }) => {
    //LOCAL STATE
    const [mapRef, setMapRef] = useState(null);
    const [mapCenter, setMapCenter] = useState({
        lat: 42.3517071,
        lng: -71.0691937,
    });

    //REDUX
    const cityCoords = useSelector(gameSlice.selectCity);
    const markerCoords = useSelector(gameSlice.selectMarker);
    const dispatch = useDispatch();

    const handleMarkerCoords = (e) => {
        const { lat, lng } = e.latLng.toJSON();
        // setMarkerCoords({ lat, lng });
        dispatch(gameSlice.updateMarker({ lat, lng }));
    };

    return (
        <div>
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

                    {polyLineCoords ? (
                        <InfoWindow position={cityCoords}>
                            <div>{`Distance to: ${currentPlace.city}, ${currentPlace.country} is ${actualDistance} miles`}</div>
                        </InfoWindow>
                    ) : null}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default MiniMap;
