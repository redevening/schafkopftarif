<script>
  import Chart from 'chart.js/auto'
  import { afterUpdate, onMount } from 'svelte'

  export let labels = []
  export let xAxis = []
  export let yAxis = [[]]
  export let type = 'line'

  let canvas, chart

  export const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    blue: 'rgb(54, 162, 235)',
    orange: 'rgb(255, 159, 64)',
    green: 'rgb(75, 192, 192)',
    grey: 'rgb(201, 203, 207)',
    yellow: 'rgb(255, 205, 86)',
    purple: 'rgb(153, 102, 255)',
  }

  let showGradient = false
  $: greenGradient = function () {
    let ctx = canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, 'lawngreen')
    gradient.addColorStop(0.7, '#131516')
    gradient.addColorStop(1, '#131516')
    return gradient
  }

  $: redGradient = function () {
    let ctx = canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, '#131516')
    gradient.addColorStop(0.3, '#131516')
    gradient.addColorStop(1, 'red')
    return gradient
  }

  $: datasets = labels.map((label, i) => ({
    label: label,
    data: yAxis[i],
    backgroundColor: Object.values(CHART_COLORS)[i],
    borderColor: Object.values(CHART_COLORS)[i],
    borderWidth: 2,
    pointRadius: 0,
    // lighten color with gradient instead of alpha channel to not have overlapping transparency
    fill: showGradient
      ? { above: greenGradient, below: redGradient, target: { value: 0 } }
      : false,
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
      animation: {
        duration: 0,
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
            },
          },
        },
        filler: showGradient
          ? {
              propagate: true,
              drawTime: 'beforeDraw',
            }
          : undefined,
      },
    },
  }

  onMount(() => {
    chart = new Chart(canvas, config)
  })

  afterUpdate(() => {
    if (!chart) return

    chart.data = data
    chart.update()
  })
</script>

<canvas bind:this={canvas} />
