<template>
  <div class="label-tag">
    <template v-if="state.mergedConfig">
      <div v-for="(label, i) in state.mergedConfig.data" :key="label" class="label-item">
        {{ label }} <div :style="`background-color: ${state.mergedConfig.colors[i % state.mergedConfig.colors.length]};`" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { deepClone, deepMerge } from '~/utils'

const props = defineProps({
  config: {
    type: Object,
    default: () => ({}),
  },
})

const state = reactive({
  defaultConfig: {
    /**
         * @description Label data
         * @type {Array<String>}
         * @default data = []
         * @example data = ['label1', 'label2']
         */
    data: [],
    /**
         * @description Label color (Hex|Rgb|Rgba|color keywords)
         * @type {Array<String>}
         * @default colors = ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b']
         * @example colors = ['#666', 'rgb(0, 0, 0)', 'rgba(0, 0, 0, 1)', 'red']
         */
    colors: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
  },

  mergedConfig: null,
})

watch(() => props.config, () => {
  mergeConfig()
})

function mergeConfig() {
  state.mergedConfig = deepMerge(deepClone(state.defaultConfig, true), props.config || {})
}

onMounted (() => {
  mergeConfig()
})
</script>

<style lang="less">
.label-tag {
  display: flex;
  justify-content: center;
  align-items: center;

  .label-item {
    margin: 5px;
    font-size: 15px;
    display: flex;
    align-items: center;

    div {
      width: 12px;
      height: 12px;
      margin-left: 5px;
    }
  }
}
</style>
