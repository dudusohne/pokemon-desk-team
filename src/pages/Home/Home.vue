<template>
  <div class="home">
    <div v-if="!list.length" class="pokeheader">
      <img class="logo" src="../../assets/pokemonlogo.png" alt="pokemon" />
      <div class="banner">
        <h1>POKE</h1>
        <h3>DESK</h3>
      </div>
      <!-- <div class="searchBox">
        <h1>Search for a Pokemon</h1>
        <input type="text" placeholder="Search..." v-model="searchInput" />
        <q-btn dense round icon="search" color="black" @click="filterPokemon(searchInput)">
        </q-btn>
      </div> -->
      <div class="user-data">
        <span>{{ auth.currentUser?.displayName }}</span>
        <q-avatar>
          <img :src="auth.currentUser?.photoURL" v-if="auth.currentUser?.photoURL">
        </q-avatar>
        <q-icon name="logout" color="black" size="1.1rem" style="margin-left: 1rem; cursor: pointer" @click.prevent="signOut()" />
      </div>
    </div>
    <div v-else class="pokeball">
      <div style="display: flex; flex-direction: column; align-items: center">
        <q-avatar>
          <img :src="auth.currentUser?.photoURL" v-if="auth.currentUser?.photoURL">
        </q-avatar>
        <span style="font-weight: bold; font-size: 1rem">{{ auth.currentUser?.displayName }}</span>
      </div>
      <span style="font-weight: bold; font-size: 1.7rem; margin-left: 3rem">MY <br> TEAM:</span>
      <TeamCard v-for="(pokemon, i) in list" :key="i" :pokemon="pokemon" :entry_number="pokemon.id"
        :pokemon_species="pokemon.name" @click="handleRemove(pokemon.id)" />
    </div>
    <div class="pokemonlist q-gutter-md">
      <PokeCard v-for="(pokemon, i) in pokeData" :key="i" :pokemon="pokemon" :entry_number="pokemon.entry_number"
        :pokemon_species="pokemon.pokemon_species.name.toUpperCase()" @click="details(pokemon.pokemon_species.url)" />
      <Modal v-model="modal" :pokemon="pokemon" :id="pokemon.id" :name="pokemon.name"
        :base_experience="pokemon.base_experience" :height="pokemon.height" :weight="pokemon.weight"
        :abilities="pokemon.abilities" :types="pokemon.types" :description="pokemon.description"
        :src="pokemon.entry_number">
        <template v-slot:modalButton>
          <q-btn color="green" label="ADICIONAR AO TIME" @click="addNewTeam()" />
          <q-btn color="black" label="FECHAR" v-close-popup />
        </template>
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount, watch } from "vue";
import Modal from "../../components/Modal/Modal.vue";
import { Pokemon } from '../../interface/types';
import api from '../../services/api';
import PokeCard from '../../components/PokeCard/PokeCard.vue';
import TeamCard from '../../components/TeamCard/TeamCard.vue';
import { useRoute } from "vue-router";
import { getAuth } from "firebase/auth";
import { router } from "../../router";

const modal = ref(false);
const list = reactive<Pokemon[]>([]);
const pokeData = ref<any>();
const pokemon = reactive<Pokemon>({
  id: 0,
  name: "",
  entry_number: 0,
  base_experience: 0,
  pokemon_species: {
    name: '',
    url: '',
  },
  height: 0,
  weight: 0,
  abilities: {
    ability: {
      ability: {
        name: '',
        url: ''
      }
    }
  },
  types: {
    type: {
      type: {
        name: '',
        url: '',
      }
    }
  },
  color: '',
  description: '',
});

// const searchInput = ref<any>()

const auth = getAuth();

onBeforeMount(() => {
  pokemonList()
});

const addNewTeam = () => {
  list.push({
    id: pokemon.id,
    name: pokemon.name,
    entry_number: pokemon.entry_number,
    base_experience: pokemon.base_experience,
    pokemon_species: {
      name: pokemon.name,
      url: pokemon.pokemon_species.url,
    },
    height: pokemon.height,
    weight: pokemon.weight,
    color: pokemon.color,
    description: pokemon.description,
  });
  modal.value = false;
}

function handleRemove(id: number) {
  list.map(pokemon => {
    if (pokemon.id === id) {
      list.splice(list.indexOf(pokemon), 1);
    }
  });
}

/*
* Bring all pokemons from API
*/
const pokemonList = async () => {
  const response = await api.allPokemons()
  pokeData.value = response.data.pokemon_entries;
};

