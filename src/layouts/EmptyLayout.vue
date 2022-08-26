<template>
  <div class="green lighten-5 empty-layout">
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
          setTimeout(() => {
            this.errorMessage = ''
          }, 3000)
          break
        case 'auth/wrong-password':
          this.errorMessage = 'Введен неверный пароль'
          setTimeout(() => {
            this.errorMessage = ''
          }, 3000)
          break
        case 'auth/email-already-in-use':
          this.errorMessage = 'Введенный Email уже зарегистрирован в системе'
          setTimeout(() => {
            this.errorMessage = ''
          }, 3000)
          break
        default:
          this.errorMessage = 'Не удалось войти в систему'
      }
    }
  }
}
</script>
