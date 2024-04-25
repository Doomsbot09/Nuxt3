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
                            <customSelect></customSelect>
                            <label>1-5 of 10</label>
                            <label><</label>
                            <label>></label>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps({
        table_header: {
            type: Object,
            required: true
        },
    })
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
    }
</style>