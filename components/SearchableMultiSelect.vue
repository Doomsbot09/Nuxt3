<template>
    <div class="container" v-click-outside="closeDropdown">
      <label v-if="props.label">{{ props.label }}</label>
      <div class="select_content" @click="toggleDropdown">
        <div class="select_content-input">
          <span 
            class="selected"
            v-for="option in selectedOptions" :key="option.value">
            {{ option.label }}
            <button
              class="icon-remove"
              @click.stop="removeOption(option)">
              &times;
            </button>
          </span>
          <span v-if="!selectedOptions.length" class="default-value">
            {{ props.default_value }}
          </span>
        </div>
        <Icon class="icon-dropdown" size="13" name="codicon:triangle-down"/>
      </div>
      <div v-if="isOpen" class="select_options">
        <!-- FILTER INPUT -->
        <q-input 
          v-model="search"
          class="select_options-search"
          :placeholder="props.placeholder">
          <template v-slot:prepend>
            <Icon name="mdi:magnify" size="22" />
          </template>
        </q-input>
        <!-- OPTIONS CONTENT -->
        <div v-for="option in filteredOptions" :key="option.value" class="select_options-content">
          <q-checkbox 
            :label="option.label"
            :model-value="isSelected(option)"
            size="sm"
            @update:model-value="selectOption(option)"
          />
        </div>
      </div>
    </div>
</template>
  
<script lang="ts" setup>

  interface SelectOption {
    value: string | number,
    label: string
  }

  const props = defineProps({
    options: {
      type: Array as PropType<SelectOption[]>,
      required: true
    },
    label: {
      type: String
    },
    placeholder: {
      type: String,
      default: "Search..."
    },
    default_value: {
      type: String,
      default: "Select options"
    }
  })

  const search = ref<string>('');
  const isOpen = ref<boolean>(false);
  const selectedOptions = ref<SelectOption[]>([]);
  const options = ref(props.options);
  
  const toggleDropdown = (): void => {
    isOpen.value = !isOpen.value;
  }
  
  const closeDropdown = (): void => {
    isOpen.value = false;
  }

  const selectOption = (option: SelectOption): void => {
    if (isSelected(option)) {
      removeOption(option)
    } else {
      selectedOptions.value.push(option)
    }
  };
  
  const removeOption = (option: SelectOption): void => {
    selectedOptions.value = selectedOptions.value.filter(selected => selected.value !== option.value);
  };

  const isSelected = (option: SelectOption): boolean => {
    return selectedOptions.value.some(selected => selected.value === option.value);
  }

  const filteredOptions = computed<SelectOption[]>(() => {
    if (!search.value) {
      return options.value
    }
    return options.value.filter(option => option.label.toLowerCase().includes(search.value.toLowerCase()))
  })
</script>
  
<style lang="postcss" scoped>
  .container {
    @apply relative w-full;

    .select_content {
      @apply flex justify-between items-center border p-2 rounded cursor-pointer;

      &-input {
        @apply flex justify-start items-center gap-1;

        .selected {
          padding: 0.175rem 0.25rem;
          @apply bg-blue-500 text-white rounded text-xs
        }

        .icon-remove {
          @apply ml-1;
        }

        .default-value {
          @apply text-gray-500 
        }
      }
      
      .icon-dropdown {
        color: #888888;
      }
    }
    
    .select_options {
      @apply absolute bg-white border w-full mt-1 rounded shadow text-xs z-10;

      &-content {
        @apply p-2 px-4 hover:bg-gray-100 cursor-pointer;
      }

      &-search {
        @apply px-4;
      }
    }
  }
</style>
  