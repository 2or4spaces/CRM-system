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

      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: !nameСheck }"
        >
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-if="!nameСheck"
        >Введите имя</small>
      </div>

      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link :to="{ name: 'login' }">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      name: '',
      agree: false
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
    nameСheck () {
      const nameRegExp = /([A-za-z]{4,})/
      return nameRegExp.test(this.name)
    }
  },
  methods: {
    submitHandler () {
      if (this.emailСheck && this.passwordСheck && this.nameСheck && this.agree) {
        this.$router.push('/')
        const formData = {
          email: this.email,
          password: this.password,
          name: this.name
        }
        console.log(formData)
      }
    }
  }
}
</script>
