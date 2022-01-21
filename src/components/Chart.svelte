<script>
  import Chart from 'chart.js/auto'
  import { emptyGame } from '../common/game'
  import { beforeUpdate, onMount } from 'svelte'

  export let labels = []
  export let xAxis = []
  export let yAxis = [[]]
  export let type = 'line'

  export let width = 800
  export let height = 800

  let canvas

  export const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    blue: 'rgb(54, 162, 235)',
    orange: 'rgb(255, 159, 64)',
    green: 'rgb(75, 192, 192)',
    yellow: 'rgb(255, 205, 86)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
  }

  $: datasets = labels.map((label, i) => ({
    label: label,
    data: yAxis[i],
    backgroundColor: Object.values(CHART_COLORS)[i],
    borderColor: Object.values(CHART_COLORS)[i],
    borderWidth: 2,
    pointRadius: 0,
    pointHitRadius: 20
  }))

  $: data = {
    labels: xAxis,
    datasets: datasets,
  }

  $: config = {
    type: type,
    data: data,
    options: {
      responsive: true,
    },
  }

  let chart
  onMount(() => {
    chart = new Chart(canvas, config)
  })

  beforeUpdate(() => {
    if (!chart) return

    chart.data = data
    chart.update()
  })
</script>

<div style="width: 100%; overflow-x: auto; overflow-y: hidden">
  <div style="width: 3000px; height: 300px">
    <canvas bind:this={canvas} height="300" width="0"></canvas>
  </div>
</div>
