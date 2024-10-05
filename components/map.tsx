"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function GoogleMaps({
  width,
  height,
  value,
  onChange,
}: {
  width?: string;
  height?: string;
  value?: { lat: number; lng: number };
  onChange?: (coords: { lat: number; lng: number }) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>();

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: process.env.google_api_key as string,
        version: "weekly",
      });

      await loader.load();

      const locationInMap = value || {
        lat: 43.734952570403,
        lng: -79.39714192370195,
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
          // Get latitude and longitude
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          setCoords({ lat, lng });
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
          setCoords({ lat, lng });
        }
      });
    };

    initializeMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (coords && onChange) {
      onChange(coords);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords]);

  return (
    <div
      ref={mapRef}
      style={{
        height: `${height ? `${height}px` : "400px"}`,
        width: `${width ? `${width}px` : "100%"}`,
      }}
    />
  );
}
