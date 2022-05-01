<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import Home from '../src/pages/Home/Home.vue';
import { useRouter, useRoute } from 'vue-router'
import firebase from 'firebase/auth';

const router = useRouter();
const route = useRoute();
// onBeforeMount(() => {
//   firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       router.push('/home');
//     } else {
//       router.push('/');
//     }
//   });
// })
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
