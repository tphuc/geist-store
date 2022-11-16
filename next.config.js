/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
  locales: [ 'en', 'vi'],
    defaultLocale: 'en',
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
