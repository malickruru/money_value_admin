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
</template>
<script>
import Flag from '../Image/Flag.vue';
export default {
    components: {
        Flag,
    },
    emits: ['setFrom', 'setTo'],
    data() {
        return {
            to: 'Euro',
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
            let match = this.pairs.filter(element => element.from == this.getCurrencyByName(this.from).code)
            // return match
            return match.map(element => this.getCurrencyByCode(element.to).name)
        },
    },
    watch:{
        from(newValue){
            this.$emit('setFrom', newValue)
            this.to = ''
        },
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