<template>
  <!-- right -->
  <div class="container">
    <div class="hero flex-center flex-direction-column   ">
      <Heading level='1' _class="va-text--backgroundBorder ">
        Money Value
      </Heading>
      <Heading level='6' _class="va-text--backgroundBorder ">
        Votre convertisseur de monnaie en ligne
      </Heading>
    </div>

    <!-- left -->
    <div class="login flex-center va-bg--backgroundBorder">
      <div class=" flex-direction-column flex-center " style="height: 40vh;">
        <LoginForm />
      </div>
    </div>

  </div>
</template>

<script>
import LoginForm from '../components/Forms/LoginForm.vue';
import Heading from '../components/Text/Heading.vue';
export default {
  components: {
    Heading,
    LoginForm
  }
}
</script>


<style scoped>

.container{
  display: grid; 
  grid-template-columns: 60% 40%; 
  grid-template-rows: 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "hero login"; 
}
.hero {
  background: rgb(99, 82, 236);
  background: linear-gradient(153deg, rgba(99, 82, 236, 1) 21%, rgba(194, 105, 197, 1) 100%);
  grid-area: hero;
  height: 100vh;
}

.login {
  grid-area: login;
}

@media screen and (max-width : 768px) {
  .hero {
    display: none;
  }

  .login {
    width: 100vw;
  }
}
</style>
