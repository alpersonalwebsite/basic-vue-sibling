<template>
  <div>
    Sibling A
    - Current: {{ counter }}
    <button @click="increase">Increase (1)</button>
  </div>
</template>

<script>
import { EventBus } from "../eventBus";

export default {
  name: "SiblingA",
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
      EventBus.$emit("increasing", 1);
    }
  }
};
</script>

<style>
</style>