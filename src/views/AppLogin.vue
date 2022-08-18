<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>

      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{ invalid: !emailСheck }"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="!emailСheck"
        >Введите действительный Email</small>
        <small
          class="helper-text teal-text"
          v-else
        >Email принят</small>
      </div>

      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{ invalid: !passwordСheck }"
        >
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="!passwordСheck"
        >Введите пароль</small>
      </div>
    </div>

    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          :disabled="!formIsValid"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        Нет аккаунта?
        <router-link :to="{ name: 'register' }">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    emailСheck () {
      const emailRegExp = /([\w.-]+@[\w.-]+\.[\w.-]+)/
      return emailRegExp.test(this.email)
    },
    passwordСheck () {
      const passwordRegExp = /([\w]{5,})/
      return passwordRegExp.test(this.password)
    },
    formIsValid () {
      return this.emailСheck && this.passwordСheck
    }
  },
  methods: {
    async submitHandler () {
      if (this.formIsValid) {
        const formData = {
          email: this.email,
          password: this.password
        }
        try {
          await this.$store.dispatch('login', formData)
          this.$router.push('/')
        } catch (e) {}
      }
    }
  }
}
</script>
