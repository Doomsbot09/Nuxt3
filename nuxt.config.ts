// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-icon', "nuxt-quasar-ui"],
  typescript: {
    strict: true,
    typeCheck: true 
  },
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/table.css',
    'quasar/src/css/index.sass',
    '@quasar/extras/material-icons/material-icons.css'
  ],
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
          carret_back: 'mdi:chevron-left',
          accordion_close: 'mdi:plus-box',
          accordion_open: 'mdi:minus-box',
      }
    }
  }
})