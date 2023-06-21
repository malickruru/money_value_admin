<template >
    <va-button preset="plain" icon="edit"  @click="show = !show" />

    <va-modal v-model="show" hide-default-actions blur size="large">

        <template #content="{ ok }">
            <va-card-actions align="right">
                <va-button color="danger" @click="ok">
                    <va-icon name="close" />
                </va-button>
            </va-card-actions>
            <va-card-title style="font-size: large;"> Modifier une devise </va-card-title>
            <va-progress-bar v-show="isLoading" indeterminate />
            <va-card-content class="d-flex flex-direction-column">
                <va-input type="text" v-model="data.name" class="mb-4" :rules="[(v) => v != '' || `Champs requis`]"
                    label="Nom de la devise" 
                    @update:error="(e) => { error = e }"
                    />
                <va-input type="text" v-model="data.code" class="mb-4"
                    :rules="[(v) => v != '' || `Champs requis`, (v) => v.length == 3 || `le code doit avoir 3 caractères`]"
                    label="Code de la devise" 
                    @update:error="(e) => { error = e }"/>
                <va-input type="text" v-model="data.symbol" class="mb-4" :rules="[(v) => v != '' || `Champs requis`]"
                    label="Symbole de la devise" 
                    @update:error="(e) => { error = e }"/>
                    <va-button @click="submit" :loading="isLoading">Ajouter</va-button>
            </va-card-content>

        </template>

    </va-modal>
</template>
<script>
import { updateCurrency } from '../../service/Route';



export default {
    props: ['item'],
    emits: ['updateTable'],
    data() {
        return {
            show: false,
            data: {
                name: this.item.name,
                code: this.item.code,
                symbol: this.item.symbol,
            },
            isLoading: false,
            error : false
        }
    },
    methods: {
        async submit() {
            if (!this.error && this.data ) {
                this.isLoading = true
                let res = await updateCurrency.getResponse(this.item.code, this.data);
                if (res.status == 200) {
                    this.$emit('updateTable')
                    this.isLoading = false
                    this.show = false
                    this.$vaToast.init({ message: res.message, position: 'bottom-right', color: 'success' })
                    return
                }
                this.$vaToast.init({ message: "une erreur c'est produite", position: 'bottom-right', color: 'danger' })

            } else {
                this.$vaToast.init({ message: "Remplissez tous les champs svp", position: 'bottom-right', color: 'danger' })
            }
        },
    }
}
</script>
<style >

</style>