function signOut() {
  auth.signOut();
  router.push({ name: "Login" });
}

function filterPokemon(searchInput: string) {
  pokeData.value.filter((poke: any) => {
    if (poke.pokemon_species.name.toLowerCase().includes(searchInput.toLowerCase())) {
      return poke;
    }
  });
}

/*
* Handle's the pokemon details load/render
*/
async function details(url: string) {
  try {
    const urlResponse = await api.urlPokemon(url)
    pokemon.color = urlResponse.data.color.name;

    const descResponse = await api.uniquePokemon(urlResponse.data.id)
    const textResponses = descResponse.data.flavor_text_entries.filter(
      (element: string | any) => element.language.name == "en"
    );
    pokemon.description = textResponses[0].flavor_text;

    const pokemonResponse = await api.detailsPokemon(urlResponse.data.id)
    pokemon.abilities = pokemonResponse.data.abilities;
    pokemon.types = pokemonResponse.data.types;
    pokemon.weight = pokemonResponse.data.weight;
    pokemon.height = pokemonResponse.data.height;
    pokemon.name = pokemonResponse.data.name;
    pokemon.id = pokemonResponse.data.id;
    pokemon.types = pokemonResponse.data.types;
    pokemon.base_experience = pokemonResponse.data.base_experience;
    modal.value = true;
  } catch (err) {
    console.log('catch erro: ', err);
  }
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 187, 187);
  height: 100%;

  .pokeheader {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: sticky;
    top: 0;
    height: 7vh;
    width: 100%;

    padding: 0.2rem 2rem 0.2rem 2rem;
    background-color: rgb(24, 134, 207);
    z-index: 10;
    border-bottom: 3px solid rgb(58, 59, 59);

    @media only screen and (max-device-width: 480px) {
      padding: 0 0 0 0.2rem;
    }

    .logo {
      width: 9%;

      @media only screen and (max-device-width: 480px) {
        width: 30%;
      }
    }

    .user-data {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      width: 100%;

      img {
        border: 2px solid #333;
        
      }

      span {
        font-size: 1.2rem;
        font-weight: bold;
        font-family: 'Roboto', sans-serif;

        margin-right: 1rem;
      }
    }

    .banner {
      display: flex;
      flex-direction: center;
      justify-content: flex-start;
      align-items: center;
      width: 91%;
      z-index: 10;

      h1 {
        font-size: 3.4rem;
        font-weight: bold;
        color: rgb(10, 17, 51);
        margin-left: 2rem;
        line-height: 1.2rem;
        letter-spacing: 0.1rem;

        @media only screen and (max-device-width: 480px) {
          font-size: 2.6rem;
        }
      }

      h3 {
        font-size: 3.6rem;
        font-weight: bold;
        color: rgb(77, 72, 72);

        @media only screen and (max-device-width: 480px) {
          font-size: 2.6rem;
        }
      }
    }

    .searchBox {
      display: flex;
      flex-direction: row;
      width: 70%;
      align-items: center;
      justify-content: space-between;
      height: 80%;
      background-color: rgb(170, 80, 80);
      border-radius: 16px;
      padding: 0.9rem 2rem 0.9rem 2rem;

      @media only screen and (max-device-width: 480px) {
        display: none;
      }

      h1 {
        font-size: 1.2rem;
        font-weight: bold;
        color: rgb(255, 255, 255);
      }

      input {
        width: 50%;
        border: none;
        background-color: rgb(255, 255, 255);
        font-size: 1.2rem;
        font-weight: bold;
        color: rgb(10, 17, 51);
        margin-left: 1rem;
        border-radius: 12px;
        padding-left: 1rem;
      }
    }
  }
}

.pokeball {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  min-height: 100px;
  padding: 0 0 0 1.2rem;
  margin-bottom: 1rem;
  justify-content: flex-start;
  background-color: rgba(224, 219, 209, 0.932);
  padding: 1rem 0 1rem 3rem;
  z-index: 10;

  p {
    font-size: 1.1rem;
    font-weight: medium;
    color: rgb(136, 136, 136);
  }

  .ashImg {
    height: 100px;
    border-radius: 12px;
    margin-right: 1.2rem;
    margin-left: 1.9rem;
  }
}

.pokemonlist {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: rgb(29, 28, 28);
  z-index: 1;
  margin-top: 0.2px;
}

#modal {
  position: absolute;
  top: 20px;
  left: 20px;
  border: 1px solid gray;
  background-color: white;
}
</style>