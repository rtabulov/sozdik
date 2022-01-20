<script lang="ts" setup>
import { ref } from 'vue';
import { nanoid } from 'nanoid';
import CloseIcon from '../assets/close.svg?component';

const NOTIFICATION_TIMEOUT = 5_000;

type Notification = {
  label: string;
  type?: 'warning' | 'normal' | 'danger' | 'success';
  id?: string | number;
  timeout?: number;
};

const toasts = ref<Notification[]>([]);

const createToast = (toast: Notification) => {
  const id = nanoid();
  toasts.value.unshift({ ...toast, id });

  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }, toast.timeout || NOTIFICATION_TIMEOUT);
};

const removeToast = (id: Notification['id']) => {
  toasts.value = toasts.value.filter((t) => t.id !== id);
};

defineExpose({ createToast });
</script>

<template>
  <!-- container -->
  <div class="fixed bottom-4 right-4 flex flex-col items-end z-10">
    <!-- Toast -->
    <TransitionGroup name="fade" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pl-5 pr-3 py-3 flex justify-between mt-3"
        :class="{
          'bg-dark-50 text-light-900': !toast.type || toast.type === 'normal',
          'bg-green-600 text-light-900':
            !toast.type || toast.type === 'success',
          'bg-red-600 text-light-900': !toast.type || toast.type === 'danger',
          'bg-yellow-600 text-light-900':
            !toast.type || toast.type === 'warning',
        }"
      >
        <span>{{ toast.label }}</span>

        <CloseIcon
          role="button"
          width="24"
          height="24"
          class="align-middle inline-block ml-3 cursor-pointer"
          @click="() => removeToast(toast.id)"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-to {
  transform: translateX(calc(100% + 3rem));
}

.fade-move {
  transition: transform 0.3s ease;
  color: red !important;
}
</style>
