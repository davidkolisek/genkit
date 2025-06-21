<!-- components/BToast.vue -->
<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1055">
    <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="toast show align-items-center text-white border-0 mb-2"
        :class="`bg-${toast.type}`"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">
          <strong>{{ toast.title }}</strong><br />
          {{ toast.text }}
        </div>
        <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            aria-label="Close"
            @click="toastStore.removeToast(toast.id)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { useToastStore } from '@/store/toast';

export default {
  setup() {
    const toastStore = useToastStore();
    return { toastStore };
  }
};
</script>

<style scoped>
.toast-container {
  max-width: 300px;
}
</style>
