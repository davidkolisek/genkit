<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import BToast from "@/components/BToast.vue";
import {tools} from "@/helpers/constants.js";

const showSidebar = ref(false);

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};
</script>

<template>
  <div class="app-container d-flex flex-column">
    <div class="d-flex flex-grow-1">
      <!-- Mobilné hamburger tlačidlo -->
      <button
          class="btn btn-dark d-lg-none mobile-menu-btn"
          @click="toggleSidebar"
      >
        <i class="bi bi-list"></i>
      </button>

      <!-- Bočná navigácia -->
      <div
          class="sidebar bg-dark text-white p-3"
          :class="{ 'mobile-show': showSidebar }"
      >
        <div class="sidebar-inner">
          <div class="sidebar-header mb-4">
            <router-link class="text-decoration-none" to="/">
              <h2 class="h4">GenKit</h2>
            </router-link>
            <hr class="border-light my-2">
          </div>
          <nav class="nav flex-column">
            <RouterLink
                v-for="tool in tools"
                :key="tool.url"
                :to="tool.url"
                class="nav-link text-white"
                @click="showSidebar = false"
            >
              <i :class="tool.icon + ' me-2'"></i>{{ tool.title }}
            </RouterLink>
          </nav>
        </div>
      </div>

      <!-- Hlavná obsahová oblasť -->
      <div
          class="main-content flex-grow-1 p-2 p-md-4 mt-5 mt-md-0"
          :class="{ 'mobile-blur': showSidebar }"
          @click="showSidebar = false"
      >
        <RouterView />
        <b-toast />
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer bg-dark text-center py-3 mt-auto">
      <small class="text-muted">
        © 2025 GenKit. Všetky práva vyhradené.
      </small>
    </footer>
  </div>
</template>

<style lang="scss">
$footer-height: 53px;
body {
  background: #f7f7f7!important;
}
.app-container {
  min-height: calc(100vh - $footer-height);
  position: relative;
}

.main-content {
  background: #f7f7f7;
}

.sidebar {
  width: 300px;
  min-height: calc(100vh - $footer-height);
  transition: transform 0.3s ease;
  &-inner {
    position: sticky;
    top: 20px;
  }
}

.mobile-menu-btn {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1050;
  display: none;
}

.nav-link {
  border-radius: 4px;
  padding: 8px 12px;
  margin-bottom: 4px;
  transition: all 0.2s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 500;
}

.footer {
  font-size: 0.875rem;
}

@media (max-width: 992px) {
  .mobile-menu-btn {
    display: block;
  }

  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1040;
    transform: translateX(-100%);
  }

  .sidebar.mobile-show {
    transform: translateX(0);
  }

  .main-content.mobile-blur {
    filter: blur(2px);
    pointer-events: none;
    user-select: none;
  }
}
</style>
