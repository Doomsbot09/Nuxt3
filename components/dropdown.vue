<template>
    <div class="relative" @click="toggleDropDown">
        <!-- Button -->
        <button class="btn btn-outline">
            Sort By 
            <Icon name="carret_down"></Icon>
        </button>

        <!-- Dropdown Menu -->
        <div v-if="isOpen" class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <!-- Dropdown Items -->
            <div class="py-1 list" role="none">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">
                    Task Name A - Z
                </a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1">
                    Task Name Z - A
                </a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-2">
                    Date Created: ASC
                </a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-3">
                    Date Created: DESC
                </a>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
    import { ref } from 'vue'; 

    let isOpen = ref(false)

    const toggleDropDown = () => {
        isOpen.value = !isOpen.value
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

    .list {

        a:hover {
            color: #1976D2;
            background-color: lighten(#1976D2, 50%);
        }
    }
</style>