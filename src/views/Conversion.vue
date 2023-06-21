<script >
import ConvertForm from '../components/Forms/ConvertForm.vue';
import Heading from '../components/Text/Heading.vue';

export default {
    components: { ConvertForm, Heading }
}
</script>

<template>
  <div style="height: 40vh;background: rgb(99,82,236);
background: linear-gradient(153deg, rgba(99,82,236,1) 21%, rgba(194,105,197,1) 100%);" class="flex-center">

<Heading class="va-text--backgroundBorder" level='3' >Outil de conversion</Heading>
  </div>
  <ConvertForm/>
</template>
