import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Family App",
    short_name: "Family",
    description: "Our family organizer",
    start_url: "/",
    display: "standalone",
    background_color: "#0c1012",
    theme_color: "#0c1012",
    icons: [
      { src: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
