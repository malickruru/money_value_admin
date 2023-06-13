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
    customClass() {
        return 'va-h'+this.level+' '+this._class
    }
},
}
</script>
<style ></style>