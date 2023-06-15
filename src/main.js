

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// framework css
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";

const app = createApp(App)

// methode pour récupérer des devises via le code ou le nom
app.config.globalProperties.getCurrencyByName = (from) => {
    return JSON.parse(localStorage.getItem('moneyValueCurrencies')).find(element => element.name === from);
  }

app.config.globalProperties.getCurrencyByCode = (from) => {
return JSON.parse(localStorage.getItem('moneyValueCurrencies')).find(element => element.code === from);
}

app.config.globalProperties.getPairId = (from,to) => {
  return JSON.parse(localStorage.getItem('moneyValuePairs')).find(element => element.from === from && element.to === to).id;
  }



app.use(router)
app.use(createVuestic())


app.mount('#app')







