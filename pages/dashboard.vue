<template>
    <div class="main">
        <div class="box1">
            <Charts
                type="line"
                :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']"
                :datasets="lineGraphData"
            />
        </div>
        <div class="box2">
            <Charts
                type = 'doughnut'
                :labels="['ABC', 'XYZ CO.', 'BBC']"
                :datasets="doughnutGraphData"
            />
        </div>
        <div class="box3">
            <Charts
                type = 'bar'
                :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']"
                :datasets="barGraphData"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
    const lineGraphData = [{
        label: "ABC Company",
        value: [20, 60, 20, 160, 100, 120, 20],
        color: "#165BAA"
    },{
        label: "XYZ Co.",
        value: [100, 120, 60, 20, 60, 60, 100],
        color: "#A155B9"
    }]
    const barGraphData = [{
        label: "ABC Company",
        value: [20, 42, 15, 42, 18, 40],
        color: "#165BAA"
      },
      {
        label: "XYZ Co.",
        value: [30, 19, 42, 50, 20, 25],
        color: "#A155B9"
    }]
    const doughnutGraphData = [{
        value: [50, 50, 50],
        color: ["#A155B9", "#165BAA", "#F765A3"]
    }]
</script>

<style lang="postcss" scoped>
    .main {
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .box1 {
        height: 33.3%;
        width: 100%;
        outline: 2px solid red;
    }

    .box2 {
        height: 33.3%;
        width: 100%;
        outline: 2px solid green;
    }

    .box3 {
        height: 33.3%;
        width: 100%;
        outline: 2px solid blue;
    }
</style>