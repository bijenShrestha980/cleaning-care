"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Input } from "./ui/input";

interface GoogleMapsProps {
  width?: string;
  height?: string;
  value?: { lat: number; lng: number };
  onChange?: (coords: { lat: number; lng: number }) => void;
}

export default function GoogleMaps({
  width = "100%",
  height = "400px",
  value,
  onChange,
}: GoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  const initializeMap = async () => {
    try {
      const loader = new Loader({
        apiKey: process.env.google_api_key as string,
        libraries: ["places"], // Required for the search bar
        version: "weekly",
      });

      await loader.load();

      const defaultLocation = value || { lat: 43.73495, lng: -79.39714 };

      const options: google.maps.MapOptions = {
        center: defaultLocation,
        zoom: 15,
        mapId: "cleaning-care",
      };

      const mapInstance = new google.maps.Map(
        mapRef.current as HTMLDivElement,
        options
      );
      setMap(mapInstance);

      // Initialize marker
      const newMarker = new google.maps.Marker({
        position: defaultLocation,
        map: mapInstance,
        draggable: true,
      });
      setMarker(newMarker);

      // Add marker dragend event
      newMarker.addListener("dragend", (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          updateCoords(event.latLng.lat(), event.latLng.lng());
        }
      });

      // Add map click event
      mapInstance.addListener("click", (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          newMarker.setPosition(event.latLng);
          updateCoords(event.latLng.lat(), event.latLng.lng());
        }
      });

      // Initialize Autocomplete
      if (searchRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(
          searchRef.current,
          {
            fields: ["geometry"],
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place.geometry && place.geometry.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            mapInstance.setCenter({ lat, lng });
            newMarker.setPosition({ lat, lng });
            updateCoords(lat, lng);
          }
        });
      }
    } catch (error) {
      console.error("Failed to initialize Google Maps:", error);
    }
  };

  const updateCoords = (lat: number, lng: number) => {
    if (onChange) onChange({ lat, lng });
  };

  useEffect(() => {
    initializeMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (value && map && marker) {
      marker.setPosition(value);
      map.setCenter(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="relative h-full">
      {/* Search Input */}
      <Input
        ref={searchRef}
        type="text"
        placeholder="Search"
        className="mb-4 bg-white absolute -bottom-3 left-1 w-24 sm:w-52 h-10 z-10"
      />
      {/* Map Container */}
      <div
        ref={mapRef}
        style={{
          height: height,
          width: width,
        }}
      />
    </div>
  );
}
