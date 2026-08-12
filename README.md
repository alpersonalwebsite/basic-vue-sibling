# Vue.js: EventBus and communication between sibling components

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

An easy, basic and raw (no styles attached) example of **HOW to** let two sibling
components talk to each other in `Vue 2`, using an `EventBus`.

Props go down and events go up, so two siblings have no direct channel: `SiblingA`
cannot emit to `SiblingB`. The usual answers are to lift the state into the parent
and pass callbacks down, or to reach for `Vuex`. An `EventBus` is the third one: a
bare `Vue` instance used only as an emitter, which any component can import and
both `$emit` on and `$on` to.

| File | Role |
| --- | --- |
| `src/eventBus.js` | the bus itself, a `Vue` instance with one convenience method |
| `src/components/Parent.vue` | owns `counter`, subscribes to `increasing`, passes the value down as a prop |
| `src/components/SiblingA.vue` | emits `increasing` with `1` |
| `src/components/SiblingB.vue` | emits `increasing` with `5`, and calls the bus's own method for `10` |

Both siblings also *receive* the counter as a prop from the parent, so you can watch
one sibling's click update the other's display without either knowing the other
exists.

## The two things worth copying, and the one worth knowing

**Always `$off` what you `$on`.** A bus subscription outlives the component; the bus
is a module-level singleton that is never garbage collected. This app happens not to
leak, because `Parent` is mounted once and never destroyed, but put the same
`created()` in a routed component and every visit adds another live handler. The
counter then moves by 2 per click, then 3, then 4. `Parent.vue` pairs its `$on` with
a `$off` in `beforeDestroy`, and passes a **method** rather than an inline arrow,
because `$off` matches on function identity.

**Keep the bus in its own module.** It used to be exported from `main.js`, which
every component imported back, making the module graph a cycle. It worked only
because the bus is first touched inside `created()`, after `main.js` has finished
evaluating; a top-level reference does not get that luxury.

**An EventBus does not scale, and that is fine here.** Every emit is global and
untyped, so nothing tells you who listens to `increasing` except grep. Past two or
three events, that is what `Vuex` is for (see
[basic-vue-vuex](https://github.com/alpersonalwebsite/basic-vue-vuex)). Vue 3 removed
`$on`/`$off`/`$once` from the instance API for the same reason ("Component instances no
longer implement the event emitter interface", per the [migration
guide](https://v3-migration.vuejs.org/breaking-changes/events-api.html), which points at
`mitt` or `tiny-emitter` if you still want a bus), so this pattern is Vue 2 only.

## Project setup

```shell
npm install
```

### Compiles and hot-reloads for development

```shell
npm run serve
```

### Compiles and minifies for production

```shell
npm run build
```

**On Node 17 or newer this fails** with `ERR_OSSL_EVP_UNSUPPORTED`. That is webpack 4
(via `@vue/cli-service` 4) using an MD4 hash that OpenSSL 3 no longer provides, not a
problem with this code. `.nvmrc` says `lts/*`, which today resolves to a Node well
past 17. The dependencies here are deliberately left at their versions, so pass the
flag instead:

```shell
NODE_OPTIONS=--openssl-legacy-provider npm run build
```

`npm run serve` is unaffected.

### Lints and fixes files

```shell
npm run lint
```

Note the `run`. `npm serve` is not a command, and neither are `npm build` or
`npm lint`; earlier versions of this README omitted it. `yarn` allows the shorthand,
`npm` does not.

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
