<script setup>
import { ref } from 'vue';
import QRCodeStyling from 'qr-code-styling';

const url = ref('');
const imageFile = ref(null);
const imagePreview = ref(null);
const qrCodeGenerated = ref(false);
const qrCodeInstance = ref(null);
const qrCodeContainer = ref(null);
const showImageUpload = ref(false);

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
    showImageUpload.value = true;
  }
};

const removeImage = () => {
  imageFile.value = null;
  imagePreview.value = null;
};

const qrWidth = ref(600);
const qrHeight = ref(600);

// Ensure width and height don't exceed 1000
const getValidatedSize = (value) => Math.min(Math.max(100, value), 1000);

const generateQRCode = () => {
  if (!url.value || !qrCodeContainer.value) return;

  const width = getValidatedSize(qrWidth.value);
  const height = getValidatedSize(qrHeight.value);

  const options = {
    width,
    height,
    type: 'svg',
    data: url.value,
    dotsOptions: {
      color: '#000000',
      type: 'rounded',
    },
    backgroundOptions: {
      color: '#ffffff',
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 10,
    },
  };

  if (imageFile.value) {
    options.image = imagePreview.value;
  }

  if (!qrCodeInstance.value) {
    qrCodeInstance.value = new QRCodeStyling(options);
    qrCodeInstance.value.append(qrCodeContainer.value);
  } else {
    qrCodeInstance.value.update(options);
  }

  qrCodeGenerated.value = true;
  showImageUpload.value = false;
};

const downloadQRCode = (format) => {
  if (qrCodeInstance.value) {
    qrCodeInstance.value.download({
      name: `qrcode-${new Date().getTime()}`,
      extension: format
    });
  }
};

const resetGenerator = () => {
  url.value = '';
  imageFile.value = null;
  imagePreview.value = null;
  qrCodeGenerated.value = false;
  showImageUpload.value = true;
};
</script>

<template>
  <div class="my-5">
    <div class="justify-content-center">
      <div class="card">
        <div class="card-body">
          <!-- Krok 1: Zadajte URL -->
          <div class="mb-4">
            <h3 class="h5 mb-3">
              <span class="badge bg-primary me-2">1</span>
              Zadajte svoju URL adresu
            </h3>
            <div class="input-group">
              <input
                  v-model="url"
                  type="url"
                  class="form-control form-control-lg"
                  placeholder="https://example.com"
                  @keyup.enter="generateQRCode"
              >
            </div>
            <small class="text-muted">URL adresa, ktorú chcete zakódovať do QR kódu</small>
          </div>

          <div class="mb-4">
            <h3 class="h5 mb-3">
              <span class="badge bg-warning me-2">1.5</span>
              Nastavte veľkosť QR kódu
            </h3>
            <div class="row g-3">
              <div class="col-md-6">
                <label for="qrWidth" class="form-label">Šírka (max 1000px)</label>
                <input
                    type="number"
                    id="qrWidth"
                    class="form-control"
                    v-model.number="qrWidth"
                    min="100"
                    max="1000"
                >
              </div>
              <div class="col-md-6">
                <label for="qrHeight" class="form-label">Výška (max 1000px)</label>
                <input
                    type="number"
                    id="qrHeight"
                    class="form-control"
                    v-model.number="qrHeight"
                    min="100"
                    max="1000"
                >
              </div>
            </div>
            <small class="text-muted">Predvolená veľkosť je 600×600 px</small>
          </div>

          <!-- Krok 2: Nahratie obrázku (voliteľné) -->
          <div class="mb-4">
            <h3 class="h5 mb-3">
              <span class="badge bg-secondary me-2">2</span>
              Pridajte logo (voliteľné)
            </h3>
            <small class="text-muted">
              Logo bude umiestnené v strede QR kódu.
            </small>
            <div class="card border-dashed">
              <div class="card-body text-center">
                <div v-if="!imageFile">
                  <i class="bi bi-image fs-1 text-muted mb-2"></i>
                  <p class="mb-2">Kliknite na prehliadanie</p>
                  <input
                      type="file"
                      class="d-none"
                      id="logoUpload"
                      accept="image/*"
                      @change="onFileChange"
                  >
                  <label for="logoUpload" class="btn btn-outline-secondary">
                    <i class="bi bi-upload me-2"></i>Vybrať obrázok
                  </label>
                </div>
                <div v-else>
                  <img :src="imagePreview" class="img-thumbnail mb-2" style="max-height: 100px">
                  <button @click="removeImage" class="btn btn-sm btn-outline-danger">
                    <i class="bi bi-trash"></i> Odstrániť
                  </button>
                </div>
              </div>
            </div>
            <small class="text-muted">Odporúčané: 100×100px priehľadné PNG alebo SVG</small>
          </div>

          <!-- Zobrazenie QR kódu -->
          <div class="text-center" v-show="qrCodeGenerated">
            <h3 class="h5 mb-3">
              <span class="badge bg-success me-2">3</span>
              Váš QR kód
            </h3>
            <div class="d-flex justify-content-center mb-3">
              <div ref="qrCodeContainer" class="qr-preview border p-2"></div>
            </div>

            <div class="d-flex flex-wrap justify-content-center gap-2">
              <button
                  @click="downloadQRCode('png')"
                  class="btn btn-success"
              >
                <i class="bi bi-download me-2"></i>Stiahnuť PNG
              </button>
              <button
                  @click="downloadQRCode('svg')"
                  class="btn btn-info"
              >
                <i class="bi bi-download me-2"></i>Stiahnuť SVG
              </button>
              <button
                  @click="resetGenerator"
                  class="btn btn-outline-secondary"
              >
                <i class="bi bi-arrow-repeat me-2"></i>Vytvoriť ďalší
              </button>
            </div>
          </div>
        </div>

        <div class="card-footer bg-white" v-if="!qrCodeGenerated">
          <button
              @click="generateQRCode"
              class="btn btn-primary btn-lg w-100"
              :disabled="!url"
          >
            <i class="bi bi-qr-code-scan me-2"></i>Vygenerovať QR kód
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>


</style>