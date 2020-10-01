<template>
  <div
    class="scene"
    :style="{
      perspective: `${options.perspective}px`,
    }"
  >
    <div class="scene-card right is-flipped" :style="getStyle(0)">
      <div class="card__face card__face__back">
        <slot name="first" />
      </div>
    </div>

    <div
      v-for="(c, i) in list"
      :key="i"
      class="scene-card right"
      :class="{
        is__flipped: isFlipped(i),
      }"
      :style="getStyle(i)"
      @click="onCardClick(i, true)"
    >
      <div class="card__face card__face__front">
        <slot name="face_front" :item="c" :index="i" :list="list" />
      </div>
      <div class="card__face card__face__back">
        <slot name="face_back" :item="c" :index="i" :list="list" />
      </div>
    </div>

    <div
      class="scene-card right"
      :style="getStyle(list.length)"
      @click="goToStart"
    >
      <div class="card__face card__face__front">
        <slot name="last" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    options: {
      type: Object,
      default: () => ({
        duration: 1500,
        perspective: 1500,
        delay: 1000,
        autoplay: false,
        loop: false,
      }),
    },

    list: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      active: 0,
      direction: 0,
      zIndex: [],
      skip: false,
      interval: 0,
    };
  },

  watch: {
    'options.autoplay': {
      handler(val) {
        if (val) {
          this.interval = setInterval(() => {
            const i = this.active + this.direction;

            if (
              this.options.loop &&
              i === this.list.length - 1 &&
              this.direction < 0
            ) {
              this.goToStart();
              return;
            }

            if (!this.skip) {
              this.onCardClick(i, false);
            }

            this.skip = false;
          }, this.options.duration + this.options.delay);
        } else {
          clearInterval(this.interval);
        }
      },
      immediate: true,
    },
  },

  methods: {
    isFlipped(i: number) {
      return i < this.active;
    },

    getStyle(i: number) {
      return {
        zIndex: this.zIndex[i] || -i,
        transitionDuration: `${this.options.duration}ms`,
      };
    },

    calcDirection() {
      if (this.active === 0) {
        if (this.direction < 0) {
          this.direction = 0;
        } else {
          this.direction = 1;
        }
      } else if (this.active === this.list.length) {
        if (this.direction > 0) {
          this.direction = 0;
        } else {
          this.direction = -1;
        }
      }
    },

    goToStart() {
      const l = this.list.length - 1;
      const getT = (i: number) => (this.options.duration / 6) * (l + 1 - i);

      for (let i = l; i >= 0; i--) {
        setTimeout(() => {
          this.onCardClick(i, false);
        }, getT(i));
      }
    },

    onCardClick(i: number, s: boolean) {
      this.$set(this.zIndex, i, i);

      if (this.isFlipped(i)) {
        this.active -= 1;

        setTimeout(() => {
          this.$set(this.zIndex, i, this.zIndex[i] * -1);
        }, this.options.duration / 2);
      } else {
        this.active += 1;
      }

      this.skip = s;
      this.calcDirection();
    },
  },
});
</script>

<style lang="scss" scoped>
.scene {
  position: relative;
  display: flex;
  &-card {
    position: absolute;
    width: 50%;
    height: 100%;
    transition: transform;
    transform-style: preserve-3d;
    cursor: pointer;
    &.is__flipped {
      transform: rotateY(-180deg);
      transform-origin: top left;
    }
    &.right {
      transform-origin: top left;
      right: 0;
    }
    &.left {
      left: 0;
      transform-origin: top right;
    }
  }
}

.card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  backface-visibility: hidden;
  &__back {
    transform: rotateY(180deg);
  }
}
</style>
