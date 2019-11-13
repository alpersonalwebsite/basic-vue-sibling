<template>
  <div>
    Sibling A
    - Current: {{ counter }}
    <button @click="increase">Increase (1)</button>
  </div>
</template>

<script>
import { EventBus } from "../main";

export default {
  name: "SiblingA",
  props: ['counter'],
  methods: {
    increase() {
      EventBus.$emit("increasing", 1);
    }
  }
};
</script>

<style>
</style>