<script lang="ts" setup>
import { type GridItem } from '@/types/GridItem';
import { ROWS, WORDLEN } from '@/utils';
import { computed } from 'vue';

interface Props {
  grid: GridItem[];
}

const props = defineProps<Props>();

const fullGrid = computed<(GridItem | undefined)[]>(() => [
  ...props.grid,
  ...new Array(WORDLEN * ROWS - props.grid.length).fill(undefined),
]);
</script>

<template>
  <div
    class="grid grid-cols-5 grid-rows-6 gap-1 w-full max-w-64 lg:max-w-xs mx-auto mt-8 text-4xl font-bold uppercase"
  >
    <span
      v-for="(gridItem, idx) in fullGrid"
      :key="idx"
      class="border-2 transition-colors pb-[100%] relative"
      :class="{
        'border-dark-50 bg-transparent': !gridItem?.state,
        'border-dark-50 bg-dark-50': gridItem?.state === 'wrong',
        'border-yellow-600 bg-yellow-600': gridItem?.state === 'displaced',
        'border-green-500 bg-green-500': gridItem?.state === 'right',
      }"
    >
      <span
        class="absolute inset-0 flex items-center justify-center cursor-default select-none"
      >
        {{ gridItem?.char }}
      </span>
    </span>
  </div>
</template>
