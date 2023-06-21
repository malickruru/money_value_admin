<template >
    <va-card style="width: 60%; margin: auto; transform: translateY(-30%);">
        <va-card-title style="font-size:large; text-align: center;">Convertir {{ amount }} {{ from }} en {{ to }}
        </va-card-title>
        <va-card-content>
            <div class="row justify-space-between" style="flex : 2">
                <va-input style="max-width: 300px;" min="0" v-model="amount" class="mx-2" placeholder="0.00" label="Montant"
                    type="number">
                    <template #appendInner>
                        <span> {{ getCurrencyByName(from).symbol }} </span>
                    </template>
                </va-input>

                <SelectPair @setFrom="setFrom" @setTo="setTo" :hasDefaultValue="true" />
                <!--  -->
            </div>
            <div class="row">
                <VaSkeletonGroup v-if="isLoading" animation="wave" :delay="0" style="flex : 1"
                    class="align-start flex-center flex-direction-column pa-5">
                    <VaSkeleton variant="text" class="ml-2 va-text" :lines="2" width="100px" />
                </VaSkeletonGroup>
                <div v-else style="flex : 1" class="flex align-start flex-center flex-direction-column pa-5">
                    <span>
                        {{ operation }}
                    </span>
                    <Heading level='3' _class="mb-5">
                        {{ result }}
                    </Heading>
                </div>

                <div style="flex : 1" class="flex-center flex-direction-column pa-5">
                    <VaSkeletonGroup v-if="isLoading" animation="wave" :delay="0">
                        <VaSkeleton variant="rounded" inline width="64px" height="32px" />
                    </VaSkeletonGroup>
                    <va-button v-else @click="ToConvert">Convertir</va-button>
                </div>
            </div>

        </va-card-content>
    </va-card>
</template>
<script>
import SelectPair from './SelectPair.vue'
import Heading from '../Text/Heading.vue'
import { convert } from '../../service/Route'


export default {
    components: {
        SelectPair,
        Heading,
    },
    data() {
        return {
            to: 'Euro',
            from: 'Franc CFA',
            amount: 0,
            isLoading: false,
            // resultat de convertion
            operation: '',
            result: ''
        }
    },
    

    methods: {
        setFrom(v) {
            this.from = v
        },
        setTo(v) {
            this.to = v
        },
        async ToConvert() {
            if (!this.amount) {
                this.$vaToast.init({ message: 'veuillez entrer un montant supérieur à 0', position: 'bottom-right', color: 'danger' })
                return
            } else if (!this.to) {
                this.$vaToast.init({ message: 'veuillez choisir une devise cible', position: 'bottom-right', color: 'danger' })
                return
            }
            this.isLoading = true
            let res = await convert.getResponse('', {
                'amount': this.amount,
                'pair_id': this.getPairId(
                    this.getCurrencyByName(this.from).code,
                    this.getCurrencyByName(this.to).code
                )
            })
            // this.result = res.data.result
            this.isLoading = false
            this.operation = `${this.amount} ${this.getCurrencyByName(this.from).symbol} =`
            this.result = `${res.data.result} ${this.getCurrencyByName(this.to).symbol} `

        }
    },
}
</script>
<style ></style>