<script setup>
import ConvertCase from "@/components/modules/ConvertCase.vue";
</script>

<template>
  <div class="container">
    <h1 class="display-5 fw-bold mb-3">
      Textový prevodník
    </h1>
    <p class="lead text-muted">
      Upravte text do rôznych formátov ako CamelCase, kebab-case, snake_case a ďalšie. Ideálne pre rýchle úpravy textu a kódovania.
    </p>
    <ConvertCase />
  </div>
</template>

<style lang="scss" scoped>
.qr-generator-page {
  min-height: calc(100vh - 120px);
}
</style>
