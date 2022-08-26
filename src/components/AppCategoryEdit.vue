<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
              >{{ cat.title }}</option>
          </select>
          <label>Выберите категорию для изменения</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            placeholder="Новое название категории"
            :class="{ invalid: !this.title }"
          >
          <span class="helper-text invalid" v-if="!this.title">Введите новое название категории</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            placeholder="Лимит"
            :class="{ invalid: !this.limit }"
          >
          <span class="helper-text invalid" v-if="!this.limit">Измените лимит</span>
        </div>

        <button
          class="btn waves-effect waves-light"
          type="submit"
          :disabled="!categoryIsValid">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['updated'],
  props: {
    categories: { type: Array, required: true }
  },
  data () {
    return {
      title: '',
      limit: '',
      current: null
    }
  },
  mounted () {
    // eslint-disable-next-line
    this.select = M.FormSelect.init(this.$refs.select)
  },
  computed: {
    categoryIsValid () {
      return this.title && this.limit && this.current
    }
  },
  watch: {
    current (catId) {
      const { title, limit } = this.categories.find(cat => cat.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  methods: {
    async submitHandler () {
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$emit('updated', categoryData)
      } catch (e) {}
    }
  }
}
</script>
