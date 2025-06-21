<script setup>
import PayBySquareQrGenerator from "@/components/modules/PayBySquareQrGenerator.vue";
</script>

<template>
  <div class="container">
    <h1 class="display-5 fw-bold mb-3">
      PayBySquare QR Generátor
    </h1>
    <p class="lead text-muted">
      Generujte platobné QR kódy podľa slovenského štandardu Pay By Square
    </p>
    <pay-by-square-qr-generator />
  </div>
</template>

<style lang="scss" scoped>
.qr-generator-page {
  min-height: calc(100vh - 120px);
}
</style>
