<template >
    <Heading level='3' _class="mb-5">
        Connexion
    </Heading>
    <va-input v-model="email" label="Email" placeholder="entrez votre mail" />
    <va-input v-model="password" type="password" label="Mot de passe" placeholder="entrez votre mot de passe" />
    <va-button @click="log" :loading="isLoading"> Connexion </va-button>
</template>
<script>
import { allCurrencies, allPairs, login } from '../../service/Route'
import Heading from '../Text/Heading.vue'

export default {
    components: {
        Heading,
    },
    data() {
        return {
            email: '',
            password: '',
            isLoading: false
        }
    },
    methods: {
        async log() {
            this.isLoading = true
            let res = await login.getResponse("",{"email" : this.email , "password" : this.password})
            if (res.status != 200) {
                this.$vaToast.init({ message: res.message, position: 'bottom-right', color: 'danger' })
            } else {
                // stocker le token et l'email lorsque la connexion est réussit
                localStorage.setItem("moneyValueToken", res.data.token);
                localStorage.setItem("moneyValueEmail", this.email);
                this.$router.push("/admin")
            }
            this.isLoading = false
        }
    },
}
</script>
<style >
.va-h3 {
    text-align: center;
}
</style>