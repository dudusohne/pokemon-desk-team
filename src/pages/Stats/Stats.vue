<template>
    <div class="stats">
        <div class="container">

        </div>

    </div>
</template>

<script setup lang="ts">
import { getDatabase, ref as Ref, get, child} from "firebase/database";

const dbRef = Ref(getDatabase());
get(child(dbRef, `users/`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
</script>

<style lang="scss">
.stats {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-color: rgb(117, 44, 44);

        width: 10rem;
        height: 10rem;
    }
}
</style>