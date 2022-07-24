<template>
    <div class="header" :style="style">
        <img class="logo" src="../../assets/pokemonlogo.png" alt="pokemon" />
        <div class="banner">
            <h1>POKE</h1>
            <h3>DESK</h3>
        </div>
        <div class="menu">
            <q-btn push :class="isActiveMenuHome('/home')" icon="home" label="HOME" stack
                style="cursor: pointer; color: black; margin-right: 0.4rem; height: 3.2rem; margin-top: 0.4rem;"
                @click.prevent="router.push('/home')" />
            <q-btn push :class="isActiveMenuStats('/stats')" icon="article" label="RANK" stack
                style="cursor: pointer; color: black; margin-right: 0.4rem; height: 3.2rem; margin-top: 0.4rem;"
                @click.prevent="router.push('/stats')" />
            <q-btn push :class="isActiveMenuTeam('/my-team')" icon="people" label="TEAM" stack
                style="cursor: pointer; color: black; margin-right: 0.4rem; height: 3.2rem; margin-top: 0.4rem;"
                @click.prevent="router.push('/my-team')" />
        </div>
        <div class="user-data">
            <span>{{ props?.userName }}</span>
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
import { ref, computed } from 'vue'

const router = useRouter()
const route = useRoute()

const auth = getAuth();

const actualRoute = ref(route.path)

interface Props {
    userPhoto?: any;
    userName?: string | null;
    actualRoute?: any;
}

const props = defineProps<Props>()

const borderBottomColor = ref<string>('rgb(23,255,255)')
const backgroundColor = ref<string>('rgb(8, 16, 22)')

const style = computed(() => ({
    'border-bottom': `3px solid ${borderBottomColor.value}`,
    'background-color': `${backgroundColor.value}`
}))


function isActiveMenuHome(menu: string) {
    if (actualRoute.value === '/home' && menu) {
        borderBottomColor.value = 'rgb(23,255,255)'
        backgroundColor.value = 'rgb(26, 44, 44)'
        return 'home'
    } else {
        return 'inactive'
    }
}

function isActiveMenuStats(menu: string) {
    if (actualRoute.value === '/stats' && menu) {
        borderBottomColor.value = 'rgb(255, 232, 21)'
        backgroundColor.value = 'rgb(32, 31, 25)'
        return 'stats'
    } else {
        return 'inactive'
    }
}

function isActiveMenuTeam(menu: string) {
    if (actualRoute.value === '/my-team' && menu) {
        borderBottomColor.value = 'rgb(36, 218, 20)'
        backgroundColor.value = 'rgb(22, 27, 21)'
        return 'team'
    } else {
        return 'inactive'
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
    z-index: 10;

    @media only screen and (max-device-width: 480px) {
        padding: 0 0 0 0.2rem;
    }

    .menu {
        display: flex;
        flex-direction: row;

        .home {
            background-color: rgb(23, 255, 255);
            border-radius: 7px;
        }

        .stats {
            background-color: rgb(255, 232, 21);
            border-radius: 7px;
        }

        .team {
            background-color: rgb(36, 218, 20);
            border-radius: 7px;
        }

        .inactive {
            background-color: rgb(158, 157, 156);
            border-radius: 7px;
            opacity: 0.4;
        }
    }


    .logo {
        width: 11%;
        margin-top: 1rem;

        @media screen and (max-width: 800px) {
            display: none;
        }

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