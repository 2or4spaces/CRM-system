import { createStore } from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

export default createStore({
  modules: {
    auth, info, category, record
  },
  state: {
    error: null
  },
  getters: {
    error: s => s.error
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    async fetchCurrency () {
      /* Вариант №1. Шаблон, возвращаемый сервером */
      return {
        base: 'EUR',
        date: '2022-08-19',
        rates: {
          EUR: 1,
          RUB: 72.984139,
          USD: 1.121151
        }
      }

      /* Вариант №2, чтобы не превысить 100 запросов / мес
      const key = process.env.VUE_APP_FIXER
      const myHeaders = new Headers()
      myHeaders.append('apikey', `${key}`)

      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      }

      const res = await fetch('https://api.apilayer.com/fixer/latest?symbols=EUR%2CRUB%2CUSD&base=EUR', requestOptions)
      return await res.json() */
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
