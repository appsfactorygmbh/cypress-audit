// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'NESocial',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/nes.css@latest/css/nes.min.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Press+Start+2P',
        },
      ],
    },
  },
  modules: ['@nuxtjs/tailwindcss'],
  devtools: { enabled: true },
  experimental: {
    appManifest: false,
  },
})
