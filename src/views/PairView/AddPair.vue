<template >
    <va-button @click="show = !show">Ajouter</va-button>

    <va-modal v-model="show" hide-default-actions blur size="large">

        <template #content="{ ok }">
            <va-card-actions align="right">
                <va-button color="danger" @click="ok">
                    <va-icon name="close" />
                </va-button>
            </va-card-actions>
            <va-card-title style="font-size: large;"> Ajouter une paire de devise </va-card-title>
            <va-progress-bar v-show="isLoading" indeterminate />
            <va-card-content class="d-flex flex-direction-column">
                <label class="label-file mb-2">Devise source</label>
                <br>
                <va-select searchable 
                v-model="from"
                :options="currencyOption" 
                class="mb-4" />

                <label class="label-file mb-2">Devise cible</label>
                <br>
                <va-select searchable 
                v-model="to"
                :options="dynamicOption" 
                class="mb-4" />

                <va-input type="text" v-model="data.change_rate" class="mb-4" :rules="[(v) => v != '' || `Champs requis`]"
                    label="Taux de change"  />

                <va-button @click="submit" :loading="isLoading">Ajouter</va-button>
            </va-card-content>

        </template>

    </va-modal>
</template>
<script>
import { addPairs } from '../../service/Route';

export default {


    emits: ['updateTable'],
    data() {
        return {
            show: false,
            data: {
                from: '',
                to: '',
                change_rate: '',
            },
            from : '',
            to : '',
            currencyOption : JSON.parse(localStorage.getItem('moneyValueCurrencies')).map(element => element.name),
            // dynamicOption represente les options de monnaie qui ne sont pas lié a la devise source
            dynamicOption : [],
            isLoading: false,
        }
    },
    methods: {
        

        async submit() {
            if (this.data.from && this.data.to && this.data.change_rate) {

                this.isLoading = true
                let res = await addPairs.getResponse("", this.data);
                if (res.status == 200) {
                    this.$emit('updateTable')
                    this.$vaToast.init({ message: res.message, position: 'bottom-right', color: 'success' })
                }else{
                    this.$vaToast.init({ message: res.message, position: 'bottom-right', color: 'danger' })
                }
                this.isLoading = false
                this.show = false

            } else {
                this.$vaToast.init({ message: "Remplissez tous les champs svp", position: 'bottom-right', color: 'danger' })
            }
        },
    },
    watch: {
        // a chaque fois que la devise source (from) change de value ,
        // retourner toute les devise n'etant pas lié a celle ci
        from(newValue, oldValue) {
            // récupérer le code de la devise source
            this.data.from = this.getCurrencyByName(newValue).code
            // récupérer le nom des devise lié à la devise source
            let match = JSON.parse(localStorage.getItem('moneyValuePairs')).filter(element => element.from.name == newValue);
            let matchObject = match.map((e) => e.to.name)

            // les devise non-lié à la devise source sont récupéré dans le tableau unpairs
            let unPairs = JSON.parse(localStorage.getItem('moneyValueCurrencies')).filter(element => !matchObject.includes(element.name) && element.name != newValue )
            // récupérer le nom de ces devises
            this.dynamicOption = unPairs.map(element => element.name)
        },
        to(newValue, oldValue){
            this.data.to = this.getCurrencyByName(newValue).code
        }
    },
}
</script>
<style ></style>