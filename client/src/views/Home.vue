<template>
  <div class="home">
    <router-link :to="{name:'login'}">Login</router-link>
    <router-link :to="{name:'signup'}">Sign Up</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: "home",
  components: {}
};
</script>
