import { 
    Chart, 
    Title, 
    Tooltip, 
    Legend,
    BarElement, 
    LineElement, 
    PointElement, 
    ArcElement,
    LinearScale, 
    CategoryScale, 
    DoughnutController,
} from 'chart.js'

export default defineNuxtPlugin(() => {
    Chart.register(
        CategoryScale, 
        LinearScale, 
        BarElement, 
        LineElement,
        PointElement,
        ArcElement,
        DoughnutController,
        Title, Tooltip, Legend)
})