<template>
  <div class="home">
    <img alt="Vue logo" src="https://storage.googleapis.com/pebble-v-0/img/logos/pebble-color-256.png">
  </div>
  <Bonne msg="Allez..." data="none" />
</template>

<script>
// @ is an alias to /src
import Bonne from '@/components/Bonne.vue'

export default {
  name: 'Toto',
  components: {
    Bonne
  }
}
</script>
