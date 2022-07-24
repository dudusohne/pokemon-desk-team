<template>
  <div class="stats">
    <Header :userPhoto="auth.currentUser?.photoURL" :userName="auth.currentUser?.displayName" :actualRoute="actualRoute" />
    <div class="container">
      <span class="stats-title">RANKING</span>
      <div :key="i" v-for="(stats, i) in resultData" class="stats-list">
        <q-avatar>
          <img :src="stats.photo" v-if="stats.photo">
        </q-avatar>
        <span>{{ stats.name }}</span>
        <q-separator vertical style="margin-right: 0.7rem;" color="cyan" />
        <img v-for="team in stats.team" :src="getPokemonImg(team.id)" alt="image" />
        <q-separator vertical style="margin-left: 0.7rem;" color="cyan" />
        <p v-if="!!stats.power">{{ stats.power }} pts</p>
      </div>
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

    .stats-title {
      font-size: 2rem;
      font-style: italic;
      align-self: center;
      font-weight: bold;
      color: rgb(255, 255, 255);
    }

    .stats-list {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      margin-top: 0.4rem;

      border-radius: 12px;
      border: 1px solid #333;
      background: linear-gradient(30deg, rgb(36, 35, 35) 0%, rgb(26, 25, 25) 93%);

      padding: 0.3rem 0.6rem 0.3rem 0.3rem;

      img {
        width: 58px;

        @media only screen and (max-device-width: 480px) {
          width: 42px;
        }
      }

      hr {
        @media only screen and (max-device-width: 480px) {
          margin-left: 10px
        }
      }

      span {
        margin-left: 1rem;
        margin-right: 1rem;

        font-weight: bold;
        font-size: 1rem;

        color: rgb(119, 119, 119);

        @media only screen and (max-device-width: 480px) {
          font-size: 0.8rem;
          display: none;
        }
      }

      p {
        font-weight: bold;
        font-size: 1.3rem;
        margin: 0 0 0 1rem;
        color: cyan;

        @media only screen and (max-device-width: 480px) {
          font-size: 1rem;
        }
      }
    }
  }
}
</style>