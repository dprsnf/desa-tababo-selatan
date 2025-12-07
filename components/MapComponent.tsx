"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";

export interface MapComponentProps {
  latitude: number;
  longitude: number;
  desaNama: string;
  alamat: string;
}

function MapComponent({
  latitude,
  longitude,
  desaNama,
  alamat,
}: MapComponentProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [MapElements, setMapElements] = useState<{
    MapContainer: ComponentType<{
      center: [number, number];
      zoom: number;
      scrollWheelZoom: boolean;
      style: React.CSSProperties;
      className: string;
      children: React.ReactNode;
    }>;
    TileLayer: ComponentType<{
      attribution: string;
      url: string;
    }>;
    Marker: ComponentType<{
      position: [number, number];
      children?: React.ReactNode;
    }>;
    Popup: ComponentType<{
      children: React.ReactNode;
    }>;
  } | null>(null);

  useEffect(() => {
    // Dynamically import leaflet and react-leaflet on client side only
    const loadMap = async () => {
      if (typeof window !== "undefined") {
        const L = (await import("leaflet")).default;
        const { MapContainer, TileLayer, Marker, Popup } = await import("react-leaflet");

        // Fix leaflet marker icons
        interface LeafletIconDefault extends L.Icon.Default {
          _getIconUrl?: string;
        }
        
        delete (L.Icon.Default.prototype as LeafletIconDefault)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        });

        setMapElements({ MapContainer, TileLayer, Marker, Popup });
        setMapLoaded(true);
      }
    };

    loadMap();
  }, []);

  if (!mapLoaded || !MapElements) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-700">Memuat peta...</p>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = MapElements;

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          <div className="text-center p-2">
            <h3 className="font-bold text-green-700 mb-1">
              {desaNama}
            </h3>
            <p className="text-sm text-gray-600">{alamat}</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;
