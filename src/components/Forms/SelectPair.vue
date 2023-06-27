<template >
    <va-select class="mx-2" style="max-width: 300px;" label="De"  v-model="from" :options="codeCurrencies" searchable
        highlight-matched-text>
        <template #option="{ option, index, selectOption }">
            <div class="d-flex justify-space-between items-center  options" @click="selectOption(option)">
                <div>
                    <Flag :url="this.getCurrencyByName(option).flag" />
                    <span class="pl-3">
                        {{ option }}
                    </span>
                </div>
                <b>{{ this.getCurrencyByName(option).code }}</b>
            </div>
        </template>
    </va-select>
    <va-icon class="mx-2" name="compare_arrows" color="primary" />
    <va-select class="mx-2" style="max-width: 300px;" label="Vers" v-model="to" :options="codePairs" searchable
        highlight-matched-text>
        <template #option="{ option, index, selectOption }">
            <div class="d-flex justify-space-between items-center  options" @click="selectOption(option)">
                <div>
                    <Flag :url="this.getCurrencyByName(option).flag" />
                    <span class="pl-3">
                        {{ option }}
                    </span>
                </div>
                <b>{{ this.getCurrencyByName(option).code }}</b>
            </div>
        </template>
    </va-select>
  
    <va-button v-show="(from != '') && (showClear )  " @click="from = '' "  color="danger" class="ml-3"> réintialiser </va-button>

</template>
<script>
import Flag from '../Image/Flag.vue';
export default {
    components: {
        Flag,
    },
    props : ['showClear','hasDefaultValue'],
    emits: ['setFrom', 'setTo'],
    data() {
        return {
            // si hasDefaultValue est vrai alors les devises auront une valeur par défaut 
            // lors du montage du composant
            to: this.hasDefaultValue ?'Euro' : '',
            from: this.hasDefaultValue ?  'Franc CFA' :'',
            currencies: JSON.parse(localStorage.getItem('moneyValueCurrencies')),
            pairs: JSON.parse(localStorage.getItem('moneyValuePairs')),
        }
    },
    computed: {
        // retourne un tableau composé des nom de devise
        codeCurrencies() {
            return this.currencies.map(element => element.name)
        },

        // retourne toutes les monnaies lié a la monnaie source (from) via une pair
        codePairs() {
            let match = this.pairs.filter(element => element.from.name == this.from)
            // retourne un tableau composé des nom de devise
            return match.map(element => element.to.name)
        },
    },
    watch:{
        // lorsque la monnaie source change de valeur , changer sa valeur dans le composant parent
        from(newValue){
            this.$emit('setFrom', newValue)
            this.to = ''
        },
            // lorsque la monnaie cible change de valeur , changer sa valeur dans le composant parent
        to(newValue){
            this.$emit('setTo', newValue)
        }
    },

}
</script>
<style >
.options {
    cursor: pointer;
    padding: 15px;
}
</style>