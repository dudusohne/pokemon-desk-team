<template>
  <div class="login">
    <div class="container">
      <img class="logo" src="../../assets/pokemonlogo.png" alt="pokemon" />
      <img class="ash" src="../../assets/ash.png" alt="pokemon" />
      <div class="banner">
        <div style="display: flex; flex-direction: row; height: 8rem;">
          <h1>POKE</h1>
          <h3>DESK</h3>
        </div>
        <p style="font-size: 1rem; font-weight: bold; font-style: italic; font-variant: small-caps;">monte seu time</p>
      </div>
      <hr />
      <q-btn @click.prevent="Login()">
        login
      </q-btn>
      <q-separator color="black" />
      <p style="font-size: 1rem;">Faça login acima com sua conta GOOGLE.</p>
      <span style="font-size: 1rem; font-weight: bold; font-style: italic; font-variant: small-caps; color: gray">é gratuíto</span>
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
    background-color: rgb(255, 255, 255);
    border-radius: 40px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.733);

    &:hover {
      opacity: 0.9;
      transition: 0.5s ease-in-out;
    }

    @media (max-width: 468px) {
      width: 90%;
      height: 39vh;
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
      height: 18rem;
      border-top-left-radius: 40px;
      border-top-right-radius: 40px;

      @media only screen and (max-device-width: 480px) {
        width: 100%;
        height: 10rem;
      }
    }

    .banner {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 91%;
      z-index: 10;
      height: 8rem;

      @media only screen and (max-device-width: 480px) {
        margin-top: 2.6rem;
        height: 2rem;
      }

      h1 {
        font-size: 2.3rem;
        font-weight: bold;
        color: rgb(29, 31, 34);
        letter-spacing: -3px;
        font-style: italic;

        @media only screen and (max-device-width: 480px) {
          font-size: 2.3rem;
          line-height: 0;
        }
      }

      h3 {
        font-size: 2.4rem;
        font-weight: bold;
        color: rgb(102, 102, 102);
        font-style: italic;
        margin-top: 4 .1rem;

        @media only screen and (max-device-width: 480px) {
          margin-top: 2.1rem;
          font-size: 1.9rem;
          line-height: 0;
        }
      }
    }
  }
}
</style>