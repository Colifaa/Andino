/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "/",
  },
}


module.exports = nextConfig
