import { createApp } from 'vue'
import App from './App.vue'
import { Quasar, Notify } from 'quasar'
import { router } from './router'

//firebase imports
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './services/firebase';
import { getDatabase } from "firebase/database";

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {
    Notify,
  }
})

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

myApp.use(router).mount('#app')