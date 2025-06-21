<script setup>
import IbanExamples from "@/components/modules/IbanExamples.vue";
</script>

<template>
  <div class="container">
    <h1 class="display-5 fw-bold mb-3">
      IBAN Príklady
    </h1>
    <p class="lead text-muted">
      Príklady platných IBAN čísel pre rôzne krajiny a banky. Ideálne pre testovanie a overovanie formátu IBAN.
    </p>
    <IbanExamples />
  </div>
</template>

<style lang="scss" scoped>
.qr-generator-page {
  min-height: calc(100vh - 120px);
}
</style>
