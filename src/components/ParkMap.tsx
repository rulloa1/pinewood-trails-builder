import { useEffect, useRef } from "react";
import sites from "@/data/park-sites.json";

export default function ParkMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");
      if (cancelled || !containerRef.current || mapRef.current) return;

      const lats = sites.map((s) => s.lat);
      const lons = sites.map((s) => s.lon);
      const bounds: [[number, number], [number, number]] = [
        [Math.min(...lats), Math.min(...lons)],
        [Math.max(...lats), Math.max(...lons)],
      ];

      const map = L.map(containerRef.current, { scrollWheelZoom: false }).fitBounds(bounds, { padding: [30, 30] });
      mapRef.current = map;

      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 21,
          attribution: "Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics",
        }
      ).addTo(map);

      sites.forEach((s) => {
        const label = s.name.startsWith("#") ? s.name.slice(1) : String(s.id);
        const icon = L.divIcon({
          className: "pt-site-marker",
          html: `<div class="pt-pin"><span>${label}</span></div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
        L.marker([s.lat, s.lon], { icon })
          .addTo(map)
          .bindPopup(`<strong>Site ${label}</strong>`);
      });
    })();

    return () => {
      cancelled = true;
      const m = mapRef.current as { remove?: () => void } | null;
      if (m && typeof m.remove === "function") m.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      <style>{`
        .pt-site-marker { background: transparent; border: none; }
        .pt-pin {
          width: 28px; height: 28px; border-radius: 9999px;
          background: #b8533a;
          color: #fff; display: flex; align-items: center; justify-content: center;
          font: 600 11px/1 ui-sans-serif, system-ui, sans-serif;
          box-shadow: 0 1px 3px rgba(0,0,0,.5), 0 0 0 2px #fff;
        }
        .pt-pin span { transform: translateY(0); }
      `}</style>
      <div ref={containerRef} className="h-[560px] w-full" />
    </>
  );
}
