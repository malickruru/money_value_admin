// methode pour récupérer des devises via le code ou le nom
export const getCurrencyByName = (from) => {
  return JSON.parse(localStorage.getItem('moneyValueCurrencies')).find(element => element.name === from);
}

export const getCurrencyByCode = (from) => {
  return JSON.parse(localStorage.getItem('moneyValueCurrencies')).find(element => element.code === from);
}

export const getPairId = (from, to) => {
  return JSON.parse(localStorage.getItem('moneyValuePairs')).find(element => element.from.code === from && element.to.code === to).id;
}

export const getPair = (id) => {
  return JSON.parse(localStorage.getItem('moneyValuePairs')).find(element => element.id === id );
}