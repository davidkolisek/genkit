<template>
  <div class="container py-4">
    <div class="row">
      <!-- Left Column: Box and Inputs -->
      <div class="col-lg-6 col-12">
        <div
            class="border-box mb-3"
            :style="{ width: width + 'px', height: height + 'px', borderRadius, background: gradient, boxShadow }"
        ></div>

        <div class="d-flex gap-3">
          <div class="flex-fill">
            <label for="wInput" class="form-label">Width (px)</label>
            <input v-model="width" type="number" class="form-control" max="500" />
          </div>
          <div class="flex-fill">
            <label for="hInput" class="form-label">Height (px)</label>
            <input v-model="height" type="number" class="form-control" max="500" />
          </div>
        </div>
      </div>

      <!-- Right Column: Tabs and Outputs -->
      <div class="col-lg-6 col-12">
        <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link" :class="{ active: tab === 'br' }" @click="tab = 'br'">border-radius</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" :class="{ active: tab === 'bg' }" @click="tab = 'bg'">linear-gradient</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" :class="{ active: tab === 'bs' }" @click="tab = 'bs'">box-shadow</button>
          </li>
        </ul>

        <!-- Tab Panels -->
        <div v-if="tab === 'br'">
          <p>Border radius</p>
          <code class="d-block mb-2">{{ borderRadiusOutput }}</code>
          <div class="d-flex gap-2">
            <button class="btn btn-primary" @click="generateRadius">Generate!</button>
            <button class="btn btn-outline-secondary" @click="copyText(borderRadiusOutput)"><i class="bi bi-clipboard"></i></button>
          </div>
        </div>

        <div v-if="tab === 'bg'">
          <p>Linear gradient</p>
          <code class="d-block mb-2">{{ gradientOutput }}</code>
          <div class="d-flex gap-2">
            <button class="btn btn-primary" @click="generateGradient">Generate!</button>
            <button class="btn btn-outline-secondary" @click="copyText(gradientOutput)"><i class="bi bi-clipboard"></i></button>
          </div>
        </div>

        <div v-if="tab === 'bs'">
          <p>Box shadow</p>
          <code class="d-block mb-2">{{ boxShadowOutput }}</code>
          <div class="d-flex gap-2">
            <button class="btn btn-primary" @click="generateBoxShadow">Generate!</button>
            <button class="btn btn-outline-secondary" @click="copyText(boxShadowOutput)"><i class="bi bi-clipboard"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {useToastStore} from "@/store/toast.js";
const toastStore = useToastStore();

const width = ref(200)
const height = ref(200)
const tab = ref('br')

const borderRadius = ref('')
const borderRadiusOutput = ref('')

const gradient = ref('')
const gradientOutput = ref('')

const boxShadow = ref('')
const boxShadowOutput = ref('')


function generateRadius() {
  const rnd = () => Math.floor(Math.random() * 100)
  borderRadius.value = `${rnd()}% ${rnd()}% ${rnd()}% ${rnd()}% / ${rnd()}% ${rnd()}% ${rnd()}% ${rnd()}%`
  borderRadiusOutput.value = `border-radius: ${borderRadius.value};`
}

function generateGradient() {
  const randHex = () => Math.random().toString(16).slice(2, 8)
  const c1 = randHex()
  const c2 = randHex()
  const directions = ['top', 'left', 'right', 'bottom']
  const types = ['linear']
  const dir = directions[Math.floor(Math.random() * directions.length)]
  const type = types[Math.floor(Math.random() * types.length)]
  gradient.value = `${type}-gradient(to ${dir}, #${c1}, #${c2})`
  gradientOutput.value = `background: ${gradient.value};`
}

function generateBoxShadow() {
  const offsetX = Math.floor(Math.random() * 101) - 50
  const offsetY = Math.floor(Math.random() * 100)
  const blur = Math.floor(Math.random() * 100)
  const color = Math.random().toString(16).slice(2, 8)
  boxShadow.value = `${offsetX}px ${offsetY}px ${blur}px #${color}`
  boxShadowOutput.value = `box-shadow: ${boxShadow.value};`
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    toastStore.showToast( 'success','Skopírované do schránky!', 'Kód bol skopírovaný do schránky.')
  })
}

onMounted(() => {
  generateRadius()
  generateGradient()
  generateBoxShadow()
})
</script>

<style scoped>
.border-box {
  background-color: #fff;
  border: 1px solid #ccc;
  transition: all 0.3s ease-in-out;
}
</style>
