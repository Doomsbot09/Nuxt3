<template>
    <div class="banner">
        <label class="banner_title">
            To-Do List
        </label>
        <div class="banner_actions">
            <dropdown @selectedItem="sortBy"></dropdown>
            <button class="btn" @click="store.toggleModal('create')">
                <Icon name="plus"></Icon>
                Add Task
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useEventEmitter, useTodoStore } from '~/store/base';

    const store = useEventEmitter()
    const todoStore = useTodoStore()
    const sortBy = (data: number) => {
        const query = {
            key: "",
            value: ""
        }
        switch (data) {
            case 1:
                query.key = "task_name"
                query.value = "ASC"
                break;
            case 2:
                query.key = "task_name"
                query.value = "DESC"
                break;
            case 4:
                query.key = "createdAt"
                query.value = "DESC"
                break;
            default:
                query.key = "createdAt"
                query.value = "ASC"
        }

        paginate(query)
    }

    const paginate = (sort: object) => {
        const paginate = todoStore.pagination
        paginate.isLoading = true

        const query = {
                page: paginate.page,
                pageSize: paginate.pageSize,
                returnCount: true, 
                notEqualFilters: [
                    {
                        key: "status",
                        value: "deleted"
                    }
                ],
                sorts: sort
            }
        
        todoStore.list('task/list', query)
    }
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