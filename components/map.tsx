"use client";
import ReactMapboxGl, {
  Layer,
  Feature,
  ZoomControl,
  ScaleControl,
  Marker,
} from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { user_1 } from "@/constants/images";
import Image from "next/image";

const Map = ReactMapboxGl({
  accessToken: process.env.map || "",
});

const CustomMap = ({ width = "100vw", height = "100vh" }) => {
  return (
    <Map
      style="mapbox://styles/bijen/cl4887nzz003u15p1s53vhbhy"
      containerStyle={{
        height,
        width,
      }}
      center={[85.352, 27.721]}
      zoom={[13]}
    >
      <Layer type="symbol" id="marker" layout={{ "icon-image": "harbor-15" }}>
        <Feature coordinates={[85.352, 27.721]} />
      </Layer>
      <Marker coordinates={[-0.2416815, 51.5285582]} anchor="bottom">
        <Image src={user_1} alt="user" width={32} height={32} />
      </Marker>
      <ZoomControl />

      <ScaleControl />
    </Map>
  );
};

export default CustomMap;
