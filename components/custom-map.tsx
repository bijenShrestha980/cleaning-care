"use client";
// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import { useRef } from "react";
// import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";

// const CustomMap = ({ className }: { className?: string }) => {
//   const mapRef = useRef(null);
//   const latitude = 51.505;
//   const longitude = -0.09;
//   return (
//     <MapContainer
//       center={[latitude, longitude]}
//       zoom={13}
//       ref={mapRef}
//       className={cn("w-full h-full", className)}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={[latitude, longitude]} />
//     </MapContainer>
//   );
// };
const CustomMap = ({ className }: { className?: string }) => {
  return <div className={cn("w-full h-full", className)}></div>;
};

export default CustomMap;
