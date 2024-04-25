<template>
    <div class="container">
        {{ props.message }}
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps({
        message: {
            type: String,
            default: 'Example Message.'
        }
    })
</script>

<style lang="scss" scoped>
    .container {
        height: 10vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>