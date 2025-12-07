"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MdLocationOn } from "react-icons/md";
import type { MapComponentProps } from "./MapComponent";

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";

interface MapSectionProps {
  latitude?: number;
  longitude?: number;
  desaNama?: string;
  alamat?: string;
}

// Create a separate Map component that will be dynamically imported
const MapComponent = dynamic<MapComponentProps>(
  () => import("./MapComponent"),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[500px] bg-linear-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-700">Memuat peta...</p>
        </div>
      </div>
    )
  }
);

export default function MapSection({
  latitude = 0.9629460591112564,
  longitude = 124.80253311393106,
  desaNama = "Desa Tababo Selatan",
  alamat = "Kecamatan Belang, Kabupaten Minahasa Tenggara, Provinsi Sulawesi Utara",
}: MapSectionProps) {

  return (
    <section className="py-20 bg-linear-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <MdLocationOn className="text-6xl text-green-600 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Lokasi Desa
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-green-500 to-emerald-600 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{alamat}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-2xl p-4 border border-green-100 overflow-hidden"
        >
          <div className="h-[500px] rounded-xl overflow-hidden">
            <MapComponent 
              latitude={latitude}
              longitude={longitude}
              desaNama={desaNama}
              alamat={alamat}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-linear-to-br from-green-50 to-emerald-50 p-4 rounded-xl text-center">
              <MdLocationOn className="text-3xl text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 font-medium">Koordinat</p>
              <p className="text-gray-800 font-bold">
                {latitude.toFixed(6)}°, {longitude.toFixed(6)}°
              </p>
            </div>
            <div className="bg-linear-to-br from-blue-50 to-cyan-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-600 font-medium mb-2">
                Google Maps
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-semibold text-sm underline"
              >
                Buka di Google Maps
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
