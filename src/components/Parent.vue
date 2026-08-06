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
import { EventBus } from "../eventBus";
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
    EventBus.$on("increasing", this.onIncreasing);
  },
  // An EventBus subscription outlives the component unless you remove it. Nothing
  // leaks in THIS app, because Parent is mounted once and never destroyed, and that
  // is exactly the problem with leaving it out of a demo about EventBus: the reader
  // copies the pattern into a route or a v-if, where the component IS destroyed and
  // recreated, and every remount adds another live handler to a bus that is never
  // garbage collected. The counter then jumps by 2, then 3, then 4 per click.
  //
  // $off needs the same function reference it was given, which is why the handler is
  // a method rather than the inline arrow it used to be: an arrow written twice is
  // two different functions and $off would match neither.
  beforeDestroy() {
    EventBus.$off("increasing", this.onIncreasing);
  },
  methods: {
    onIncreasing(intToIncrease) {
      this.counter += intToIncrease;
    }
  }
};
</script>

<style scoped>
</style>