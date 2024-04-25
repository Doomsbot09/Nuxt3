<template>
    <div class="relative" @click="toggleDropDown">
        <!-- Button -->
        <button class="btn">
            {{ selectedRowPage }}
            <Icon name="carret_down_fill" class="icon"></Icon>
        </button>

        <!-- Dropdown Menu -->
        <div v-if="isOpen" class="origin-top-right absolute bottom-0 left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <!-- Dropdown Items -->
            <div class="py-1 list" role="none">
                <a 
                    v-for="(item, index) in rowsPage"
                    @click="selectRowPage(item)"
                    href="#" 
                    class="block px-4 py-2 text-sm text-gray-700" 
                    role="menuitem" 
                    tabindex="-1">
                    {{ item }}
                </a>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
    import { ref } from 'vue'; 

    let isOpen = ref(false)
    let selectedRowPage = ref(5) 
    
    const rowsPage = [5, 10, 15]
    const toggleDropDown = () => {
        isOpen.value = !isOpen.value
    }
    const selectRowPage = (item: number) => {
        selectedRowPage.value = item
    }
</script>

<style lang="scss" scoped>
    .btn {
        border-bottom: 2px solid gray;
    }

    .icon {
        color: gray;
    }

    .list {

        a:hover {
            color: gray;
            background-color: lighten(gray, 45%);
        }
    }
</style>