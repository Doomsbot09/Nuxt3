<template>
    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
            <thead>
                <tr>
                    <th v-for="(item, index) in props.table_header" :key="index"
                        class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">{{ item }}
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <slot></slot>
            </tbody>
            <tfoot class="bg-white divide-y divide-gray-200">
                <tr>
                    <td colspan="8">
                        <div class="footer">
                            <label>Rows per page:</label>
                            <customSelect @selected="select"></customSelect>
                            <label>
                                {{ todoStore.pagination.page }}-{{ todoStore.pagination.pageSize }} 
                                of 
                                {{ todoStore.pagination.total }}
                            </label>
                            <label>
                                <Icon  
                                    @click="
                                        !todoStore.pagination.isLoading && todoStore.pagination.page > 1 ? 
                                        paginate('preview') : ''"
                                    :class="[
                                        'footer_actions',
                                        {
                                        'isActive': todoStore.pagination.page > 1
                                        }
                                    ]"
                                    name="carret_back">
                                </Icon>
                            </label>
                            <label>
                                <Icon
                                    @click="!todoStore.pagination.isLoading &&
                                    todoStore.pagination.total > (todoStore.pagination.pageSize * todoStore.pagination.page) ? 
                                    paginate('next') : ''"
                                    :class="[
                                        'footer_actions',
                                        {
                                            'isActive': todoStore.pagination.total > (todoStore.pagination.pageSize * todoStore.pagination.page)
                                        }
                                    ]"
                                    name="carret_next">
                                </Icon>
                            </label>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script lang="ts" setup>
    import { useTodoStore } from '~/store/base';

    const todoStore = useTodoStore()
    const props = defineProps({
        table_header: {
            type: Object,
            required: true
        },
    })

    const paginate = (action: string, size?: number) => {
        const paginate = todoStore.pagination
        paginate.isLoading = true
        paginate.pageSize = action === 'size' && size ? size : paginate.pageSize
        paginate.page = action === 'next' ? paginate.page + 1 : action === 'preview' ? paginate.page - 1 : paginate.page

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
        
        todoStore.list('task/list', query)
    }

    const select = (data: number) => {
        paginate('size', data)
    }
</script>

<style lang="scss" scoped>
    th {
        color: white;
        padding: 1.25rem;
        font-weight: 600;
        background-color: #1D50A2;
    }

    .footer {
        padding: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: 3rem;

        &_actions {
            color: #D1D5DB;
            cursor: pointer;
        }

        .isActive {
            color: #6B7280;
        }
    }
</style>