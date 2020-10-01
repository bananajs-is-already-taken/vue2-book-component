# Vue 2 Book Component

<img src="logo.svg" align="right"
     alt="Book logo made by Freepik" width="120" height="102">

Distributed under LGPL-3.0-or-later license

Book component for Vue 2. It provides easy, flexible API and great customizability.

- You can make your book interactive
- Or create interactive journal
- Or you just need to do something fast and easy way

## Usage

```ts
// main.ts

import Vue from 'vue';
import BananaVue2BookPlugin from '@bananajs/vue2-book-component';
import '@bananajs/vue2-book-component/BananaVue2Book.css';
import App from './App.vue';

Vue.use(BananaVue2BookPlugin);
new Vue({
  render: h => h(App)
}).$mount('#app');
```

```html
// App.vue

<template>
  <banana-vue2-book :options="options" :list="list">
      <template #first>
      </template>

      <!-- item of slot data is the same object in list prop -->
      <template #face_front="{ item }">
      </template>

      <template #face_back="{ item }">
      </template>

      <template #last>
      </template>
  </banana-vue3-book>
</template>
<script>
export default {
  data() {
    return {
      options: {
        duration: 1500,
        perspective: 1500,
        delay: 1000,
        autoplay: true,
        loop: false,
      },
      list: [/* your data to show */]
    }
  }
}
</script>
```

## API

### Props

| Name      | Type   | Purpose                    |
| --------- | ------ | -------------------------- |
| `options` | Object | Different options for book |
| `list`    | Array  | Your pages to show         |

### Options object

#### `duration`

How fast will work auto flip.

Default: `1500`

#### `perspective`

Default: 1500

#### `delay`

Delay between page turn

Default: 1000

#### `autoplay`

Turn on/off auto play

Default: false

#### `loop`

Turn on/off loop

Default: false

### Slots

| Name         | Data       | Purpose            |
| ------------ | ---------- | ------------------ |
| `first`      | None       | First item in book |
| `face_front` | `{ item }` | Face of the page   |
| `face_back`  | `{ item }` | Back of the page   |
| `last`       | None       | Last item in book  |

## Contributing

1. Fork it (<https://github.com/bananajs-is-already-taken/vue2-book-component/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes using a semantic commit message.
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Assets

Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
