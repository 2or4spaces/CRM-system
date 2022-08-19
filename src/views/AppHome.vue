<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <app-loader v-if="loading" />

    <div class="row" v-else>

      <app-home-bill
        :rates="currency.rates" />

      <app-home-currency
        :rates="currency.rates"
        :date="currency.date" />

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
    console.log(this.currency)
    this.loading = false
  }
}
</script>
