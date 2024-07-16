<template>
    <div class="content">
        <customTable :table_header="props.headers">
            <div class="contents" v-for="(item, index) in props.data" :key="index">
                <tr>
                    <td 
                        :class="['whitespace-no-wrap', {'border-none': item?.isOpened }]" 
                        :colspan="item?.isOpened ? 5 : 0">
                        <Icon
                            @click="toggle(item.id)"
                            :name="item?.isOpened ? 'accordion_open' : 'accordion_close'" 
                            :class="['icon', {'icon-active': item?.isOpened}]" />
                        {{ item.name }}
                    </td>
                    <div v-show="!item?.isOpened" class="contents">
                        <td class="whitespace-no-wrap">{{  }}</td>
                        <td class="whitespace-no-wrap">{{ item.rawTotal }}</td>
                        <td class="whitespace-no-wrap">{{ item.markup }}</td>
                        <td class="whitespace-no-wrap">{{ item.billable }}</td>
                    </div>
                </tr>
                <div v-show="item?.isOpened && item.children.length" class="contents">
                    <tr v-for="(sub_item) in item.children">
                        <td class="whitespace-no-wrap pl-12" colspan="1">{{ sub_item.name }}</td>
                        <td class="whitespace-no-wrap">{{ sub_item.usage }}</td>
                        <td class="whitespace-no-wrap">{{ sub_item.rawTotal }}</td>
                        <td class="whitespace-no-wrap">{{ item.markup }}</td>
                        <td class="whitespace-no-wrap">{{ item.billable }}</td>
                    </tr>
                    <tr>
                        <td class="whitespace-no-wrap pl-12" colspan="1"><b>Total</b></td>
                        <td class="whitespace-no-wrap">-</td>
                        <td class="whitespace-no-wrap">{{ item.rawTotal }}</td>
                        <td class="whitespace-no-wrap">{{ item.markup }}</td>
                        <td class="whitespace-no-wrap">{{ item.billable }}</td>
                    </tr>
                </div>
                <div v-show="item?.isOpened && !item.children.length" class="contents">
                    <td class="text-center" colspan="5">
                        No Record Found!!!
                    </td>
                </div>
            </div>
        </customTable>
    </div>  
</template>
  
<script setup>
    const { $_ } = useNuxtApp();
    const props = defineProps({
        headers: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            required: true
        }
    })
    
    const toggle = (id) => {
        const index = $_.findIndex(props.data, { id: id })
        if (index !== -1) props.data[index].isOpened = !props.data[index].isOpened;
    }
</script>
  
<style lang="postcss" scoped>
    .content {
        padding: 2rem;
    }

    .icon {
        color: #888888;
        @apply
            cursor-pointer;
    }

    .icon-active {
        color: #183695;
    }

    .icon:hover {
        color: #183695;
    }
</style>
  