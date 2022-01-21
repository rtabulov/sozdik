<script lang="ts" setup>
interface Props {
  keyboard?: (string | string[])[];
}

withDefaults(defineProps<Props>(), {
  keyboard: () => [
    'qwertyuiop',
    'asdfghjkl',
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
  ],
});

const emit = defineEmits<{ (e: 'keypress', key: string): void }>();
const onClick = (key: string) => emit('keypress', key);
</script>

<template>
  <div class="flex flex-col md:gap-1.5 gap-1 text-sm">
    <div
      v-for="row in keyboard"
      :key="row.toString()"
      class="flex md:gap-1.5 gap-1 justify-center"
    >
      <button
        v-for="key in row"
        :key="key"
        class="cursor-pointer px-2 py-3 md:px-3 md:py-4 bg-gray-500 text-light-900 rounded-md md:min-w-9 md:min-h-12 min-w-7 min-h-10 flex items-center justify-center uppercase"
        @click="() => onClick(key)"
      >
        <slot name="key" v-bind="{ key }">{{ key }}</slot>
      </button>
    </div>
  </div>
</template>
