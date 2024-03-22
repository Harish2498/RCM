import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
// Fix the default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });
const MapComponent = ({ cities }) => {
    const position = [37.0902, -95.7129]; // Center of the USA
    return (
        <MapContainer center={position} zoom={4} style={{ height: "500px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {cities.map((city, index) => (
                <Marker key={index} position={[city.lat, city.lng]}>
                    <Popup>{city.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};
export default MapComponent;