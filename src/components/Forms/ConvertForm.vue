<template >
    <va-card style="width: 80%; margin: auto; transform: translateY(-25px);">
        <va-card-title>Convertir 1000 Franc CFA en Euro - XOF en EUR</va-card-title>
        <va-card-content>
            <div class="row justify-space-between" style="flex : 2">
                <va-input style="max-width: 300px;" class="mx-2" placeholder="0.00" label="Montant" type="number">
                    <template #appendInner>
                        <span> £ </span>
                    </template>
                </va-input>

                <SelectPair/>
                <!--  -->


            </div>
            <div style="flex : 1">

            </div>
            <div style="flex : 1">

            </div>
        </va-card-content>
    </va-card>
</template>
<script>
import SelectPair from './SelectPair.vue'
export default {
components: {
    SelectPair,
},
}
</script>
<style ></style>