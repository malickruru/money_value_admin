// methode pour récupérer un object devise via  le nom  de la devise
export const getCurrencyByName = (from) => {
  return JSON.parse(localStorage.getItem('moneyValueCurrencies')).find(element => element.name === from);
}

// methode pour récupérer un object devise via  le code de la devise
export const getCurrencyByCode = (from) => {
  return JSON.parse(localStorage.getItem('moneyValueCurrencies')).find(element => element.code === from);
}

// methode pour récupérer l'id d'une paire à partir des codes de la devise source (from)
// et de la devise cible (to)
export const getPairId = (from, to) => {
  return JSON.parse(localStorage.getItem('moneyValuePairs')).find(element => element.from.code === from && element.to.code === to).id;
}

// methode pour récupérer un object paire via  l'id
export const getPair = (id) => {
  return JSON.parse(localStorage.getItem('moneyValuePairs')).find(element => element.id === id );
}