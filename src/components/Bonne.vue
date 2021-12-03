<script>
export default {
    name: 'Bonne',
    props: {
    msg: String,
    data: String
  }
}
</script>

<template>
    <div class="bonne">{{ msg }}</div>
    <p>{{ data }}</p>
</template>

<style>
div.bonne{
    border: 1px solid red;
}
</style>