<template>
  <div class="my-team">
    <Header :userPhoto="auth.currentUser?.photoURL" :userName="auth.currentUser?.displayName" :actualRoute="actualRoute"/>
    <div class="container">

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getDatabase, ref as Ref, get, child } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useRoute, useRouter } from "vue-router";
import Header from '../../components/Header/Header.vue'

const resultData = ref()

const auth = getAuth();

const router = useRouter()
const route = useRoute()

const actualRoute = ref(route.path)

const dbRef = Ref(getDatabase());
get(child(dbRef, `users/`)).then((snapshot) => {
  if (snapshot.exists()) {
    let data = snapshot.val()
    resultData.value = Object.values(data)
    resultData.value.sort((a: any, b: any) => {
      return a.power - b.power
    }).reverse()

  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

function getPokemonImg(id: number): string {
  var str = "" + id;
  var pad = "000";
  const ans = pad.substring(0, pad.length - str.length) + str;
  const url = `https://raw.githubusercontent.com/oscarcz7/poke_api/master/src/assets/pokemon/${ans}.png`;
  return url;
}
</script>

<style lang="scss">
.stats {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 1rem 1rem 4rem 1rem;

    margin-top: 2rem;

    width: 70%;
  }
}
</style>