<template >
    <div style="padding: 30px;">
        <Heading level='3' _class="mb-3">
            Liste des devises
        </Heading>

        <div class="d-flex  pa-3">

            <div>
                <va-input v-model="query" placeholder="Rechercher..." class="w-full" />
            </div>
            <div class="pl-4">
                <AddCurrency @update-table="updateTable" />
            </div>
        </div>


        <va-data-table class="table-crud" :items="item"
            :columns="[{ key: 'flag' }, { key: 'code', sortable: true }, { key: 'name', sortable: true }, { key: 'symbol' }, { key: 'actions', sortable: true }]"
            :filter="query"
            :per-page="perPage" 
            :current-page="currentPage" 
            @filtered="filtered = $event.items" 
            striped>
            <template #cell(flag)="{ value }">
                <Flag :url="value" />
            </template>

            <template #cell(actions)="{ rowIndex }">
                <div class="d-flex">
                    <EditCurrency @update-table="updateTable" :item="item[rowIndex]" />
                    <DeleteCurrency @update-table="updateTable" :item="item[rowIndex]" />

                </div>
            </template>
            <template #bodyAppend>
                <tr>
                    <td colspan="6">
                        <div class="flex-center mt-4">
                            <va-pagination v-model="currentPage" :pages="pages" />
                        </div>
                    </td>
                </tr>
            </template>
        </va-data-table>

    </div>
</template>
<script>

import Heading from '../../components/Text/Heading.vue';
import Flag from '../../components/Image/Flag.vue';
import { allCurrencies, allPairs } from '../../service/Route'
import AddCurrency from './AddCurrency.vue';
import EditCurrency from './EditCurrency.vue';
import DeleteCurrency from './DeleteCurrency.vue';


export default {
    components: {
        Heading,
        Flag,
        AddCurrency,
        EditCurrency,
        DeleteCurrency
    },

    data() {
        return {
            item: JSON.parse(localStorage.getItem('moneyValueCurrencies')),
            query: '',
            filtered: JSON.parse(localStorage.getItem('moneyValueCurrencies')),
            currentPage: 1,
            perPage: 10
        }
    },
    methods: {
        // mettre à jour le tableau de devise
        async updateTable() {
            let res = await allCurrencies.getResponse();
            this.item = res.data
            if (res.status == 200) {
                localStorage.setItem("moneyValueCurrencies", JSON.stringify(res.data))
            } else {
                this.$vaToast.init({ message: 'échec lors de la mise à jour des devises', position: 'bottom-right', color: 'danger' })
            }
        },


    },
    computed: {
        // retourne le nombre total de page
        pages() {
            return this.perPage && this.perPage !== 0
                ? Math.ceil(this.filtered.length / this.perPage)
                : this.filtered.length;
        }
    }
}
</script>
<style ></style>