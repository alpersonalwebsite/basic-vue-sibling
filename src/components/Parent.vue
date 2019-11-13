<template>
  <div>
    Parent - Current: {{ counter }}
    <br /><br />
    <SiblingA :counter="counter" />
    <br />
    <SiblingB :counter="counter" />
  </div>
</template>

<script>
import { EventBus } from "../main";
import SiblingA from "./SiblingA.vue";
import SiblingB from "./SiblingB.vue";

export default {
  name: "Parent",
  components: {
    SiblingA,
    SiblingB
  },
  data: function() {
    return {
      counter: 0
    };
  },
  created() {
    EventBus.$on('increasing', intToIncrease => {
      this.counter += intToIncrease;
    });
  }
};
</script>

<style scoped>
</style>