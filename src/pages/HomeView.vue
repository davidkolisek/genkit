<script setup>
import { RouterLink } from 'vue-router';
import {tools} from "@/helpers/constants.js";
</script>

<template>
  <section class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-5 fw-bold">Vitajte v <span class="text-primary">GenKit</span></h1>
      <p class="lead text-muted">
        Online nástroje pre generovanie slovenských údajov – rýchlo, jednoducho a zdarma.
      </p>
    </div>

    <div class="row g-4">
      <div class="col-md-6 col-lg-4" v-for="tool in tools" :key="tool.title">
        <div class="card h-100 shadow-sm border-0">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">
              <i :class="tool.icon" class="me-2"></i>{{ tool.title }}
            </h5>
            <p class="card-text flex-grow-1">{{ tool.description }}</p>
            <RouterLink :to="tool.url ? tool.url : '/'" class="btn btn-outline-primary mt-3">
              Otvoriť
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5 text-center">
      <small class="text-muted">Viac generátorov už čoskoro!</small>
    </div>
  </section>
</template>

<script>
</script>

<style lang="scss" scoped>
.card-title {
  font-weight: 600;
}
</style>
