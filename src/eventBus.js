import Vue from 'vue'

// The bus lives in its own module, not in main.js.
//
// It used to be `export const EventBus` inside main.js, which every component
// imported back with `from '../main'`. That is a circular import:
// main.js -> App.vue -> Parent.vue -> main.js. It happened to work only because
// EventBus is first touched inside created(), by which time main.js has finished
// evaluating and the binding is populated. Touch it at the top level of a
// component module instead and it is not initialised yet: reproduced on the same
// module graph, Node's ESM raises "ReferenceError: Cannot access 'EventBus'
// before initialization" (a bundler's interop may hand you `undefined` instead,
// which is harder to diagnose, not easier).
//
// A dedicated module has no cycle, so there is no ordering to get right.
export const EventBus = new Vue({
  methods: {
    // The "centralized" half of the demo: instead of every sibling emitting the
    // event itself, the bus exposes a method that emits on their behalf. Same
    // event, one place to change it.
    centralizedIncrease(intToIncrease) {
      this.$emit('increasing', intToIncrease)
    }
  }
})

export default EventBus
