<template >
    
        <va-select class="mx-2" style="max-width: 300px;" label="De" v-model="from" :options="codeCurrencies" searchable highlight-matched-text>
            <template #option="{ option, index, selectOption }">
                <div class="flex justify-between items-center  options" @click="selectOption(option)">
                    <Flag :url="currency(option).flag" />
                    {{ option }}
                    {{ currency(option).code }}
                </div>
            </template>
        </va-select>
        <va-icon class="mx-2" name="compare_arrows"  color="primary" />
        <va-select class="mx-2" style="max-width: 300px;" label="Vers" v-model="to" :options="codePairs" searchable highlight-matched-text>
            <template #option="{ option, index, selectOption }">
                <div class="flex justify-between items-center  options" @click="selectOption(option)">
                    <Flag :url="currency(option).flag" />
                    {{ option }}
                    {{ currency(option).code }}
                </div>
            </template>
        </va-select>
    
</template>
<script>
import Flag from '../Image/Flag.vue';
export default {
    components: {
        Flag,
    },
    data() {
        return {
            to: '',
            from: 'Franc CFA',
            currencies: JSON.parse(localStorage.getItem('moneyValueCurrencies')),
            pairs: JSON.parse(localStorage.getItem('moneyValuePairs')),
        }
    },
    computed: {
        codeCurrencies() {
            return this.currencies.map(element => element.name)
        },

        codePairs() {
            let match = this.pairs.filter(element => element.from == this.currency(this.from).code)
            // return match
            return match.map(element => this.currencyByCode(element.to).name)
        },

    },
    methods: {
        currency(from) {
            return this.currencies.find(element => element.name === from);
        },

        currencyByCode(from) {
            return this.currencies.find(element => element.code === from);
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