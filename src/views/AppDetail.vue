<template>
  <app-loader v-if="loading" />

  <template v-else-if="record" >
    <div class="breadcrumb-wrap">
      <router-link :to="{ name: 'history' }" class="breadcrumb">История</router-link>
      <a @click.prevent class="breadcrumb">
        {{ record.typeText }}
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div class="card" :class="record.typeClass">
          <div class="card-content white-text">
            <p>Описание: {{ record.description }} </p>
            <p>Сумма: {{ record.amount }} </p>
            <p>Категория: {{ record.categoryName }} </p>
            <p>Дата: {{ record.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>

  <h5 class="center" v-else>Такой записи не существует</h5>
</template>

<script>
export default {
  data () {
    return {
      record: null,
      loading: true
    }
  },
  async mounted () {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    this.record = {
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
      categoryName: category.title,
      typeClass: record.type === 'income' ? 'green' : 'red',
      typeText: record.type === 'income' ? 'Доход' : 'Расход'
    }
    this.loading = false
  }
}
</script>
