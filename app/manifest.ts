import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Project Aragorn",
    short_name: "Aragorn",
    description: "Project Aragorn video streaming platform",
    start_url: "/",
    display: "standalone",
    orientation: "landscape"
  }
}