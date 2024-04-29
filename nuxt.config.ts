// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-icon'],
  typescript: {
    strict: true,
    typeCheck: true 
  },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    develop: {
      API_URL: 'https://12e4d0vdb9.execute-api.us-east-1.amazonaws.com/sandbox'
    },
  },
})
