<script>
  import Chart from 'chart.js/auto'
  import { beforeUpdate, onMount } from 'svelte'

  export let labels = []
  export let xAxis = []
  export let yAxis = [[]]
  export let type = 'line'

  export let width = 800
  export let height = 800

  let canvas, chart

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
      interaction: {
        intersect: false,
        mode: 'index',
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: function (items) {
              const n = items[0].label
              return `Game ${n}`
            },
            label: function (ctx) {
              return `${ctx.dataset.label}: ${ctx.formattedValue} P`
              
            }
          },
        },
      },
    },
  }

  onMount(() => {
    chart = new Chart(canvas, config)
  })

  beforeUpdate(() => {
    if (!chart) return

    chart.data = data
    chart.update()
  })
</script>

<canvas bind:this={canvas} />
