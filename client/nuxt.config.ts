// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true }, 
  css: ['~/assets/css/main.css'],
  modules: [
    "@nuxtjs/google-fonts"
  ], 
  googleFonts: {
    families: {
      Nunito: [400],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
