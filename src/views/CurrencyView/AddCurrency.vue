<template >
    <va-button @click="show = !show">Ajouter</va-button>

    <va-modal v-model="show" hide-default-actions blur size="large">

        <template #content="{ ok }">
            <va-card-actions align="right">
                <va-button color="danger" @click="ok">
                    <va-icon name="close" />
                </va-button>
            </va-card-actions>
            <va-card-title style="font-size: large;"> Ajouter une devise </va-card-title>
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
                <label for="file" class="label-file mb-2">Drapeau</label>
                <va-file-upload  v-model="img" dropzone />
                <va-button @click="submit" :loading="isLoading">Ajouter</va-button>
            </va-card-content>

        </template>

    </va-modal>
</template>
<script>
import { addCurrency } from '../../service/Route';



export default {


    emits: ['updateTable'],
    data() {
        return {
            show: false,
            data: {
                name: '',
                code: '',
                symbol: '',
                flag : null
            },
            img: [],
            isLoading: false,
            error : false
        }
    },
    methods: {
        async submit() {
            if (!this.error && this.data.flag ) {
                this.isLoading = true
                let res = await addCurrency.getResponse("", this.data);
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
        img(newValue, oldValue) {
            this.data.flag = newValue[0]
        }
    },
}
</script>
<style >

</style>