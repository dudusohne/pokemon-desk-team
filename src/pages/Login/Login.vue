<template>
  <div class="login">
    <div class="container">
      <img class="logo" src="../../assets/pokemonlogo.png" alt="pokemon" />
      <img class="ash" src="../../assets/ash.png" alt="pokemon" />
      <div class="banner">
        <div style="display: flex; flex-direction: row">
          <h1>POKE</h1>
          <h3>DESK</h3>
        </div>
      </div>
      <q-separator color="black" inset />
      <q-btn @click.prevent="Login()">
        login
      </q-btn>
      <q-separator color="black" />
      <p>Faça login acima com sua conta GOOGLE.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const provider = new GoogleAuthProvider();

const router = useRouter()

onBeforeMount(
  () => {
    getAuth().onAuthStateChanged(
      (user) => {
        if (!!user) {
          router.push("/home");
        }
      }
    );
  }
);

function Login() {
  const auth = getAuth();
  if (!!auth.currentUser) {
    router.push({
      name: "Home"
    });
  } else {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        router.push({
          name: "Home",
          params: {
            token: token,
          },
        });
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
}
</script>

<style lang="scss">
.login {
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: linear-gradient(30deg, rgb(14, 27, 37) 0%, rgb(8, 16, 22) 93%);
  background-size: cover;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 47vh;

    width: 470px;
    background-color: rgb(236, 236, 236);
    border-radius: 40px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.733);

    &:hover {
      opacity: 0.9;
      transition: 0.5s ease-in-out;
    }

    @media (max-width: 768px) {
      width: 60%;
    }

    img {
      margin-top: -3rem;
      width: 50%;
    }

    button {
      width: 200px;
      height: 50px;
      border-radius: 5px;
      border: none;
      background-color: #4285f4;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;

      margin-top: -3rem;

      &:hover {
        background-color: #194996;
        transition: 0.3s;
      }
    }

    p {
      font-size: 18px;
      font-weight: bold;
      color: rgba(135, 139, 158, 0.911);
      margin-bottom: 2rem;
    }

    .logo { 
      z-index: 3;
    }

    .ash { 
      width: 100%;
      height: 13rem;
      overflow: hidden;
      border-top-left-radius: 40px;
      border-top-right-radius: 40px;

    }

    .banner {
      display: flex;
      justify-content: center;
      width: 91%;
      z-index: 10;

      h1 {
        font-size: 2.3rem;
        font-weight: bold;
        color: rgb(29, 31, 34);
        letter-spacing: -3px;
        font-style: italic;

        @media only screen and (max-device-width: 480px) {
          font-size: 1.3rem;
        }
      }

      h3 {
        font-size: 2.4rem;
        font-weight: bold;
        color: rgb(102, 102, 102);
        font-style: italic;

        margin-top: 3.2rem;

        @media only screen and (max-device-width: 480px) {
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>