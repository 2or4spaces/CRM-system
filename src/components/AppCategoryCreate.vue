<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: !this.title }"
          >
          <label for="name">Название категории</label>
          <span class="helper-text invalid" v-if="!this.title">Введите название новой категории</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: !this.limit }"
          >
          <label for="limit">Лимит</label>
          <span class="helper-text invalid" v-if="!this.limit">Максимальная величина затрат</span>
        </div>

        <button
          class="btn waves-effect waves-light"
          type="submit"
          :disabled="!categoryIsValid">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  emits: ['created'],
  data () {
    return {
      title: '',
      limit: ''
    }
  },
  computed: {
    categoryIsValid () {
      return this.title && this.limit
    }
  },
  methods: {
    async submitHandler () {
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = ''
        this.limit = ''
        this.$emit('created', category)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
