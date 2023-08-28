/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "juan-sesu-ecommerce.s3.amazonaws.com",
      "my-page-negiupp.s3.amazonaws.com",
      "lh3.googleusercontent.com",
    ],
  },
  pwa: {
    dest: "public",
    //disable: process.env.NODE_ENV === 'development', // Solo habilita PWA en producción
    register: true,
    skipWaiting: true,
  },
};

module.exports = nextConfig;
