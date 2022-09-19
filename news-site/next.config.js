/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains:['ichef.bbci.co.uk'],
        formats:['image/avif', "image/webp"]
    }
  }
  
  module.exports = nextConfig
  