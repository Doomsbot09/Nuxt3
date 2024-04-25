import { defineAppConfig } from "nuxt/app";

export default defineAppConfig({
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
            carret_next: 'ooui:next:ltr',
            carret_back: 'ooui:next:rtl'
        }
    }
})