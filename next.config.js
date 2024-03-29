const nextTranslate = require("next-translate-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: "ar",
    localeDetection: false,
    locales: ["ar", "en"],
  },

  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.ctfassets.net" }],
  },
};

module.exports = nextTranslate(nextConfig);
