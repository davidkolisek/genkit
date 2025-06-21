// stores/toastStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
    const toasts = ref([]);
    let nextId = 1;

    function showToast(type, title, text) {
        const id = nextId++;
        toasts.value.push({ id, type, title, text });

        setTimeout(() => {
            removeToast(id);
        }, 3000);
    }

    function removeToast(id) {
        toasts.value = toasts.value.filter(t => t.id !== id);
    }

    return { toasts, showToast, removeToast };
});
