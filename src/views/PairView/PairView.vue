<template >
    <div style="padding: 30px;">
        <Heading level='3' _class="mb-3">
        Liste des paires de devise
    </Heading>
        <div class="d-flex  pa-3">
            <div>

                <SelectPair @setFrom="setFrom" @setTo="setTo" :show-clear="true" :hasDefaultValue="false" />
            </div>


            <div class="pl-4">
                <AddPair  @update-table="updateTable" />
            </div>
        </div>

       

        <va-data-table class="table-crud" :items="item"
        :columns="[
            { key: 'from.name', label: 'Devise source', sortable: true },
            { key: 'to.name', label: 'Devise cible', sortable: true },
            { key: 'change_rate', label: 'Taux de change', },
            { key: 'actions' }]" 
            :per-page="perPage" :current-page="currentPage" @filtered="filtered = $event.items" striped>
            

            <template #cell(actions)="{ rowIndex }">
                <div class="d-flex">
                    <EditPair @update-table="updateTable" :item="item[rowIndex]" />
                    <DeletePair @update-table="updateTable" :item="item[rowIndex]"  />

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
import { allPairs } from '../../service/Route';
import SelectPair from '../../components/Forms/SelectPair.vue';
import AddPair from './AddPair.vue';
import EditPair from './EditPair.vue';
import DeletePair from './DeletePair.vue';




export default {
    components: {
    Heading,
    SelectPair,
    AddPair,
    EditPair,
    DeletePair
},

    data() {
        return {
            item: JSON.parse(localStorage.getItem('moneyValuePairs')),
            filtered: JSON.parse(localStorage.getItem('moneyValuePairs')),
            currentPage: 1,
            perPage: 10
        }
    },
    methods: {
        setFrom(v) {
            if (v != "") {
                this.item = JSON.parse(localStorage.getItem('moneyValuePairs')).filter(
                    (e) => e.from.name == v
                )
               
            }else{
                this.item = JSON.parse(localStorage.getItem('moneyValuePairs'))
            } 
        },
        setTo(v) {
            if (v != "") {
                this.item = this.item.filter((e) => e.to.name == v
            )
            }

        },
        async updateTable() {
            let res = await allPairs.getResponse();
            this.item = res.data
            localStorage.setItem("moneyValuePairs", JSON.stringify(res.data))
        },
        
        
    },
    computed: {
        pages() {
            return this.perPage && this.perPage !== 0
                ? Math.ceil(this.item.length / this.perPage)
                : this.item.length;
        }
    }
}
</script>
<style ></style>