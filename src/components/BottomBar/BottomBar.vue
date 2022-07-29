<template>
    <div class="bottom-bar">
        <div class="menu" :style="style">
            <div style="margin-top: -1.2rem">
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
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, StyleValue } from 'vue'

const route = useRoute()
const router = useRouter()

const actualRoute = ref(route.path)

const borderTopColor = ref<string>('rgb(23,255,255)')
const backgroundColor = ref<string>('rgb(8, 16, 22)')

const style = computed<StyleValue>(() => ({
    'border-top': `3px solid ${borderTopColor.value}`,
    'background-color': `${backgroundColor.value}`
}))


function isActiveMenuHome(menu: string): string {
    if (actualRoute.value === '/home' && menu) {
        borderTopColor.value = 'rgb(23,255,255)'
        backgroundColor.value = 'rgb(26, 44, 44)'
        return 'home'
    } else {
        return 'inactive'
    }
}

function isActiveMenuStats(menu: string): string {
    if (actualRoute.value === '/stats' && menu) {
        borderTopColor.value = 'rgb(255, 232, 21)'
        backgroundColor.value = 'rgb(32, 31, 25)'
        return 'stats'
    } else {
        return 'inactive'
    }
}

function isActiveMenuTeam(menu: string): string {
    if (actualRoute.value === '/my-team' && menu) {
        borderTopColor.value = 'rgb(36, 218, 20)'
        backgroundColor.value = 'rgb(22, 27, 21)'
        return 'team'
    } else {
        return 'inactive'
    }
}
</script>

<style scoped lang="scss">
.bottom-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    // overflow: hidden;

    z-index: 10;

    @media only screen and (min-width: 480px) {
        display: none;
    }

    .menu {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        height: 6vh;

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
}
</style>