import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './App.css'
import 'leaflet/dist/leaflet.css'

//船橋市のlat lon
const position:[number, number] = [35.694722, 139.9825]
const App = () => {
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100vh' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}
export default App
