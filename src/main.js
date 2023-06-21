

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// framework css
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import "./assets/main.css"
import { getCurrencyByCode, getCurrencyByName, getPairId, getPair } from './utils/Data';

const app = createApp(App)

// methode pour récupérer des devises via le code ou le nom
app.config.globalProperties.getCurrencyByName = getCurrencyByName

app.config.globalProperties.getCurrencyByCode = getCurrencyByCode

app.config.globalProperties.getPairId = getPairId

app.config.globalProperties.getPair = getPair



app.use(router)
app.use(createVuestic())


app.mount('#app')







