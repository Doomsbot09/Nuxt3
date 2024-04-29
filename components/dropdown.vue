<template>
    <div class="relative" @click="toggleDropDown">
        <!-- Button -->
        <button class="btn btn-outline">
            Sort By 
            <Icon name="carret_down"></Icon>
        </button>

        <div v-if="isOpen" class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1">
                <li v-for="(item, index) in items"
                    @click="selectItem(item.flag)"
                    :class="[
                        'list block px-4 py-2 text-sm text-gray-700',
                        {
                            'isActive': item.flag === selected
                        }
                    ]">
                    {{ item.name }}
                </li>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
    import { ref } from 'vue'; 

    let isOpen = ref(false)
    let selected = ref(3)
    let items = [
        { name: 'Task Name A - Z', flag: 1 },
        { name: 'Task Name Z - A', flag: 2 },
        { name: 'Date Created: ASC', flag: 3 },
        { name: 'Date Created: DESC', flag: 4 }
    ]
    const emitSelect = defineEmits(['selectedItem'])

    const toggleDropDown = () => {
        isOpen.value = !isOpen.value
    }
    const selectItem = (data: number) => {
        selected.value = data
        emitSelect('selectedItem', data)
    }
</script>

<style lang="scss" scoped>
    .btn {
        color: white;
        background-color: #1976D2;
        padding: 0.25rem 1.5rem;
        border-radius: 1.5rem;
    }

    .btn-outline {
        color: #1976D2;
        background-color: #FFFFFF;
        border: 1px solid #1976D2;

        &:hover {
            background-color: lighten(#1976D2, 50%);
        }
    }

    .list:hover {
        color: #1976D2;
        background-color: lighten(#1976D2, 50%);
        cursor: pointer;
    }
    
    .isActive {
        color: #1976D2;
        background-color: lighten(#1976D2, 50%);
    }
</style>