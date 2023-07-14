/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.punkapi.com",
        port: "",
        pathname: "/v2/**",
      },
    ],
  },
};
//https://images.punkapi.com/v2/keg.png
