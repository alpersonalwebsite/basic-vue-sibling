<template>
  <div>
    Sibling B
    - Current: {{ counter }}
    <button @click="increase">Increase (5)</button>
    <button @click="centralizedIncrease">Centralized Increase (10)</button>
  </div>
</template>

<script>
import { EventBus } from "../eventBus";

export default {
  name: "SiblingB",
  // Was props: ['counter'], which declares a prop and asserts nothing about it. A
  // component-communication demo is the wrong place to leave that implicit: pass a
  // string and the template happily renders it, pass nothing and you get undefined.
  props: {
    counter: {
      type: Number,
      required: true
    }
  },
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