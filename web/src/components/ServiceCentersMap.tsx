"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";

export function ServiceCentersMap() {
  const [city, setCity] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [centersAll, setCentersAll] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch('/api/service-centers')
      .then(r => r.json())
      .then((items) => setCentersAll(items))
      .finally(() => setLoading(false));
  }, []);

  const centers = useMemo(() => {
    return centersAll.filter((c) => (city ? c.city === city : true)).filter((c) => (service ? (c.services ?? '').split(',').includes(service) : true));
  }, [centersAll, city, service]);

  const cities = Array.from(new Set(centersAll.map((c) => c.city)));
  const services = Array.from(new Set(centersAll.flatMap((c) => String(c.services ?? '').split(',').filter(Boolean))));

  const center = centers[0] ?? centersAll[0] ?? { lat: 55.75, lng: 37.62 };

  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-3">
        <select value={city} onChange={(e) => setCity(e.target.value)} className="rounded-md border px-3 py-2 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100">
          <option value="">Все города</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={service} onChange={(e) => setService(e.target.value)} className="rounded-md border px-3 py-2 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100">
          <option value="">Все услуги</option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      {loading && (
        <div className="grid gap-3 md:grid-cols-3">
          <div className="h-10 skeleton" />
          <div className="h-10 skeleton" />
          <div className="hidden md:block" />
        </div>
      )}
      <MapContainer center={[center.lat, center.lng]} zoom={5} scrollWheelZoom={false} style={{ height: 420, width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {centers.map((c) => (
          <Marker key={c.id} position={[c.lat, c.lng]}>
            <Popup>
              <div className="font-medium text-zinc-900">{c.name}</div>
              <div className="text-sm text-zinc-700">{c.address}</div>
              <div className="text-sm text-zinc-600">{c.phone}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}


