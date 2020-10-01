import { VueConstructor, Component } from 'vue';
import Book from './Book.vue';

/**
 * Load a component.
 * @param {object} app
 * @param {string} Component name
 * @param {object} Component definition
 */
export const registerComponent = (app: VueConstructor, name: string, def: unknown): void => {
  if (app && name && def) {
    app.component(name, def as Vue);
  }
};

/**
 * Load a group of components.
 * @param {object} app
 * @param {object} Object of component definitions
 */
export const registerComponents = (
  app: VueConstructor,
  components: Record<string, Component> = {}
): void => {
  Object.keys(components).forEach(key => {
    registerComponent(app, key, components[key]);
  });
};

export { default as BananaVue2Book } from './Book.vue';
export default {
  install: (app: VueConstructor): void => {
    registerComponents(app, {
      'banana-vue2-book': Book
    });
  }
};
