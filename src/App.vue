<template>
  <div id="app">
    <Parent />
  </div>
</template>

<script>
import Parent from './components/Parent.vue'

export default {
  name: 'app',
  components: {
    Parent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 30px;
}
</style>
