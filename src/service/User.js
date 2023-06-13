
async function login(email, password) {
    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    let response = await fetch("http://127.0.0.1:8000/api/login", requestOptions)
    return response.json()
}

async function logout(email) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://127.0.0.1:8000/api/logout?email="+email, requestOptions)
        .then(response => response.json())
        .then(result => {return result})
        .catch(error => console.log('error', error));
}


export  { login , logout}