import { GeocodeResult } from "../types/types";
 
export async function reverseGeocode(lat: number, lng: number): Promise<GeocodeResult> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
      { headers: { "Accept-Language": "en" } }
    );
    const data = await res.json();
    const addr = data.address ?? {};
 
    const barangay =
      addr.village ??
      addr.suburb ??
      addr.neighbourhood ??
      addr.quarter ??
      null;
 
    const fullAddress = data.display_name ?? null;
 
    return { barangay, fullAddress };
  } catch {
    return { barangay: null, fullAddress: null };
  }
}
