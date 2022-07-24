<template>
    <div class="header">
        <img class="logo" src="../../assets/pokemonlogo.png" alt="pokemon" />
        <div class="banner">
            <h1>POKE</h1>
            <h3>DESK</h3>
        </div>
        <div class="menu">
            <q-btn push icon="home" label="HOME" stack color="green"
                text-color="black"
                style="cursor: pointer; color: black; margin-right: 0.4rem; height: 3.2rem; margin-top: 0.4rem;"
                @click.prevent="router.push('/home')" />
            <q-btn push :class="isActiveMenu(props.actualRoute)" icon="article" label="RANK" stack
                style="cursor: pointer; color: black; margin-right: 0.4rem; height: 3.2rem; margin-top: 0.4rem;"
                @click.prevent="router.push('/stats')" />
            <q-btn push :class="isActiveMenu(props.actualRoute)" icon="article" label="TEAM" stack
                style="cursor: pointer; color: black; margin-right: 0.4rem; height: 3.2rem; margin-top: 0.4rem;"
                @click.prevent="router.push('/my-team')" />
        </div>
        <div class="user-data">
            <span>{{ props.userName }}</span>
            <q-avatar>
                <img :src="props.userPhoto" v-if="props.userPhoto">
            </q-avatar>
            <q-icon name="logout" size="1.1rem" style="margin-left: 1rem; cursor: pointer; color: rgb(209, 196, 196);"
                @click.prevent="signOut()" />
        </div>
    </div>

</template>

<script setup lang="ts">
import { getAuth } from 'firebase/auth';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const auth = getAuth();

interface Props {
    userPhoto?: any;
    userName?: any;
    actualRoute?: any;
}

const props = defineProps<Props>()

function isActiveMenu(currentPath: string): string | void {
    if (currentPath === '/stats') {
        return 'is-active'
    } else {
        return 'is-inactive'
    }
}

function signOut() {
    auth.signOut();
    router.push({ name: "Login" });
}
</script>

<style lang="scss">
.header {
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
    border-bottom: 3px solid rgb(216, 142, 30);

    @media only screen and (max-device-width: 480px) {
        padding: 0 0 0 0.2rem;
    }

    .menu {
        display: flex;
        flex-direction: row;

        .is-active {
            background-color: rgb(158, 146, 35);
            border-radius: 7px;
        }

        .is-inactive {
            background-color: rgb(158, 101, 35);
            border-radius: 7px;
        }
    }


    .logo {
        width: 11%;
        margin-top: 1rem;

        @media only screen and (max-device-width: 480px) {
            display: none;
        }

        @media screen and (max-width: 480px) {
            display: none;
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

            @media only screen and (max-device-width: 480px) {
                display: none;
            }
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

            @media only screen and (max-device-width: 480px) {
                display: none;
            }
        }

        h1 {
            font-size: 2rem;
            font-weight: bold;
            color: rgb(193, 195, 201);
            margin-left: 2rem;
            letter-spacing: -3px;
            font-style: italic;

            @media only screen and (max-device-width: 480px) {
                margin-left: 0.2rem;
                font-size: 1.3rem;
            }
        }

        h3 {
            font-size: 2rem;
            font-weight: bold;
            color: rgb(239, 242, 255);
            font-style: italic;

            margin-top: 3rem;

            @media only screen and (max-device-width: 480px) {
                margin-top: 2.3rem;
                font-size: 1.2rem;
            }
        }
    }
}
</style>