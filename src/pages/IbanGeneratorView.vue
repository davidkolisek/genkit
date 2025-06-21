<script setup>
import IbanGenerator from "@/components/modules/IbanGenerator.vue";
</script>

<template>
  <div class="container">
    <h1 class="display-5 fw-bold mb-3">
      Generátor IBAN čísla
    </h1>
    <p class="lead text-muted">
      Vytvorte platné IBAN číslo podľa oficiálnych pravidiel. Zadajte krajinu, bankový kód a číslo účtu.
    </p>
    <IbanGenerator />
  </div>
</template>

<style lang="scss" scoped>
.qr-generator-page {
  min-height: calc(100vh - 120px);
}
</style>
