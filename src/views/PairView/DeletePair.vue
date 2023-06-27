<template >
    <va-button preset="plain" color="danger" icon="delete" class="ml-3" @click="show = !show" />

    <va-modal v-model="show" hide-default-actions blur>

        <template #content="{ ok }">
            <va-card-actions align="right">
                <va-button color="danger" @click="ok">
                    <va-icon name="close" />
                </va-button>
            </va-card-actions>
            <va-progress-bar v-show="isLoading" indeterminate />
            <va-card-title style="font-size: large;"> Êtes-vous sûr de vouloir supprimer cette paire ? </va-card-title>
            <va-card-content class="d-flex justify-space-around">
                <va-button @click="show = !show" preset="plain" >Non</va-button>
                <va-button @click="submit" color="danger">Supprimer</va-button>
            </va-card-content>

        </template>

    </va-modal>
</template>
<script>
import { deletePairs } from '../../service/Route';



export default {
    
    props: ['item'],
    emits : ['updateTable'],
    data() {
        return {
            show: false,
            isLoading: false
        }
    },

    methods: {
        
        async submit() {
                this.isLoading = true
                let res = await deletePairs.getResponse(this.item.id);
                if (res.status == 200) {
                    this.$emit('updateTable')
                    this.$vaToast.init({ message: res.message, position: 'bottom-right', color: 'success' })
                }else{
                    this.$vaToast.init({ message: res.message, position: 'bottom-right', color: 'danger' })
                }
                this.isLoading = false
                this.show = false
        }
    },
   

}
</script>
<style >
.label-file {
    cursor: pointer;
    color: #00b1ca;
    font-weight: bold;
    display: block;
}

.label-file:hover {
    color: #25a5c4;

}
</style>