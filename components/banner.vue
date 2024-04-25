<template>
    <div class="banner">
        <label class="banner_title">
            To-Do List
        </label>
        <div class="banner_actions">
            <dropdown></dropdown>
            <button class="btn" @click="store.toggleModal('create')">
                <Icon name="plus"></Icon>
                Add Task
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useEventEmitter } from '~/store/base';

    const store = useEventEmitter()
</script>

<style lang="scss" scoped>
    .banner {
        height: 65%;
        width: 100%;
        padding: 0 1.5rem;
        background-color: #FFFFFF;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        &_title {
            width: 50%;
            font-size: xx-large;
            font-weight: 700;
        }

        &_actions {
            width: 50%;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            gap: 0.50rem;

            .btn {
                color: white;
                background-color: #1976D2;
                padding: 0.25rem 1.5rem;
                border-radius: 1.5rem;
            }
        }
    }
</style>