import { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import sitesData from "@/data/park-sites.json";

type Site = { id: number; name: string; row: number; status: string; lat: number; lon: number; description?: string };
const sites = sitesData as Site[];

const ROWS = [100, 200, 300, 400, 500, 600, 700] as const;

export default function ParkMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const layerRef = useRef<unknown>(null);
  const LRef = useRef<unknown>(null);

  const [active, setActive] = useState<Set<number>>(() => new Set(ROWS));
  const [ready, setReady] = useState(false);

  const counts = useMemo(() => {
    const c: Record<number, number> = {};
    for (const s of sites) c[s.row] = (c[s.row] ?? 0) + 1;
    return c;
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;
      LRef.current = L;

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
        { maxZoom: 21, attribution: "Tiles © Esri" }
      ).addTo(map);

      layerRef.current = L.layerGroup().addTo(map);
      setReady(true);
    })();

    return () => {
      cancelled = true;
      const m = mapRef.current as { remove?: () => void } | null;
      if (m && typeof m.remove === "function") m.remove();
      mapRef.current = null;
      layerRef.current = null;
      setReady(false);
    };
  }, []);

  // Re-render markers when active rows change
  useEffect(() => {
    const L = LRef.current as typeof import("leaflet") | null;
    const layer = layerRef.current as { clearLayers: () => void; addLayer: (l: unknown) => void } | null;
    if (!L || !layer) return;
    layer.clearLayers();

    sites
      .filter((s) => active.has(s.row))
      .forEach((s) => {
        const label = s.name.replace(/^#/, "");
        const icon = L.divIcon({
          className: "pt-site-marker",
          html: `<div class="pt-pin pt-row-${s.row}"><span>${label}</span></div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
        const popup = `
          <div style="min-width:200px;font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.4">
            <div style="font-weight:700;font-size:14px;color:#1b4332;margin-bottom:2px">Site ${label}</div>
            <div style="font-size:11px;color:#6b7280;margin-bottom:6px">Row ${s.row} · ${s.status}</div>
            ${s.description ? `<div style="font-size:12px;color:#374151">${s.description}</div>` : ""}
          </div>`;
        const m = L.marker([s.lat, s.lon], { icon }).bindPopup(popup, { maxWidth: 240 });
        layer.addLayer(m);
      });
  }, [active, ready]);

  const toggle = (row: number) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(row)) next.delete(row);
      else next.add(row);
      return next;
    });
  };
  const allOn = active.size === ROWS.length;
  const setAll = () => setActive(allOn ? new Set() : new Set(ROWS));

  return (
    <>
      <style>{`
        .pt-site-marker { background: transparent; border: none; }
        .pt-pin {
          width: 28px; height: 28px; border-radius: 9999px;
          color: #fff; display: flex; align-items: center; justify-content: center;
          font: 600 11px/1 ui-sans-serif, system-ui, sans-serif;
          box-shadow: 0 1px 3px rgba(0,0,0,.5), 0 0 0 2px #fff;
        }
        .pt-row-100 { background: #b8533a; }
        .pt-row-200 { background: #d97742; }
        .pt-row-300 { background: #c9a84c; }
        .pt-row-400 { background: #6b8e4e; }
        .pt-row-500 { background: #2d6a4f; }
        .pt-row-600 { background: #1d4e6b; }
        .pt-row-700 { background: #553b78; }
      `}</style>
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-card px-3 py-3">
        <button
          onClick={setAll}
          className={`rounded-md px-3 py-1.5 text-sm font-display transition ${
            allOn ? "bg-[#1b4332] text-white" : "bg-muted text-foreground hover:bg-muted/70"
          }`}
        >
          All
        </button>
        {ROWS.map((row) => {
          const on = active.has(row);
          return (
            <button
              key={row}
              onClick={() => toggle(row)}
              className={`rounded-md px-3 py-1.5 text-sm font-display transition ${
                on ? "bg-[#1b4332] text-white" : "bg-muted text-foreground hover:bg-muted/70"
              }`}
              aria-pressed={on}
            >
              {row}s <span className="opacity-70">({counts[row] ?? 0})</span>
            </button>
          );
        })}
      </div>
      <div ref={containerRef} className="h-[560px] w-full" />
    </>
  );
}
