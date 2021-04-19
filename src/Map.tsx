import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import Leaflet from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import FeaturePoint from "./FeaturePoint";
Leaflet.Icon.Default.imagePath =
  "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/";

interface IFeatureInfo {
  url: string;
  type: string;
}

interface IFeaturePointDetail {
  address?: string;
  phone_number?: string;
}

export interface IFeaturePoint {
  name: string;
  address: string;
  phoneNumber: string;
  lat: number;
  lng: number;
  details: IFeaturePointDetail;
}

const featureList: [IFeatureInfo] = [
  {
    url:
      "https://raw.githubusercontent.com/Code-for-Funabashi/Scrape-OpenData/kosodate-map/geodata/projects/kosodate-map/%E4%B8%80%E6%99%82%E4%BF%9D%E8%82%B2.json",
    type: "保育園",
  },
];

const loadFeatures = async (url: string) => {
  const res: AxiosResponse<[IFeaturePoint]> = await axios.get<[IFeaturePoint]>(
    url
  );
  console.log(res.data);
  return res.data;
};

//船橋市役所のlat lon
const position: [number, number] = [35.694722, 139.9825];

const KosodateMap = () => {
  const [features, setFeatures] = useState<IFeaturePoint[]>([]);
  useEffect(() => {
    loadFeatures(featureList[0].url).then((data) => setFeatures(data));
  });
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeaturePoint point={features} />
    </MapContainer>
  );
};

export default KosodateMap;