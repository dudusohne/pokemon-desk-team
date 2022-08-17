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
      <div v-show="newTeam.length < 5" style="display: flex; flex-direction: column;">
        <span class="container-desc">you can roll and get a new team</span>
        <q-btn label="ROLL" color="yellow" text-color="black" style="margin-top: 1rem" @click="generateRandomTeam()" />
      </div>
    </div>
    <BottomBar />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { getDatabase, ref as Ref, get, set, child } from "firebase/database";
import { getAuth } from "firebase/auth";
import Header from '../../components/Header/Header.vue'
import TeamPokeCard from "../../components/TeamPokeCard/TeamPokeCard.vue";
import BottomBar from "../../components/BottomBar/BottomBar.vue"
import { useRouter, useRoute } from "vue-router";

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

const newTeam = ref<any>([])

function generateRandomTeam() {
  for (var i = 1; i <= 6; i++) {
    getRandomIntNoDuplicates(1, 10, newTeam.value)
  }

  function inArray(arr: any, el: any) {
    for (var i = 0; i < arr.length; i++)
      if (arr[i] == el) return true;
    return false;
  }

  function getRandomIntNoDuplicates(min: any, max: any, newTeamArr: any): any {
    var RandomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    if (newTeamArr.length > (max - min)) return false;  // break endless recursion
    if (!inArray(newTeamArr, RandomInt)) {
      newTeam.value.push(RandomInt);
      console.log(newTeam.value);
    }
  }

  saveTeam()
}

function saveTeam() {
  const user = auth.currentUser;
  const userId: any = user?.uid;
  const userEmail: string | any = user?.email;
  const userName = user?.displayName;
  const userPhoto = user?.photoURL;
  const userTeam: any = newTeam.value;

  const power = ref()

  power.value = userTeam.reduce((result: any, item: any) => {
    return result + item?.base_experience
  }, 0)

  const db = getDatabase();

  try {
    set(Ref(db, `users/` + userId), {
      email: userEmail,
      name: userName,
      photo: userPhoto,
      team: userTeam,
      power: power.value
    });

    alert('NEW TEAM SAVED')
  } catch (e) {
    console.log(e);
  }
}

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

    margin-top: 2rem;

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