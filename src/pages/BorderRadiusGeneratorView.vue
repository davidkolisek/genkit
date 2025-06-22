<script setup>
import BorderRadiusGenerator from "@/components/modules/BorderRadiusGenerator.vue";
</script>

<template>
  <div class="container">
    <h1 class="display-5 fw-bold mb-3">
      Border Radius Generator
    </h1>
    <p class="lead text-muted">
      Generujte CSS vlastnosti pre zaoblené rohy pomocou jednoduchého formulára. Ideálne pre rýchle vytváranie štýlov pre vaše webové projekty.
    </p>
    <BorderRadiusGenerator />
  </div>
</template>

<style lang="scss" scoped>
.qr-generator-page {
  min-height: calc(100vh - 120px);
}
</style>
