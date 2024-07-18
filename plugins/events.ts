export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("click-outside", (el, binding, vnode) => {
        el.clickOutsideEvent = (event: Event) => {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event)
            }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
    })
})
