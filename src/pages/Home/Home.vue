<template>
  <div class="home">
    <div v-if="!list.length" class="pokeheader">
      <img class="logo" src="../../assets/pokemonlogo.png" alt="pokemon" />
      <div class="banner">
        <h1>POKE</h1>
        <h3>DESK</h3>
      </div>
      <div style="display: flex; flex-direction: row">
        <q-icon :class="isActiveMenu('/home')" name="home" size="1.6rem" style="margin-left: 1rem; cursor: pointer; color: rgb(209, 196, 196);"
          @click.prevent="router.push('/home')" />
        <q-icon :class="isActiveMenu('/stats')" name="article" size="1.6rem"
          style="margin-left: 1rem; cursor: pointer; color: rgb(209, 196, 196);"
          @click.prevent="router.push('/stats')" />
      </div>
      <div class="user-data">
        <span>{{ auth.currentUser?.displayName }}</span>
        <q-avatar>
          <img :src="auth.currentUser?.photoURL" v-if="auth.currentUser?.photoURL">
        </q-avatar>
        <q-icon name="logout" size="1.1rem" style="margin-left: 1rem; cursor: pointer; color: rgb(209, 196, 196);"
          @click.prevent="signOut()" />
      </div>
    </div>
    <div v-else class="pokeball">
      <div style="display: flex; flex-direction: column; align-items: center">
        <q-avatar>
          <img :src="auth.currentUser?.photoURL" v-if="auth.currentUser?.photoURL">
        </q-avatar>
        <span style="font-weight: bold; font-size: 1rem">{{ auth.currentUser?.displayName }}</span>
      </div>

      <q-separator vertical style="margin-left: 1rem" />

      <div style="display: flex; flex-direction: column; align-items: center; width: 80px; margin-left: 1rem">
        <img class="pokedex" src="../../assets/pokedex.png" alt="pokedex" />
        <span style="font-weight: bold; font-size: 1rem;">MY TEAM:</span>
      </div>

      <TeamCard v-for="(pokemon, i) in list" :key="i" :pokemon="pokemon" :entry_number="pokemon.id"
        :pokemon_species="pokemon.name" @click="handleRemove(pokemon.id)" />

      <q-btn color="green" label="SAVE TEAM" @click="saveTeam()" v-if="list.length > 4" style="margin-left: 2rem" />
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
import { ref, reactive, onBeforeMount } from "vue";
import { getDatabase, ref as Ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";

import Modal from "../../components/Modal/Modal.vue";
import PokeCard from '../../components/PokeCard/PokeCard.vue';
import TeamCard from '../../components/TeamCard/TeamCard.vue';
import { Pokemon } from '../../interface/types';
import api from '../../services/api';
import { useRouter, useRoute } from "vue-router";

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

const router = useRouter()
const route = useRoute()

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

function saveTeam() {
  const user = auth.currentUser;
  const userId: any = user?.uid;
  const userEmail: string | any = user?.email;
  const userName = user?.displayName;
  const userPhoto = user?.photoURL;
  const userTeam: any = list;

  const power = ref()

  power.value = userTeam.reduce((result: any, item: any) => {
    return result + item?.base_experience
  }, 0)

  console.log('power: ', power.value)

  if (userTeam.length < 5) {
    alert("Please select 5 pokemons before save!")
    return

  } else {

    const db = getDatabase();

    try {
      set(Ref(db, `users/` + userId), {
        email: userEmail,
        name: userName,
        photo: userPhoto,
        team: userTeam,
        power: power.value
      });

      router.push('/stats')
      alert('TEAM SAVED')
    } catch (e) {
      console.log(e);
    }
  }

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

function isActiveMenu(currentPath: string): string | void {
  if (currentPath === route.path) {
    return 'is-active'
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: rgb(29, 28, 28);

  .pokeheader {
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
    border-bottom: 3px solid rgb(10, 135, 173);

    @media only screen and (max-device-width: 480px) {
      padding: 0 0 0 0.2rem;
    }

    .is-active {
      border: 1px solid rgba(255, 255, 255, 0.336);
      background-color: rgb(10, 135, 173);
      border-radius: 7px;
    }

    .logo {
      width: 11%;
      margin-top: 1rem;

      @media only screen and (max-device-width: 480px) {
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
          font-size: 1.2rem;
        }
      }
    }
  }
}

.pokeball {
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0;
  width: 100%;
  min-height: 100px;
  padding: 0 0 1 1.2rem;
  justify-content: flex-start;
  background-color: rgba(224, 219, 209, 0.932);
  padding: 1rem 0 1rem 3rem;
  z-index: 10;

  img {
    width: 90%;
  }

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