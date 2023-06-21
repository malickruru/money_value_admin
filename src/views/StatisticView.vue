<template >

    <Heading level='3' _class="ma-3">
        Le nombre de conversion par paires de devise
    </Heading>

    <Histogramme/>
    <Heading level='3' _class="ma-3">
        Evolution du nombre de conversion
    </Heading>
    <Courbe/>

</template>
<script>

import Heading from '../components/Text/Heading.vue';
import Histogramme from '../components/Statistique/histogramme.vue'
import Courbe from '../components/Statistique/Courbe.vue';
export default {
    components: { Heading, Histogramme, Courbe }
}
</script>
<style ></style>