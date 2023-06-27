// cette classe permet d'isoler le code permettant de faire 
// une requete afin de le rappeler plus aisement dans les composant vue

class ApiRequest {

    constructor(isPublic, url, method, HasBody) {
        this.isPublic = isPublic; // la requête necessite t'elle une authentification ?
        this.method = method; // méthode de la requête 
        this.url = url; // url de la requête
        this.HasBody = HasBody; // les paramètres requête necessitent t'ils une une propriété body  ?
        this.bodyContent = {} // corps de la requête (vide par défaut)
    }

    // cette méthode retourne les entêtes 
    getHeaders(){
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + localStorage.getItem("moneyValueToken"));
        return headers
    }

    // cette méthode retourne le corps
    getBody() {
        return null
    }


    requestOptions() {
        let option = {}
        //header
        if (!this.isPublic) {
            option.headers = this.getHeaders();
        }
        // method
        option.method = this.method;
        //body
        if (this.HasBody) {
            option.body = this.getBody()
        }
        // redirect
        option.redirect = 'follow'
        
        return option
    }

    async getResponse(UrlParams = "", bodyContent = {}) {
        //retourne une réponse au format json
        // si url UrlParams et/ou bodyContent ne sont pas vide , modifier les informations
        // de la requête
        let finalUrl = this.url + UrlParams
        this.bodyContent = bodyContent
        let response = await fetch(finalUrl, this.requestOptions());
        return response.json();
    }
}

// méthode de type GET 
class Get extends ApiRequest {
    constructor(isPublic, url) {
        super(isPublic, url, 'GET', false)
    }
}

// méthode de type POST 
class Post extends ApiRequest {
    constructor(isPublic, url) {
        super(isPublic, url, 'POST', true)
    }

    // le corp de la requête est de type formData
    getBody() {
        var formdata = new FormData();
        for (let key in this.bodyContent) {
            formdata.append(key, this.bodyContent[key]);
        }
        return formdata;
    }
}

// méthode de type PUT 
class Put extends ApiRequest {
    constructor(isPublic, url) {
        super(isPublic, url, 'PUT', true)
    }
// le corp de la requête est de type URLSearchParams
    getHeaders(){
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + localStorage.getItem("moneyValueToken"));
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        
        return headers
    }

    getBody() {
        let urlencoded = new URLSearchParams();
        for (let key in this.bodyContent) {
            if (this.bodyContent[key] != '') {
                urlencoded.append(key, this.bodyContent[key]);
            }
        }
        return urlencoded;
    }
}

// méthode de type Delete 
class Delete extends ApiRequest {
    constructor(isPublic, url) {
        super(isPublic, url, 'DELETE', true)
    }

    getBody() {
        return new URLSearchParams();
    }
}

export {
    Get,
    Post,
    Put,
    Delete
}