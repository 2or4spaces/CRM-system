<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <app-loader v-if="loading" />

    <h5 class="center" v-else-if="!records.length">У вас пока нет записей.
      <router-link :to="{ name: 'record' }">Создать новую запись</router-link>
    </h5>

    <section v-else>
      <app-history-table
        :records="records" />
    </section>
  </div>
</template>

<script>
import AppHistoryTable from '@/components/AppHistoryTable.vue'

export default {
  components: {
    AppHistoryTable
  },
  data () {
    return {
      loading: true,
      records: [],
      categories: []
    }
  },
  async mounted () {
    const records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.records = records.map(record => {
      return {
        ...record,
        amount: new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: 'RUB'
        }).format(record.amount),
        date: new Intl.DateTimeFormat('ru-RU', {
          second: '2-digit',
          minute: '2-digit',
          hour: '2-digit',
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }).format(new Date(record.date)),
        categoryName: this.categories.find(cat => cat.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход'
      }
    })
    this.loading = false
  },
  computed: {

  },
  methods: {

  }
}
</script>
