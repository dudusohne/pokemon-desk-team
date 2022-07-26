<template>
    <div class="team-poke-card" :style="style">
        <img :src="getPokemonImg(props.pokemon.id)" alt="image" />
        <div class="footer">
            <span class="pokename">
                {{
                        props.pokemon.name?.toUpperCase()
                }}
            </span>
        </div>
        <div class="power-wrapper">
            <q-icon name="pets" size="1.4rem" />
            <span class="power">{{ props.pokemon?.base_experience }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Pokemon } from '../../interface/types'
import { computed, StyleValue } from 'vue'

interface Props {
    pokemon: Pokemon
}

const props = defineProps<Props>();

function getPokemonImg(id: number): string {
    var str = "" + id;
    var pad = "000";
    const ans = pad.substring(0, pad.length - str.length) + str;
    const url = `https://raw.githubusercontent.com/oscarcz7/poke_api/master/src/assets/pokemon/${ans}.png`;
    return url;
}

const style = computed<StyleValue>(() => ({
    'background-color': props.pokemon.color
}))
</script>

<style scoped lang="scss">
.team-poke-card {
    display: flex;
    flex-direction: column;
    height: 150px;
    width: 120px;
    border-radius: 12px;
    background-color: #aeaeae;
    background: repeating-linear-gradient(45deg, transparent, transparent 6px, #252525 65px, #202020 70px);

    border: 2px solid rgb(63, 63, 63);

    margin-left: 5px;

    @media only screen and (max-device-width: 480px) {
        height: 120px;
        width: 70px;
    }

    &:hover {
        cursor: pointer;
    }

    img {
        margin-top: -1.3rem;
        max-width: 120px;
        height: 120px;

        @media only screen and (max-device-width: 480px) {
            margin-top: 0.1rem;
            height: 70px;
            max-width: 70px;
        }
    }

    .power-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
        padding: 0 2px 0 2px;
        margin-top: 1px;
        margin-bottom: 1px;
        margin-left: 1px;

        background-color: rgb(218, 218, 218);

        overflow: hidden;

        border-radius: 4px;
        border-bottom-left-radius: 12px;
        border: 1px solid black;

        @media only screen and (max-device-width: 480px) {
            padding: 0;
            margin-bottom: 0;
            height: 30px;
        }

        .power {
            font-size: 1.2rem;
            font-weight: bold;

            color: rgb(18, 18, 19);
        }
    }

    .footer {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: rgb(54, 54, 54);
        border-radius: 2px;

        @media only screen and (max-device-width: 480px) {
            display: none;
        }

        .pokename {
            font-size: 14px;
            color: rgb(255, 255, 255);
            font-weight: bold;
            margin-right: 1rem;
        }
    }
}
</style>