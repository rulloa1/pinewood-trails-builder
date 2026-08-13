import { createFileRoute } from "@tanstack/react-router";
import ParkMap from "@/components/ParkMap";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Map & Directions — Pinewood Trails RV Park" },
      {
        name: "description",
        content:
          "Find Pinewood Trails RV Park in Magnolia, Texas. Map, directions, and contact info.",
      },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  return <ParkMap />;
}
