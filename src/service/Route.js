import { Get, Post } from "./ApiRequest";

// User
let login = new Post(true, "http://127.0.0.1:8000/api/login")
let logout = new Get(true, 'http://127.0.0.1:8000/api/logout?email=')
// currencies
let allCurrencies = new Get(false, 'http://127.0.0.1:8000/api/currencies')
// pairs
let allPairs = new Get(false, 'http://127.0.0.1:8000/api/pairs')
// conversion
let convert = new Post(false, 'http://127.0.0.1:8000/api/convert')

export { login, logout, allCurrencies, allPairs, convert }