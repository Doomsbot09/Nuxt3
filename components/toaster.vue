<template>
    <div
      :class="{
        'bg-green-500': store.toastState.type === 'success',
        'bg-yellow-500': store.toastState.type === 'warning',
        'bg-red-500': store.toastState.type === 'error',
      }"
      class="fixed right-0 p-4 m-4 rounded-md text-white z-10"
    >
      <p>{{ store.toastState.message }}</p>
    </div>
</template>

<script lang="ts" setup>
    import { useEventEmitter } from '~/store/base';

    const store = useEventEmitter()
</script>