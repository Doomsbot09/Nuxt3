<template>
    <div class="line_container" v-if="props.type === 'line'">
        <Line 
            :data="data"
            :options="options" 
        />
    </div>
    <div class="bar_container" v-else-if="props.type === 'bar'">
        <Bar 
            :data="data"
            :options="options"
        />
    </div>
    <div class="doughnut_container" v-else-if="props.type === 'doughnut'">
        <Doughnut
            :data="data"
            :options="options"
        />
    </div>
</template>
  
<script setup>
    import { Line, Doughnut, Bar } from 'vue-chartjs'

    const { $_, $generateRandomColors } = useNuxtApp()
    const data = ref({
        labels: [],
        datasets: []
    })
    const options = ref({})
    const props = defineProps({
        type: {
            type: String,
            required: true
        },
        labels: {
            type: Array,
            required: true,
            default: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] 
        },
        datasets: {
            type: Array,
            required: true,
            default: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        }
    })

    $_.map(props.datasets, (newValue) => {
        const color = $generateRandomColors()

        if (props.type === 'line') {
            data.value.datasets.push({
                label: newValue.label,
                data: newValue.value,
                backgroundColor: newValue.color,
                borderColor: newValue.color,
                borderWidth: 1
            })
        } else if (props.type === 'bar') {
            data.value.datasets.push({
                label: newValue.label,
                data: newValue.value,
                backgroundColor: newValue.color,
                borderColor: newValue.color,
                borderWidth: 1,
                borderRadius: 3
            })
        } else if (props.type === 'doughnut') {
            const multiColors = $_.map(newValue.value, () => $generateRandomColors())

            data.value.datasets.push({
                data: newValue.value,
                backgroundColor: newValue.color,
                borderColor: newValue.color,
                borderWidth: 1
            })
        } else {
            console.log('Invalid Chart Type')
            return false
        }

    })

    // MAP LABELS AND OPTIONS FOR CHARTS
    switch (props.type) {
        case 'line':
            data.value.labels = props.labels
            options.value = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        align: 'start'
                    }
                }
            }
        break;
        case 'bar':
            data.value.labels = props.labels
            options.value = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        align: 'start'
                    }
                }
            }
        break;
        case 'doughnut':
            data.value.labels = props.labels
            options.value = {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        break;
        default: 
            options.value = {
                responsive: true,
                maintainAspectRatio: false
            }
    }
</script>

<style lang="postcss" scoped>
    .line_container {
        @apply w-full h-full;
    }
    .bar_container {
        @apply w-full h-full;
    }
    .doughnut_container {
        @apply w-full h-full flex justify-center;
    }
</style>