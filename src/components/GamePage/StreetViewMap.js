import React, { useEffect, useState } from "react";
import { StreetViewPanorama, GoogleMap, LoadScript } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import * as gameSlice from "./gameSlice";

const bigContainerStyle = {
    height: "100vh",
    width: "70vw",
};

const StreetViewMap = () => {
    const cityCoords = useSelector(gameSlice.selectCity);

    return (
        <div className="street-view-map">
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={bigContainerStyle}
                    zoom={7}
                    initialCenter={{
                        lat: parseFloat(42.3517071),
                        lng: parseFloat(-71.0691937),
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
    );
};

export default StreetViewMap;
