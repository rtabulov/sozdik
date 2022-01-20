<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import TheHeader from './components/TheHeader.vue';
import WordGrid from './components/WordGrid.vue';
import ToastNotifications from './components/ToastNotifications.vue';
import { GridItem } from './types/GridItem';
import { WORDLEN } from './utils';
import { alpabet } from './utils/alphabet';
import { secretWords, validWords } from './utils/words.json';

const props = defineProps<{ secretWord: string }>();

const currentWord = ref('');
const prevTries = ref<GridItem[]>([]);
const toastsRef = ref<InstanceType<typeof ToastNotifications> | null>(null);

const grid = computed(() => [
  ...prevTries.value,
  ...Array.from(currentWord.value).map<GridItem>((char) => ({
    char,
  })),
]);

const tryCurrentWord = () => {
  if (currentWord.value.length === WORDLEN) {
    if (
      validWords.includes(currentWord.value) ||
      secretWords.includes(currentWord.value)
    ) {
      if (currentWord.value === props.secretWord) {
        // show win screen
        prevTries.value = prevTries.value.concat(
          makePrevTry(currentWord.value, props.secretWord)
        );
        currentWord.value = '';
        removeEventListeners();
      } else {
        // show word is wrong
        prevTries.value = prevTries.value.concat(
          makePrevTry(currentWord.value, props.secretWord)
        );
        currentWord.value = '';
      }
    } else {
      // word is invalid
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toastsRef.value?.createToast({
        label: 'Enter an existing word',
      });
    }
  } else {
    // todo show word length warning
  }
};

function makePrevTry(guess: string, answer: string): GridItem[] {
  return Array.from(guess).map((char, idx) => {
    let state: GridItem['state'] = null;

    if (char === answer[idx]) {
      state = 'right';
    } else if (answer.includes(char)) {
      state = 'displaced';
    } else {
      state = 'wrong';
    }

    return { char, state };
  });
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;

  const key = e.key.toLowerCase();

  if (key === 'enter') {
    tryCurrentWord();
    return;
  }

  if (key === 'backspace' && currentWord.value.length > 0) {
    currentWord.value = currentWord.value.slice(0, -1);
    return;
  }

  if (alpabet.includes(key) && currentWord.value.length < WORDLEN) {
    currentWord.value += key;
  }
};

const addEventListeners = () => {
  window.addEventListener('keydown', handleKeyDown);
};

const removeEventListeners = () => {
  window.removeEventListener('keydown', handleKeyDown);
};

onMounted(addEventListeners);
onUnmounted(removeEventListeners);
</script>

<template>
  <div
    class="bg-dark-900 text-light-900 min-h-screen px-md-0 px-4 pt-md-0 pt-3"
  >
    <div class="container mx-auto max-w-2xl">
      <div class="flex flex-col">
        <TheHeader />
        <WordGrid :grid="grid" />
      </div>
    </div>
  </div>

  <ToastNotifications ref="toastsRef" />
</template>
