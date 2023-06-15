class ApiRequest {

    constructor(isPublic, url, method, HasBody) {
        this.isPublic = isPublic;
        this.method = method;
        this.url = url;
        this.HasBody = HasBody;
        this.bodyContent = {}
    }

    getHeaders(){
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + localStorage.getItem("moneyValueToken"));
        return headers
    }

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
        let finalUrl = this.url + UrlParams
        this.bodyContent = bodyContent
        let response = await fetch(finalUrl, this.requestOptions());
        return response.json();
    }
}

class Get extends ApiRequest {
    constructor(isPublic, url) {
        super(isPublic, url, 'GET', false)
    }
}

class Post extends ApiRequest {
    constructor(isPublic, url) {
        super(isPublic, url, 'POST', true)
    }

    getBody() {
        var formdata = new FormData();
        for (let key in this.bodyContent) {
            formdata.append(key, this.bodyContent[key]);
        }
        return formdata;
    }
}


class Put extends ApiRequest {
    constructor(isPublic, url) {
        super(isPublic, url, 'PUT', true)
    }

    getHeaders(){
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + localStorage.getItem("moneyValueToken"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        return headers
    }

    getBody() {
        let urlencoded = new URLSearchParams();
        for (let key in this.bodyContent) {
            urlencoded.append(key, this.bodyContent[key]);
        }
        return urlencoded;
    }
}

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