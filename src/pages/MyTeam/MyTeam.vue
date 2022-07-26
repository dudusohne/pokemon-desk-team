<template>
  <div class="my-team">
    <Header :userPhoto="auth.currentUser?.photoURL" :userName="auth.currentUser?.displayName"
      :actualRoute="actualRoute" />
    <div class="container">
      <span class="container-title">YOUR TEAM</span>
      <q-separator style="margin-bottom: 1rem; margin-top: 1rem;" color="white" />
      <div style="display: flex; flex-direction: row">
        <TeamPokeCard v-for="(pokemon, i) in resultData?.team" :key="i" :pokemon="pokemon" />
      </div>
      <q-separator style="margin-bottom: 0.4rem; margin-top: 1rem;" color="green" />
      <div class="team-power">
        <span>TEAM POWER:</span>
        <p>340</p>
      </div>
      <q-separator color="green" />
      <span class="container-desc">you can roll and get a new team</span>
      <q-btn label="ROLL" color="yellow" text-color="black" style="margin-top: 1rem" />
    </div>
    <BottomBar />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getDatabase, ref as Ref, get, child } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useRoute } from "vue-router";
import Header from '../../components/Header/Header.vue'
import TeamPokeCard from "../../components/TeamPokeCard/TeamPokeCard.vue";
import BottomBar from "../../components/BottomBar/BottomBar.vue"

const resultData = ref()

const auth = getAuth();

const route = useRoute()

const actualRoute = ref(route.path)

const dbRef = Ref(getDatabase());
get(child(dbRef, `users/${auth.currentUser?.uid}`)).then((snapshot) => {
  if (snapshot.exists()) {
    resultData.value = snapshot.val()
    return resultData.value.team
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
</script>

<style lang="scss" scoped>
.my-team {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .container {
    display: flex;
    flex-direction: column;

    margin-top: 3rem;

    .container-title {
      font-size: 1.6rem;
      font-weight: bold;
      color: white;
    }

    .container-desc {
      font-size: 1rem;
      font-weight: medium;
      color: #ffeb3b71;

      margin-top: 2.5rem;
    }

    .team-power {
      display: flex;
      flex-direction: column;

      span {
        font-size: 0.5rem;
        font-weight: medium;
        color: rgb(199, 199, 199);
      }

      p {
        font-size: 2.5rem;
        font-weight: bold;
        color: rgb(123, 221, 101);
      }
    }
  }
}
</style>