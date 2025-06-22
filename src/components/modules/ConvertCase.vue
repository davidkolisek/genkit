<template>
  <div class="py-4">
    <div class="mb-3">
      <label for="textInput" class="form-label">Vložte text:</label>
      <textarea
          id="textInput"
          ref="textArea"
          v-model="text"
          class="form-control"
          rows="6"
          placeholder="Sem vložte váš text..."
      ></textarea>
    </div>

    <div class="mb-3">
      <p><strong>Počet znakov:</strong> {{ characterCount }}</p>
      <p><strong>Počet slov:</strong> {{ wordCount }}</p>
      <p><strong>Počet viet:</strong> {{ sentenceCount }}</p>
    </div>

    <div class="d-flex flex-wrap gap-2 mb-3">
      <button class="btn btn-primary" @click="toSentenceCase">Veta s veľkým začiatočným písmenom</button>
      <button class="btn btn-primary" @click="toLowerCase">Malé písmená</button>
      <button class="btn btn-primary" @click="toUpperCase">VEĽKÉ PÍSMENÁ</button>
      <button class="btn btn-primary" @click="toCapitalized">Každé Slovo Veľkým Písmenom</button>
      <button class="btn btn-primary" @click="toKebabCase">kebab-case</button>
      <button class="btn btn-primary" @click="toSnakeCase">snake_case</button>
      <button class="btn btn-outline-secondary" @click="copyToClipboard">
        <i class="bi bi-clipboard"> </i>
      </button>
    </div>

    <div v-if="copied" class="alert alert-success" role="alert">
      Text bol skopírovaný do schránky!
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {useToastStore} from "@/store/toast.js";
const toastStore = useToastStore();

const text = ref('')
const copied = ref(false)
const textArea = ref(null)

onMounted(() => {
  textArea.value.focus()
})

const characterCount = computed(() => text.value.length)

const wordCount = computed(() => {
  return text.value.trim().split(/\s+/).filter(word => word.length > 0).length
})

const sentenceCount = computed(() => {
  return text.value.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length
})

function toSentenceCase() {
  text.value = text.value
      .toLowerCase()
      .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, match => match.toUpperCase())
}

function toLowerCase() {
  text.value = text.value.toLowerCase()
}

function toUpperCase() {
  text.value = text.value.toUpperCase()
}

function toCapitalized() {
  text.value = text.value
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase())
}

function toKebabCase() {
  text.value = text.value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '') // odstráni interpunkciu
      .replace(/\s+/g, '-') // medzery nahradí spojovníkom
}

function toSnakeCase() {
  text.value = text.value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '') // odstráni interpunkciu
      .replace(/\s+/g, '_') // medzery nahradí podčiarkovníkom
}

function copyToClipboard() {
  navigator.clipboard.writeText(text.value).then(() => {
    toastStore.showToast( 'success','Skopírované do schránky!', 'Kód bol skopírovaný do schránky.')
  })
}
</script>

<style scoped>
textarea {
  resize: vertical;
}
</style>
