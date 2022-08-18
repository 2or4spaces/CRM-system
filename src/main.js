import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min.js'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

firebase.initializeApp({
  apiKey: 'AIzaSyCbPZ5Ih1kHnj4P07cw9MlfdwZL1q3mWmc',
  authDomain: 'crm-system-roman.firebaseapp.com',
  projectId: 'crm-system-roman',
  storageBucket: 'crm-system-roman.appspot.com',
  messagingSenderId: '375389201612',
  appId: '1:375389201612:web:6250cf8dca17a75555ce69'
})

let appFirebase

firebase.auth().onAuthStateChanged(() => {
  if (!appFirebase) {
    appFirebase = createApp(App).use(store).use(router).mount('#app')
  }
})
