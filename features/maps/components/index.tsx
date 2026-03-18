"use client"


import { MapContainer, TileLayer, GeoJSON, useMap, useMapEvents, Marker,Popup } from "react-leaflet"
import {LatLngExpression, LatLngTuple } from "leaflet"
import L from 'leaflet';
import "leaflet/dist/leaflet.css"
import { useState, useEffect } from "react";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapProps {
    posix?: LatLngExpression | LatLngTuple,
    zoom?: number,
    onLocationSelect?: (lat: number, lng: number) => void;
}

const defaults = {
    zoom: 15
}

const baybayBounds: L.LatLngBoundsExpression = [
  [10.550208919, 124.6507136151],
  [10.8418543732, 124.9318015009]
];

function FitBounds({ data }: { data: GeoJSON.FeatureCollection }) {
  const map = useMap();
  useEffect(() => {
    if (!data) return;
    const layer = L.geoJSON(data);
    const bounds = layer.getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [20, 20], maxZoom: 13 });
      map.setMinZoom(13);
    }
  }, [data, map]);
  return null;
}

function LocationPicker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  const [marker, setMarker] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarker([lat, lng]);
      onLocationSelect(lat, lng);
    },
  });

  return marker ? (
    <Marker position={marker}>
      <Popup>
        {marker[0].toFixed(6)}, {marker[1].toFixed(6)}
      </Popup>
    </Marker>
  ) : null;
}


export default function BaybayMaps({ posix = [10.6769, 124.8006], zoom = defaults.zoom, onLocationSelect }: MapProps) {
    const [boundary, setBoundary] = useState<GeoJSON.FeatureCollection | null>(null);

    useEffect(() => {
        fetch('https://nominatim.openstreetmap.org/lookup?osm_type=R&osm_ids=5426219&format=geojson&polygon_geojson=1')
            .then(res => res.json())
            .then(data => {
                const feature = data.features[0];
                if (feature?.geometry?.type === 'Point') {
                    console.warn('Got a point instead of polygon — boundary may not render correctly');
                    return;
                }
                setBoundary(data);
            })
    }, [])

    return (
        <MapContainer
            center={posix}
            zoom={zoom}
            style={{ height: '100%', width: '100%' }}
            maxBounds={baybayBounds}
            maxBoundsViscosity={1.0}
            minZoom={14}
            maxZoom={18}
            zoomSnap={0.5}
            wheelDebounceTime={40}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                bounds={baybayBounds}
            />
            {onLocationSelect && <LocationPicker onLocationSelect={onLocationSelect} />}
            {boundary && (
                <>
                    <GeoJSON
                        data={boundary}
                        style={{
                            color: '#2563eb',
                            weight: 2,
                            fillColor: '#93c5fd',
                            fillOpacity: 0.3,
                        }}
                    />
                    <FitBounds data={boundary} />
                </>
            )}
        </MapContainer>
    )
}