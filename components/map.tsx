"use client";
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Loading from "./ui/loading";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.437041393899676,
  lng: -4.191635586788259,
};

const GoogleMapComponent = () => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.google_api_key || ""}
      loadingElement={<Loading />}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
