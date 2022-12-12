const { i18n } = require('./i18n.config')

module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
    i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
    ],
  }
}