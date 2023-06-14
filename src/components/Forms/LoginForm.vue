<template >
    <Heading level='3' _class="mb-5">
        Connexion
    </Heading>
    <va-input v-model="email" label="Email" placeholder="entrez votre mail" />
    <va-input v-model="password" type="password" label="Mot de passe" placeholder="entrez votre mot de passe" />
    <va-button @click="log" :loading="isLoading"> Connexion </va-button>
</template>
<script>
import Heading from '../Text/Heading.vue'
import { login } from '../../service/User'
import { allCurrencies } from '../../service/Currency'
import { allPairs } from '../../service/Pairs'
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
            let res = await login(this.email, this.password);
            if (res.status != 200) {
                this.$vaToast.init({ message: res.message, position: 'bottom-right', color: 'danger' })
            } else {
                localStorage.setItem("moneyValueToken", res.data.token);
                localStorage.setItem("moneyValueEmail", this.email);
                if (!localStorage.getItem("moneyValueCurrencies")) {
                    let res = await allCurrencies();
                    localStorage.setItem("moneyValueCurrencies", JSON.stringify(res.data))
                }
                if (!localStorage.getItem("moneyValuePairs")) {
                    let res = await allPairs();
                    localStorage.setItem("moneyValuePairs", JSON.stringify(res.data))
                }
                this.$router.push("/")
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