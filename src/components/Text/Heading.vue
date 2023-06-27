<template >
    <h1 :class="customClass">
        <slot></slot>
    </h1>
</template>
<script>
export default {
props: {
    level:'',
    _class:''
},

computed: {
    // formater la class , 
    //level correspond a la taille du titre allant de 1 le plus gros à 6
    customClass() {
        return 'va-h'+this.level+' '+this._class
    }
},
}
</script>
<style ></style>