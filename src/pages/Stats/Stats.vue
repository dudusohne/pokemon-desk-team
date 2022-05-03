<template>
  <div class="stats">
    <div class="pokeheader">
      <img class="logo" src="../../assets/pokemonlogo.png" alt="pokemon" />
      <div class="banner">
        <h1>POKE</h1>
        <h3>DESK</h3>
      </div>
       <div style="display: flex; flex-direction: row">
        <q-icon name="home" size="1.6rem" style="margin-left: 1rem; cursor: pointer; color: rgb(209, 196, 196);"
          @click.prevent="router.push('/home')" />
        <q-icon name="wifi" size="1.6rem" style="margin-left: 1rem; cursor: pointer; color: rgb(209, 196, 196);"
          @click.prevent="router.push('/stats')" />
      </div>
      <div class="user-data">
        <span>{{ auth.currentUser?.displayName }}</span>
        <q-avatar>
          <img :src="auth.currentUser?.photoURL" v-if="auth.currentUser?.photoURL">
        </q-avatar>
        <q-icon name="logout" size="1.1rem" style="margin-left: 1rem; cursor: pointer; color: rgb(209, 196, 196);"
          @click.prevent="signOut()" />
      </div>
    </div>
    <div class="container">
      <span class="stats-title">RANKING</span>
      <div :key="stats.power" v-for="stats in statsData" class="stats-list">
        <q-avatar>
          <img :src="stats.photo" v-if="stats.photo">
        </q-avatar>
        <span>{{ stats.name }}</span>
        <p v-if="!!stats.power">{{ stats.power}} pts</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getDatabase, ref as Ref, get, child } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useRouter } from "vue-router";

const statsData = ref()

const auth = getAuth();

const router = useRouter()

const dbRef = Ref(getDatabase());
get(child(dbRef, `users/`)).then((snapshot) => {
  if (snapshot.exists()) {
    statsData.value = snapshot.val();
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

function signOut() {
  auth.signOut();
  router.push({ name: "Login" });
}
</script>

<style lang="scss">
.stats {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: linear-gradient(30deg, rgb(14, 27, 37) 0%, rgb(8, 16, 22) 93%);

  .pokeheader {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: sticky;
    top: 0;
    height: 7vh;
    width: 100%;

    padding: 0.2rem 2rem 0.2rem 2rem;
    background-color: rgb(8, 16, 22);
    z-index: 10;
    border-bottom: 3px solid rgb(10, 135, 173);

    @media only screen and (max-device-width: 480px) {
      padding: 0 0 0 0.2rem;
    }

    .logo {
      width: 11%;
      margin-top: 1rem;

      @media only screen and (max-device-width: 480px) {
        width: 30%;
      }
    }

    .user-data {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      width: 100%;

      img {
        border: 2px solid rgb(209, 196, 196);

      }

      span {
        font-size: 1.2rem;
        font-weight: bold;
        font-family: 'Roboto', sans-serif;
        color: rgb(209, 196, 196);

        margin-right: 1rem;
      }
    }

    .banner {
      display: flex;
      flex-direction: center;
      justify-content: flex-start;
      align-items: center;
      width: 91%;
      z-index: 10;

      img {
        width: 8%;
        margin-left: 1.2rem;
      }

      h1 {
        font-size: 2rem;
        font-weight: bold;
        color: rgb(193, 195, 201);
        margin-left: 2rem;
        line-height: 0.6rem;
        letter-spacing: -3px;
        font-style: italic;

        @media only screen and (max-device-width: 480px) {
          font-size: 2.6rem;
        }
      }

      h3 {
        font-size: 2rem;
        font-weight: bold;
        color: rgb(239, 242, 255);
        font-style: italic;

        margin-top: 3rem;

        @media only screen and (max-device-width: 480px) {
          font-size: 2.6rem;
        }
      }
    }
  }

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
      justify-content: center;

      margin-top: 0.4rem;

      border-radius: 12px;
      border: 1px solid #333;
      background: linear-gradient(30deg, rgb(36, 35, 35) 0%, rgb(26, 25, 25) 93%);

      padding: 0.3rem 0.6rem 0.3rem 0.3rem;

      span {
        margin-left: 1rem;
        margin-right: 1rem;

        font-weight: bold;
        font-size: 1rem;

        color: rgb(119, 119, 119);
      }

      p {
        font-weight: bold;
        font-size: 1.3rem;
        margin: 0;
        color: rgb(0, 247, 255);
      }

      img {
        border: 1px solid white;
      }
    }
  }
}
</style>