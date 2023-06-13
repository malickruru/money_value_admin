<template>
  <!-- right -->
  <div class="row">
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


<style>
.hero {
  background: rgb(99, 82, 236);
  background: linear-gradient(153deg, rgba(99, 82, 236, 1) 21%, rgba(194, 105, 197, 1) 100%);
  width: 60vw;
  height: 100vh;
}

.login {
  width: 40vw;
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
