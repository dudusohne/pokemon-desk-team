<template>
  <div class="login">
    <div class="container">
      <div class="login-banner">
        <span class="poke">POKE</span>
        <span class="desk">DESK</span>
        <img src="../../assets/pokeballimg.png" alt="pokeball" />
      </div>
      <q-btn @click.prevent="Login()" icon-right="bi-google" label="login" icon-size="2px" />
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

  background-image: linear-gradient(135deg, #ABDCFF 10%, #0396FF 100%);


  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 47vh;

    width: 470px;

    @media (max-width: 468px) {
      flex-direction: column;
      width: 90%;
      height: 50vh;
    }

    button {
      width: 200px;
      height: 50px;
      border-radius: 5px;
      border: none;
      background-color: #c04433;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
        transition: 0.3s all ease-in-out;
      }
    }

    .login-banner {
      display: flex;
      flex-direction: column;
      line-height: 58px;
      align-items: center;

      @media only screen and (max-device-width: 480px) {}

      .poke {
        font-size: 4rem;
        font-weight: bold;
        color: rgb(17, 17, 17);

        @media only screen and (max-device-width: 480px) {}
      }

      .desk {
        font-size: 5rem;
        font-weight: bold;
        z-index: 5;
        color: rgb(17, 17, 17);

        @media only screen and (max-device-width: 480px) {}
      }

      img {
        margin-top: -1.3rem;
        width: 100px;
        height: 100px;
        z-index: 0;

        -webkit-animation: rotate 3s ease 0s 2 normal;
        -moz-animation: rotate 3s ease 0s 2 normal;
        -ms-animation: rotate 3s ease 0s 2 normal;
        animation: rotate 3s ease 0s 2 normal;


        @-webkit-keyframes rotate {
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }

        @keyframes rotate {
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
  }
}
</style>