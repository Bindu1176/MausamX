import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Location } from '../../types';

// ─── Fix default Leaflet marker icon (Vite asset path issue) ───────────────
// Leaflet's default icons rely on webpack-resolved URLs; we override them.
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ─── Custom MausamX marker icon ────────────────────────────────────────────
const mausamxIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width: 36px;
      height: 36px;
      background: #0284C7;
      border: 3px solid #FFFFFF;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 4px 14px rgba(2,132,199,0.5), 0 2px 6px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        transform: rotate(45deg);
        font-size: 14px;
        line-height: 1;
      ">📍</div>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -38],
});

// ─── Inner component to reactively move the map when location changes ──────
function MapUpdater({ lat, lng, zoom }: { lat: number; lng: number; zoom: number }) {
  const map = useMap();
  const prevLatLng = useRef<[number, number] | null>(null);

  useEffect(() => {
    const newLatLng: [number, number] = [lat, lng];
    if (
      prevLatLng.current === null ||
      prevLatLng.current[0] !== lat ||
      prevLatLng.current[1] !== lng
    ) {
      map.flyTo(newLatLng, zoom, { duration: 1.2, easeLinearity: 0.25 });
      prevLatLng.current = newLatLng;
    }
  }, [lat, lng, zoom, map]);

  return null;
}

// ─── Zoom level helper ─────────────────────────────────────────────────────
function getZoomForLocationType(type: Location['type']): number {
  switch (type) {
    case 'state':    return 7;
    case 'district': return 10;
    case 'block':    return 12;
    case 'panchayat':return 13;
    default:         return 12;
  }
}

// ─── Props ─────────────────────────────────────────────────────────────────
interface LocationMapProps {
  location: Location;
  height?: number;
}

// ─── Main component ────────────────────────────────────────────────────────
export default function LocationMap({ location, height = 200 }: LocationMapProps) {
  const zoom = getZoomForLocationType(location.type);
  const center: [number, number] = [location.lat, location.lng];

  if (!location.lat || !location.lng) {
    return (
      <div style={{
        height, borderRadius: '14px',
        background: 'var(--card-elevated)', border: '1px solid var(--border-theme)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600, gap: '6px',
      }}>
        <span style={{ fontSize: '24px' }}>📍</span>
        <span>Location coordinates unavailable</span>
      </div>
    );
  }

  return (
    <div style={{
      height,
      borderRadius: '14px',
      overflow: 'hidden',
      border: '1px solid var(--border-theme)',
      position: 'relative',
    }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={false}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" style="font-size:10px">OpenStreetMap</a> contributors'
          maxZoom={19}
        />

        <Marker position={center} icon={mausamxIcon}>
          <Popup closeButton={false} className="mausamx-popup">
            <div style={{
              fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
              padding: '4px 2px',
              minWidth: '140px',
            }}>
              <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-primary)', marginBottom: '2px' }}>
                {location.name}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
              </div>
              <div style={{
                marginTop: '6px', padding: '4px 8px',
                background: 'var(--primary-hover)', borderRadius: '6px',
                fontSize: '11px', fontWeight: 700, color: 'var(--primary)',
                display: 'inline-block',
              }}>
                Monsoon Onset: {location.onsetProbability}% likely
              </div>
            </div>
          </Popup>
        </Marker>

        {/* Reactively fly to new location on selection change */}
        <MapUpdater lat={location.lat} lng={location.lng} zoom={zoom} />
      </MapContainer>

      {/* Leaflet popup custom styles via portal injection */}
      <style>{`
        .mausamx-popup .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15) !important;
          border: 1px solid var(--border-theme);
          padding: 0;
        }
        .mausamx-popup .leaflet-popup-content {
          margin: 10px 14px !important;
        }
        .mausamx-popup .leaflet-popup-tip-container {
          display: none;
        }
        .leaflet-control-zoom {
          border: 1px solid var(--border-theme) !important;
          border-radius: 10px !important;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08) !important;
        }
        .leaflet-control-zoom-in,
        .leaflet-control-zoom-out {
          font-size: 16px !important;
          color: #475569 !important;
          background: #FFFFFF !important;
          border: none !important;
          line-height: 30px !important;
          width: 30px !important;
          height: 30px !important;
        }
        .leaflet-control-zoom-in:hover,
        .leaflet-control-zoom-out:hover {
          background: #F1F5F9 !important;
          color: #0284C7 !important;
        }
        .leaflet-control-attribution {
          font-size: 10px !important;
          background: rgba(255,255,255,0.8) !important;
          padding: 1px 6px !important;
        }
        .leaflet-bottom.leaflet-right {
          bottom: 2px !important;
          right: 2px !important;
        }
        .leaflet-top.leaflet-left {
          top: 6px !important;
          left: 6px !important;
        }
      `}</style>
    </div>
  );
}
