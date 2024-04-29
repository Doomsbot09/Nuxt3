<template>
    <toaster></toaster>
    <modal 
        :toggle=eventStore.modalState.state
        :action=eventStore.modalState.action
        :title=eventStore.modalState.title
        :btnOkName=eventStore.modalState.btnOkName
        :btnStatus=eventStore.modalState.btnStatus>
        <createTask v-if="eventStore.modalState.action === 'create' || eventStore.modalState.action === 'update'"></createTask>
        <deleteTask
            :title=eventStore.deleteTask.task_name
            :id=eventStore.deleteTask.id
            v-if="eventStore.modalState.action === 'delete'" message="Are you sure you want to delete this task?">
        </deleteTask>
    </modal>

    <div class="section_1">
        <banner></banner>
    </div>

    <div class="section_2">
        <customTable :table_header="store.table_headers">
            <tr v-if="store.pagination.isLoading">
                <td class="filler" colspan="8">
                    <div class="filler-spinner">
                        <spinner size="35"></spinner>
                    </div>
                </td>
            </tr>
            <tr
                v-else
                v-for="(item, index) in store.task_data" :key="index">
                <td class="whitespace-no-wrap">{{ item.task_name }}</td>
                <td class="whitespace-no-wrap">{{ item.description }}</td>
                <td class="whitespace-no-wrap">{{ 
                    getTimeLeft(item.starts_at, item.ends_at)
                }}</td>
                <td class="whitespace-no-wrap">{{ $dayjs(item.starts_at).format('MMM D, YYYY hh:mm A') }}</td>
                <td class="whitespace-no-wrap">{{ $dayjs(item.ends_at).format('MMM D, YYYY hh:mm A') }}</td>
                <td class="whitespace-no-wrap">{{ $dayjs(item.createdAt).format('MMM D, YYYY hh:mm A') }}</td>
                <td class="whitespace-no-wrap">
                    <p :class="['badge ', 'badge-' + item.status]">{{ item.status }}</p>
                </td>
                <td colspan="1">
                    <div class="actions">
                        <Icon 
                            @click="eventStore.toggleModal('delete', { task_name: item.task_name, id: item.id })" 
                            class="actions-icon icon-danger"
                            name="trash_outline">
                        </Icon>
                        <Icon 
                            @click="eventStore.toggleModal('update', item)"
                            class="actions-icon icon-warning"
                            name="pencil_fill">
                        </Icon>
                    </div>
                </td>
            </tr>
        </customTable>
    </div>
</template>

<script lang="ts" setup>
    import { useTodoStore, useEventEmitter } from '~/store/base';
    import { onBeforeMount } from 'vue';

    const store = useTodoStore()
    const eventStore = useEventEmitter()
    const { $_, $dayjs } = useNuxtApp()

    const getTimeLeft = (startDate: Date, endDate: Date) => {
        const date1 = $dayjs(startDate)
        const date2 = $dayjs(endDate)
        const diffDays = Math.abs(date1.diff(date2, 'day'));
        const diffHours = Math.abs(date1.diff(date2, 'hour') % 24);
        const diffMinutes = Math.abs(date1.diff(date2, 'minute') % 60);
        const timeLeft = `
            ${diffDays > 1 ? diffDays + ' days' : diffDays === 1 ? diffDays + ' day' : ''}${diffDays && diffHours ? ',' : ''}
            ${diffHours > 1 ? diffHours + ' hrs' : diffHours === 1 ? diffHours + ' hr' : ''}${(diffDays || diffHours) && diffMinutes ? ',' : ''}
            ${diffMinutes > 1 ? diffMinutes + ' mins' : diffMinutes === 1 ? diffMinutes + ' min' : ''}`
        
        if(diffDays < 1 && diffHours < 1 && diffMinutes < 1) {
            return `No Time Left`
        }

        return timeLeft
    }

    onBeforeMount(async () => {
        const paginate = store.pagination
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
            sorts: {
                key: "createdAt",
                value: "ASC"
            }
        }
        store.list('task/list', query)
    })
</script>

<style lang="scss" scoped>
    .section_1 {
        height: 20vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .section_2 {
        height: auto;
        width: 100%;
        margin-bottom: 1rem;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);

        .filler {
            height: 45vh;
            position: relative;

            &-spinner {
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1;
                background: rgba(255, 255, 255, 0.08);
                backdrop-filter: blur(2px);
                -webkit-backdrop-filter: blur(2px);
            }
        }

        td {
            padding: 10px;
            font-weight: 400;
            background-color: #FFFFFF;
            border-bottom: 1px solid #dddddd;
        }

        .badge {
            color: white;
            border: 1px solid;
            padding: 0 0.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 1rem;

            &-ongoing {
                background-color: lighten(#E7AF06, 15%);
                border-color: #E7AF06;
            }

            &-pending {
                background-color: lighten(#1976D2, 15%);
                border-color: #1976D2;
            }

            &-expired {
                background-color: lighten(#C10015, 15%);
                border-color: #C10015;
            }

            &-complete {
                background-color: lighten(#26A69A, 15%);
                border-color: #26A69A;
            }
        }

        .actions {
            display: flex;
            justify-content: space-around;
            align-items: center;

            &-icon {
                cursor: pointer;
            }

            .icon-danger:hover {
                color: #C10015;
            }

            .icon-warning:hover {
                color: #E7AF06;
            }
        }
    }
</style>