import { Delete, Get, Post,Put } from "./ApiRequest";

// User
let login = new Post(true, "http://127.0.0.1:8000/api/login")
let logout = new Get(true, 'http://127.0.0.1:8000/api/logout?email=')
// currencies
let allCurrencies = new Get(true, 'http://127.0.0.1:8000/api/currencies')
let addCurrency = new Post(false, "http://127.0.0.1:8000/api/currencies")
let updateCurrency = new Put(false, "http://127.0.0.1:8000/api/currencies/")
let deleteCurrency = new Delete(false, "http://127.0.0.1:8000/api/currencies/")
// pairs
let allPairs = new Get(true, 'http://127.0.0.1:8000/api/pairs')
let addPairs = new Post(false,'http://127.0.0.1:8000/api/pairs')
let updatePairs = new Put(false,'http://127.0.0.1:8000/api/pairs/')
let deletePairs = new Delete(false, "http://127.0.0.1:8000/api/pairs/")
// conversion
let convert = new Post(false, 'http://127.0.0.1:8000/api/convert')
let conversionSum = new Get(false, 'http://127.0.0.1:8000/api/conversion/sum/')
let conversionHistory = new Get(false, 'http://127.0.0.1:8000/api/conversion/')

export { login, logout, allCurrencies, allPairs, convert, addCurrency, updateCurrency, deleteCurrency,addPairs ,updatePairs,deletePairs,conversionSum,conversionHistory}