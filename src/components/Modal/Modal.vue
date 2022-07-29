<template>
    <q-dialog transition-show="slide-down" transition-hide="slide-down">
        <q-card class="text-white">
            <div :style="{ 'background-color': props.pokemon.color, overflow: 'hidden' }">
                <img class="pokedeximgheader" src="../../assets/headerpokedex.png" alt="pokedex" />
                <q-bar style="display: flex; flex-direction: row; justify-content: space-between; align-items: center">
                    <q-btn rounded>
                        <span style="font-size: 25px; font-weight: bold;">#{{ props.pokemon.id }}</span>
                    </q-btn>
                    <span style="align-self: flex-start; font-size: 28px; font-weight: bold; color: rgb(31, 31, 31);">{{
                            props.pokemon.name
                    }}</span>

                    <q-btn dense flat icon="close" v-close-popup>
                        <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                    </q-btn>
                </q-bar>

                <q-card-section style="padding-top: 0">
                    <div style="display: flex; flex-direction: column; align-items: center">
                        <div></div>
                        <img class="pokemon-img" :src="getPokemonImg(props.pokemon.id)" alt="image" />
                        <div class="poke-stats-board">
                            <InfoCard>
                                <span>POWER:</span>
                                <q-separator />
                                <p style="font-size: 28px; font-weight: bold; color: rgb(255, 255, 255)">{{
                                        props.pokemon.base_experience
                                }}</p>
                            </InfoCard>

                            <InfoCard>
                                <span>ABILITIES:</span>
                                <q-separator />
                                <p v-for="abilt in props.pokemon.abilities">{{ abilt.ability.name }}</p>
                            </InfoCard>

                            <InfoCard>
                                <span>TYPE(S):</span>
                                <q-separator />
                                <div v-for="typ in props.pokemon.types">
                                    <q-chip class="flat" :color="props.pokemon.color">{{
                                            typ.type.name
                                    }}</q-chip>
                                </div>
                            </InfoCard>

                            <InfoCard class="info">
                                <span>INFO:</span>
                                <q-separator />
                                <div>
                                    <p>
                                        <span
                                            style="font-weight: 400; color: rgb(168, 168, 168); margin-right: 4px">HEIGHT:</span>
                                        <span>{{ props.pokemon.height }}</span>
                                    </p>
                                    <p>
                                        <span
                                            style="font-weight: 400; color: rgb(168, 168, 168); margin-right: 4px">WEIGHT:</span>
                                        <span>{{ props.pokemon.weight }}</span>
                                    </p>
                                </div>
                            </InfoCard>
                        </div>
                        <q-btn dense class="desc">
                            <div
                                style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center;">
                                <p style="color: rgb(223, 223, 223)">{{ props.pokemon.description }}</p>
                            </div>
                        </q-btn>
                    </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <template v-slot>
                        <slot name="modalButton"></slot>
                    </template>
                </q-card-section>
            </div>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import InfoCard from "../InfoCard/InfoCard.vue";
import { Pokemon } from '../../interface/types';

interface Props {
    pokemon: Pokemon
}

const props = defineProps<Props>();

function getPokemonImg(entryNumber: number): string {
    var str = "" + entryNumber;
    var pad = "000";
    const ans = pad.substring(0, pad.length - str.length) + str;
    const url = `https://raw.githubusercontent.com/oscarcz7/poke_api/master/src/assets/pokemon/${ans}.png`;
    return url;
}

const emit = defineEmits<{
    (_event: 'clicked'): void
}>()

emit('clicked')
</script>

<style lang="scss" scoped="true">
.pokedeximgheader {
    width: 108%;
    height: auto;
    margin-left: -1rem;
    margin-top: -1rem;
}

.poke-stats-board {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 10px;
    align-items: flex-start;

    @media only screen and (max-device-width: 480px) {
        margin-bottom: 5px;
    }

    span {
        @media only screen and (max-device-width: 480px) {
            font-size: 12px;
        }
    }

    p {
        @media only screen and (max-device-width: 480px) {
            font-size: 12px;
        }
    }
    .info {
        @media only screen and (max-device-width: 480px) {
            display: none;
        }
    }
}

.desc {
    padding: 10px 10px 0px 10px;
    background-color: rgb(88, 88, 88);

    @media only screen and (max-device-width: 480px) {
        font-size: 10px;
    }
}

.pokemon-img {
    max-width: 300px;

    @media only screen and (max-device-width: 480px) {
        max-width: 150px;
    }
}
</style>