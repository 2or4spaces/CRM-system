<template>
  <div class="history-chart">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'

export default {
  mixins: [Pie],
  props: {
    records: { type: Array },
    categories: { type: Array }
  },
  async mounted () {
    this.renderChart({
      labels: this.categories.map(cat => cat.title),
      datasets: [{
        label: 'Расходы по категориям',
        data: this.categories.map(cat => {
          return this.records.reduce((total, rec) => {
            if (rec.categoryId === cat.id && rec.type === 'outcome') {
              total += +rec.amount
            }
            return total
          }, 0)
        }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    })
  }
}
</script>
