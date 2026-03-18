import { useState } from "react";
import { reverseGeocode } from "../lib/map-actions";
import { LocationInfo, UseMapOverlayReturn, UseMapOverlayOptions } from "../types/types";

export function useMapOverlay({ onConfirm, onClose }: UseMapOverlayOptions): UseMapOverlayReturn {
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [geocoding, setGeocoding] = useState(false);

  async function handleLocationSelect(lat: number, lng: number) {
    setGeocoding(true);
    const { barangay, fullAddress } = await reverseGeocode(lat, lng);
    setLocation({ lat, lng, barangay, fullAddress });
    setGeocoding(false);
  }

  function handleConfirm() {
    if (!location) return;

    onConfirm({   
      geolocation: {
        latitude: location.lat,
        longitude: location.lng,
      },
      address: location.fullAddress ?? `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`,
    });

    onClose();
  }

  return { location, geocoding, handleLocationSelect, handleConfirm };
}