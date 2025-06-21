<script setup>
import QrCodeGenerator from "@/components/modules/QrCodeGenerator.vue";
</script>

<template>
  <div class="container">
    <h1 class="display-5 fw-bold mb-3">
      QR kód Generátor
    </h1>
    <p class="lead text-muted">
      Vytvorte vlastné QR kódy za pár sekúnd. Zadajte svoju URL adresu a voliteľne vložte logo.
      Stiahnite ako PNG alebo SVG pre tlač, webstránky alebo marketingové materiály.
      <br>
      <strong>
        Neobmedzený počet QR kódov zadarmo, bez registrácie. Ideálne na osobné alebo firemné použitie.
      </strong>
    </p>
    <QrCodeGenerator />
  </div>
</template>

<style lang="scss" scoped>
.qr-generator-page {
  min-height: calc(100vh - 120px);
}
</style>
