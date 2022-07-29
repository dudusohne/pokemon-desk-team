<template>
  <div class="home">
    <Header :userPhoto="auth.currentUser?.photoURL" :userName="auth.currentUser?.displayName" v-show="!list.length"
      :actualRoute="actualRoute" />
    <div v-show="!!list.length" class="pokeball">
      <div class="user-data-wrapper">
        <q-avatar class="user-image">
          <img :src="auth.currentUser?.photoURL" v-if="auth.currentUser?.photoURL">
        </q-avatar>
        <span class="username">{{ auth.currentUser?.displayName }}</span>
      </div>

      <q-separator vertical style="margin-left: 1rem" />

      <div style="display: flex; flex-direction: column; align-items: center;">
        <img class="pokedex" src="../../assets/pokedex.png" alt="pokedex" />
        <span class="my-team">MY TEAM:</span>
      </div>

      <TeamCard v-for="(pokemon, i) in list" :key="i" :pokemon="pokemon" :entry_number="pokemon.id"
        :pokemon_species="pokemon.name" @click="handleRemove(pokemon.id)" />

      <q-btn color="green" label="SAVE TEAM" @click="saveTeam()" v-if="list.length > 4" class="save-button" />
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
    <BottomBar />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount } from "vue";
import { getDatabase, ref as Ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useRouter, useRoute } from "vue-router";
import Modal from "../../components/Modal/Modal.vue";
import PokeCard from '../../components/PokeCard/PokeCard.vue';
import TeamCard from '../../components/TeamCard/TeamCard.vue';
import { Pokemon } from '../../interface/types';
import api from '../../services/api';
import Header from '../../components/Header/Header.vue'
import BottomBar from "../../components/BottomBar/BottomBar.vue";

const modal = ref(false);
const pokeData = ref<any>();
const list = reactive<Pokemon[]>([]);

//TODO: improve-removing this object declaration
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

const actualRoute = ref(route.path)

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

  if (userTeam.length < 5 && userTeam.length > 5) {
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

// TODO: improve this function
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

/*
* Sign out the current user.
*/
function signOut() {
  auth.signOut();
  router.push({ name: "Login" });
}

function resolveColor(type: any) {
  if (type === "fire") {
    return '#d64949'
  } if (type === "grass") {
    return '#afea75'
  } if (type === "normal") {
    return '#dfce6d'
  } if (type === "water") {
    return '#6dd0df'
  } if (type === "psychic") {
    return '#786ddf'
  } if (type === "bug") {
    return '#abdf6d'
  } if (type === "poison") {
    return '#ae78ea'
  } if (type === "electric") {
    return '#e3ea78'
  } if (type === "ground") {
    return '#a48360'
  } if (type === "fighting") {
    return '#ecc0a5'
  } if (type === "rock") {
    return '#7f6c61'
  } if (type === "ice") {
    return '#a8d2ea'
  } if (type === "dragon") {
    return '#c06642'
  } if (type === "fairy") {
    return '#ffb3ab'
  }
}

/*
* Handle's the pokemon details load/render
* url - From the pokemon details api.
*/
async function details(url: string) {
  try {
    const urlResponse = await api.urlPokemon(url)
    // pokemon.color = urlResponse.data.color.name;

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
    pokemon.color = resolveColor(pokemonResponse.data.types[0].type?.name);
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
}

.pokeball {
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0;
  width: 100%;
  min-height: 100px;
  padding: 0 0 1 1.2rem;
  /* justify-content: flex-start; */
  background-color: rgba(224, 219, 209, 0.932);
  padding: 1rem 0 1rem 3rem;
  z-index: 10;

  @media only screen and (max-device-width: 480px) {
    padding: 0.5rem 0 0 0;
  }

  .user-data-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media only screen and (max-device-width: 480px) {
      display: none;
    }

    .user-image {
      height: 50px;
    }

    .username {
      font-weight: bold;
      font-size: 1rem;
    }
  }

  hr {
    @media only screen and (max-device-width: 480px) {
      display: none;
    }
  }

  .pokedex {
    width: 10%;

    @media only screen and (max-device-width: 480px) {
      display: none;
    }
  }

  .my-team {
    font-weight: bold;
    font-size: 1rem;

    @media only screen and (max-device-width: 480px) {
      display: none;
    }
  }

  p {
    font-size: 1.1rem;
    font-weight: medium;
    color: rgb(136, 136, 136);

    @media only screen and (max-device-width: 480px) {
      display: none;
    }
  }

  .ashImg {
    height: 100px;
    border-radius: 12px;
    margin-right: 1.2rem;
    margin-left: 1.9rem;
  }

  .save-button {
    margin-left: 1rem;

    @media only screen and (max-device-width: 480px) {
      margin-left: 0;
      position: fixed;
    }
  }
}

.pokemonlist {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* background-color: rgb(29, 28, 28); */
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