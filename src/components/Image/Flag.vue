<template >
    <img :src="link" width="30" alt="">
</template>
<script>
export default {
    props: {
        url: ''
    },
    computed: {
        link() {
            return this.url[0] == "." ? "http://127.0.0.1:8000"+this.url.slice(1) : "http://127.0.0.1:8000"+this.url
             
        }
    },
}
</script>
<style >
    
</style>