<template>
  <div>
    Sibling B
    - Current: {{ counter }}
    <button @click="increase">Increase (5)</button>
    <button @click="centralizedIncrease">Centralized Increase (10)</button>
  </div>
</template>

<script>
import { EventBus } from "../main";

export default {
  name: "SiblingB",
  props: ['counter'],
  methods: {
    increase() {
      EventBus.$emit("increasing", 5);
    },
    centralizedIncrease() {
      EventBus.centralizedIncrease(10)
    }
  }
};
</script>

<style>
</style>