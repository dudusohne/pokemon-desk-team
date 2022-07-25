<template>
  <div class="my-team">
    <Header :userPhoto="auth.currentUser?.photoURL" :userName="auth.currentUser?.displayName"
      :actualRoute="actualRoute" />
    <div class="container">
      <TeamPokeCard v-for="(pokemon, i) in resultData?.team" :key="i" :pokemon="pokemon" />
    </div>
    <BottomBar />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getDatabase, ref as Ref, get, child } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useRoute } from "vue-router";
import Header from '../../components/Header/Header.vue'
import TeamPokeCard from "../../components/TeamPokeCard/TeamPokeCard.vue";
import BottomBar from "../../components/BottomBar/BottomBar.vue"

const resultData = ref()

const auth = getAuth();

const route = useRoute()

const actualRoute = ref(route.path)

const dbRef = Ref(getDatabase());
get(child(dbRef, `users/${auth.currentUser?.uid}`)).then((snapshot) => {
  if (snapshot.exists()) {
    resultData.value = snapshot.val()
    return resultData.value.team
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

// async function details(url: string) {
//   try {
//     const urlResponse = await api.urlPokemon(url)
//     pokemon.color = urlResponse.data.color.name;

//     const descResponse = await api.uniquePokemon(urlResponse.data.id)
//     const textResponses = descResponse.data.flavor_text_entries.filter(
//       (element: string | any) => element.language.name == "en"
//     );
//     pokemon.description = textResponses[0].flavor_text;

//     const pokemonResponse = await api.detailsPokemon(urlResponse.data.id)
//     pokemon.abilities = pokemonResponse.data.abilities;
//     pokemon.types = pokemonResponse.data.types;
//     pokemon.weight = pokemonResponse.data.weight;
//     pokemon.height = pokemonResponse.data.height;
//     pokemon.name = pokemonResponse.data.name;
//     pokemon.id = pokemonResponse.data.id;
//     pokemon.types = pokemonResponse.data.types;
//     pokemon.base_experience = pokemonResponse.data.base_experience;
//     modal.value = true;
//   } catch (err) {
//     console.log('catch erro: ', err);
//   }
// };
</script>

<style lang="scss" scoped>
.my-team {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .container {
    display: flex;
    flex-direction: row;

    margin-top: 3rem;
  }
}
</style>