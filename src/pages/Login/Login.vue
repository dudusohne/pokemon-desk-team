<template>
  <div class="login">
    <div class="container">
      <img class="logo" src="../../assets/pokemonlogo.png" alt="pokemon" />
      <div class="banner">
        <h1>POKE</h1>
        <h3>DESK</h3>
      </div>
      <q-separator color="black" />
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
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.

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

  background-image: url("../../assets/background-img.png");
  background-size: cover;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 40vh;

    width: 500px;
    background-color: rgb(236, 236, 236);
    border-radius: 40px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.733);

    @media (max-width: 768px) {
      width: 60%;
    }

    img {
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

      margin-top: 4rem;

      &:hover {
        background-color: #2c2c2c;
        transition: 0.3s;
      }
    }

    p {
      font-size: 18px;
      font-weight: bold;
      color: rgb(41, 52, 99);
      margin-top: 2rem;
      margin-bottom: 2rem;
    }

      .banner {
      display: flex;
      flex-direction: row;
      align-items: center;
      z-index: 2;
      height: 2.5rem;
      margin-top: 1.2rem;
      margin-right: 1.6rem;

      img {
        width: 8%;
        margin-left: 1.2rem;
      }

      h1 {
        font-size: 3.5rem;
        font-weight: bold;
        color: rgb(9, 9, 10);
        margin-left: 2rem;
        line-height: 0.6rem;
        letter-spacing: -3px;
        font-style: italic;

        @media only screen and (max-device-width: 480px) {
          font-size: 2.6rem;
        }
      }

      h3 {
        font-size: 4rem;
        font-weight: bold;
        color: rgb(59, 67, 100);
        font-style: italic;

        margin-top: 6rem;

        @media only screen and (max-device-width: 480px) {
          font-size: 2.6rem;
        }
      }
    }
  }
}
</style>