<script setup>
import BirthNumberGenerator from "@/components/modules/BirthNumberGenerator.vue";
</script>

<template>
  <div class="container">
    <h1 class="display-5 fw-bold mb-3">
      Generátor rodných čísiel
    </h1>
    <p class="lead text-muted">
      Generujte platné slovenské rodné čísla podľa oficiálnych pravidiel
    </p>
    <birth-number-generator />
  </div>
</template>

<style lang="scss" scoped>
.qr-generator-page {
  min-height: calc(100vh - 120px);
}
</style>
