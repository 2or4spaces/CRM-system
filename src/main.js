import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min.js'

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCbPZ5Ih1kHnj4P07cw9MlfdwZL1q3mWmc',
  authDomain: 'crm-system-roman.firebaseapp.com',
  projectId: 'crm-system-roman',
  storageBucket: 'crm-system-roman.appspot.com',
  messagingSenderId: '375389201612',
  appId: '1:375389201612:web:6250cf8dca17a75555ce69'
})

const auth = getAuth(firebaseApp)
const db = getDatabase(firebaseApp)

createApp(App).use(store).use(router).mount('#app')
