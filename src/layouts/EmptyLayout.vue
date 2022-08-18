<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
    <div
      class="auth-card card-panel center-align helper-text invalid"
      v-if="errorMessage"
      >{{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      errorMessage: ''
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbError) {
      switch (fbError.code) {
        case 'auth/user-not-found':
          this.errorMessage = 'Введены неверные данные'
          break
        case 'auth/wrong-password':
          this.errorMessage = 'Введен неверный пароль'
          break
        case 'auth/email-already-in-use':
          this.errorMessage = 'Введенный Email уже зарегистрирован в системе'
          break
        default:
          this.errorMessage = 'Не удалось войти в систему'
      }
    }
  },
  methods: {

  }
}
</script>
