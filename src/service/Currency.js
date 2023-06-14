async function allCurrencies() {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("moneyValueToken"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let response = await fetch("http://127.0.0.1:8000/api/currencies", requestOptions)
    return response.json()
}

export { allCurrencies }