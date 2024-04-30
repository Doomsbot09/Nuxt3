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
  appConfig: {
    nuxtIcon: {
      size: '1.50em',
      aliases: {
          person_circle: 'mdi:person-circle',
          bell: 'mdi:bell',
          close: 'mdi:close',
          plus: 'mdi:add',
          calendar: 'mdi:calendar-month',
          email_outline: 'mdi:email-outline',
          trash_outline: 'mdi:trash-can-outline',
          pencil_fill: 'ph:pencil-simple-line-duotone',
          carret_down: 'mingcute:down-line',
          carret_down_fill: 'mingcute:down-small-fill',
          carret_next: 'mdi:chevron-right',
          carret_back: 'mdi:chevron-left'
      }
    }
  }
})
