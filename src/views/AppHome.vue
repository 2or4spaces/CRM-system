<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <app-loader v-if="loading" />

    <div class="row" v-else>

      <app-home-bill
        :rates="currency.rates" />

      <app-home-currency
        :rates="currency.rates"
        :date="courseDate" />

    </div>
  </div>
</template>

<script>
import AppHomeBill from '@/components/AppHomeBill.vue'
import AppHomeCurrency from '@/components/AppHomeCurrency.vue'

export default {
  components: {
    AppHomeBill, AppHomeCurrency
  },
  data () {
    return {
      loading: true,
      currency: null
    }
  },
  async mounted () {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  computed: {
    courseDate () {
      const dateOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }
      return Intl.DateTimeFormat('ru-RU', dateOptions).format(new Date(this.currency.date))
    }
  },
  methods: {
    async refresh () {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  }
}
</script>
