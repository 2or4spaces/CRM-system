<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <p>При желании вы можете изменить имя своей учетной записи</p>
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          placeholder="Новое имя"
          :class="{ invalid: !this.name }"
        >
        <span
          class="helper-text invalid" v-if="!this.name">Введите новое имя</span>
      </div>

      <button
        class="btn waves-effect waves-light"
        type="submit"
        :disabled="!formIsValid">
        Изменить
        <i class="material-icons right">send</i>
      </button>
      <p class="green-text" v-if="showMessage">Имя учетной записи успешно изменено</p>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      name: '',
      showMessage: false
    }
  },
  computed: {
    ...mapGetters(['info']),
    nameСheck () {
      const nameRegExp = /([A-za-z]{4,})/
      return nameRegExp.test(this.name)
    },
    formIsValid () {
      return this.nameСheck && this.name !== this.info.name
    }
  },
  mounted () {
    this.name = this.info.name
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler () {
      if (this.formIsValid) {
        try {
          await this.updateInfo({
            name: this.name
          })
          this.showMessage = true
          setTimeout(() => {
            this.showMessage = false
          }, 3000)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
}
</script>
