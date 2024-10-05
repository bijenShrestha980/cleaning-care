"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function GoogleMaps() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: process.env.google_api_key as string,
        version: "weekly",
      });

      await loader.load();

      const locationInMap = {
        lat: 39.60128890889341,
        lng: -9.069839810859907,
      };

      const options: google.maps.MapOptions = {
        center: locationInMap,
        zoom: 15,
        mapId: "cleaning-care",
      };

      const map = new google.maps.Map(
        mapRef.current as HTMLDivElement,
        options
      );

      // Create a draggable marker
      const newMarker = new google.maps.Marker({
        position: locationInMap,
        map: map,
        draggable: true,
      });

      // Update marker state
      setMarker(newMarker);

      // Add drag event listener to the marker
      newMarker.addListener("dragend", (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          console.log(`New position: Latitude: ${lat}, Longitude: ${lng}`);
        }
      });

      // Add click event listener to the map
      map.addListener("click", (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          // Move the marker to the clicked location
          newMarker.setPosition(event.latLng);

          // Get latitude and longitude
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          console.log(`Clicked position: Latitude: ${lat}, Longitude: ${lng}`);
        }
      });
    };

    initializeMap();
  }, []);

  return <div ref={mapRef} style={{ height: "500px", width: "100%" }} />;
}
