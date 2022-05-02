<template>
  <div class="login">
    <div class="container">
      <img class="logo" src="../../assets/pokemonlogo.png" alt="pokemon" />
      <q-btn @click.prevent="Login()">
        login
      </q-btn>
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
        const user: any = result?.user;

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

    width: 30vw;
    background-color: rgb(236, 236, 236);
    border-radius: 40px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.733);


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
  }
}
</style>