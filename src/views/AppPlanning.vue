<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ stateOfBill }}</h4>
    </div>

    <app-loader v-if="loading" />

    <h5 class="center" v-else-if="!categories.length">У вас пока нет категорий.
      <router-link :to="{ name: 'categories' }">Создать новую категорию</router-link>
    </h5>

    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(cat.spend) }}
          из
          {{ new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(cat.limit) }}
        </p>
        <div class="progress" >
          <div
            class="determinate"
            :class="cat.progressColor"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      loading: true,
      categories: []
    }
  },
  async mounted () {
    const records = await this.$store.dispatch('fetchRecords')
    const FbCategories = await this.$store.dispatch('fetchCategories')

    this.categories = FbCategories.map(cat => {
      const spend = records
        .filter(record => record.categoryId === cat.id)
        .filter(record => record.type === 'outcome')
        .reduce((total, record) => {
          return total + record.amount
        }, 0)

      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = progressPercent < 60
        ? 'green'
        : progressPercent < 80
          ? 'yellow'
          : 'red'

      return {
        ...cat,
        spend,
        progressPercent,
        progressColor
      }
    })

    this.loading = false
  },
  computed: {
    ...mapGetters(['info']),
    stateOfBill () {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB'
      }).format(this.info.bill)
    }
  }
}
</script>
