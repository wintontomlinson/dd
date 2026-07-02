import { useEffect, useRef, useState } from "react";

export type Place = {
  id: string;
  name: string;
  detail: string;
  lat: number;
  lng: number;
  estate?: boolean;
};

export const DHANAULTI_PLACES: Place[] = [
  { id: "estate", name: "Aranya Grande", detail: "Dhanaulti, Uttarakhand", lat: 30.4257, lng: 78.2437, estate: true },
  { id: "mussoorie", name: "Mussoorie", detail: "≈ 1 hr · 28 km", lat: 30.4599, lng: 78.0664 },
  { id: "dehradun", name: "Dehradun", detail: "≈ 1.5 hr · 55 km", lat: 30.3165, lng: 78.0322 },
  { id: "airport", name: "Jolly Grant Airport", detail: "≈ 1.5 hr · 60 km", lat: 30.1897, lng: 78.1803 },
  { id: "delhi", name: "New Delhi", detail: "≈ 6 hr · 300 km", lat: 28.6139, lng: 77.209 },
];

/** Client-only Leaflet map with styled markers and hotspot syncing. */
export function LocationMap({ places = DHANAULTI_PLACES }: { places?: Place[] }) {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const markersRef = useRef<Record<string, import("leaflet").Marker>>({});
  const [active, setActive] = useState<string>("estate");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !mapEl.current || mapRef.current) return;

      const estate = places.find((p) => p.estate) ?? places[0];
      const map = L.map(mapEl.current, {
        center: [estate.lat, estate.lng],
        zoom: 9,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });
      mapRef.current = map;

      // Muted, dark cartography for a luxury feel
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
        },
      ).addTo(map);

      // Route lines from the estate to each destination
      places
        .filter((p) => !p.estate)
        .forEach((p) => {
          L.polyline(
            [
              [estate.lat, estate.lng],
              [p.lat, p.lng],
            ],
            { color: "#C7A36A", weight: 1, opacity: 0.5, dashArray: "4 6" },
          ).addTo(map);
        });

      places.forEach((p) => {
        const icon = L.divIcon({
          className: "",
          html: `<span class="est-marker ${p.estate ? "est-marker--estate" : ""}" data-id="${p.id}"></span>`,
          iconSize: [p.estate ? 20 : 14, p.estate ? 20 : 14],
          iconAnchor: [p.estate ? 10 : 7, p.estate ? 10 : 7],
        });
        const marker = L.marker([p.lat, p.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<strong>${p.name}</strong><br/><span style="opacity:.7">${p.detail}</span>`,
          )
          .on("click", () => setActive(p.id));
        markersRef.current[p.id] = marker;
      });

      map.fitBounds(
        places.map((p) => [p.lat, p.lng]) as [number, number][],
        { padding: [50, 50] },
      );
      setReady(true);
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, [places]);

  // Sync active hotspot -> map marker highlight + gentle pan
  useEffect(() => {
    if (!ready) return;
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const el = marker.getElement()?.querySelector(".est-marker");
      el?.classList.toggle("est-marker--active", id === active);
    });
    const marker = markersRef.current[active];
    const map = mapRef.current;
    if (marker && map) {
      map.panTo(marker.getLatLng(), { animate: true, duration: 0.6 });
      marker.openPopup();
    }
  }, [active, ready]);

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
      <ul className="flex flex-col divide-y divide-border">
        {places.map((p) => (
          <li key={p.id}>
            <button
              onMouseEnter={() => setActive(p.id)}
              onFocus={() => setActive(p.id)}
              onClick={() => setActive(p.id)}
              className={`flex w-full items-baseline justify-between gap-4 py-5 text-left transition-colors ${
                active === p.id ? "text-gold" : "text-foreground hover:text-foreground/70"
              }`}
            >
              <span className="font-display text-2xl">{p.name}</span>
              <span className="text-sm text-muted-foreground">{p.detail}</span>
            </button>
          </li>
        ))}
      </ul>
      <div
        ref={mapEl}
        className="min-h-[420px] w-full overflow-hidden rounded-sm border border-border md:min-h-[520px]"
        aria-label="Map of Aranya Grande and nearby destinations"
      />
    </div>
  );
}