<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <app-loader v-if="loading" />

    <h5 class="center" v-else-if="!categories.length">У вас пока нет категорий.
      <router-link :to="{ name: 'categories' }">Создать новую категорию</router-link>
    </h5>

    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.id"
          >{{ cat.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: !this.amount }"
        >
        <label for="amount">Сумма</label>
        <span class="helper-text invalid" v-if="!this.amount">Введите сумму</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{ invalid: !this.description }"
        >
        <label for="description">Описание</label>
        <span class="helper-text invalid" v-if="!this.description">Заполните описание</span>
      </div>

      <button
        class="btn waves-effect waves-light"
        type="submit"
        :disabled="!recordIsValid">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      loading: true,
      select: null,
      categories: [],
      category: null,
      type: 'income',
      amount: '',
      description: ''
    }
  },
  computed: {
    ...mapGetters(['info']),
    recordIsValid () {
      return this.category && this.type && this.amount && this.description
    },
    canCreateRecord () {
      if (this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler () {
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })

          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', { bill })
          this.amount = ''
          this.description = ''
        } catch (e) {
          console.log(e)
        }
      } else {
        return 'Недостаточно средств на счете'
      }
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
    }, 0)
  }
}
</script>
