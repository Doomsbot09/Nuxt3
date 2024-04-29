<template>
    <div class="container">
        {{ props.message }}
    </div>
</template>

<script lang="ts" setup>
    import { useEventEmitter, useTodoStore } from '~/store/base';

    const store = useEventEmitter()
    const todoStore = useTodoStore()
    const props = defineProps({
        message: {
            type: String,
            default: 'Example Message.'
        },
        title: {
            type: String
        },
        id: {
            type: Number
        }
    })

    watch(store.event, (value) => {
        if (value.action === 'delete') {
            deleteTask()
        }
    })

    const deleteTask = async () => {
        store.spinnerState.isLoading = true

        const resp = await todoStore.delete(`task/delete/${props.id}`, { id: props.id })

        if (resp.status) {
            store.toggleModal('close')
            store.showToaster({ type: 'success', message: resp.message })
            store.spinnerState.isLoading = false
        } else {
            store.toggleModal('close')
            store.showToaster({ type: 'error', message: resp.message })
            store.spinnerState.isLoading = false
        }
    }
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