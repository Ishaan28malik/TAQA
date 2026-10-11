/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    unoptimized: true,
  },
  env: {
    googleMapsAPIKey: "AIzaSyCIUzr-dxp6k1CkI3bCh_08hzkVyNFGESk",
    googleMapId: "2cc0030ca38d80f4",
    googleSearchLink:
      "https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyCIUzr-dxp6k1CkI3bCh_08hzkVyNFGESk&cx=447269dab47f54341",
  },
};

export default nextConfig;
