'use client'

import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const LAT = 38.7097
const LNG = -9.1403

const venueIcon = L.divIcon({
  className: '',
  html: `<div class="venue-marker"><span class="venue-marker-ring"></span><span class="venue-marker-core"></span></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

interface Props {
  height?: string
}

export default function VenueMapInner({ height = '400px' }: Props) {
  return (
    <MapContainer
      center={[LAT, LNG]}
      zoom={16}
      scrollWheelZoom={false}
      zoomControl={false}
      className="venue-leaflet"
      style={{ height, width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={20}
      />
      <Marker position={[LAT, LNG]} icon={venueIcon} />
    </MapContainer>
  )
}
