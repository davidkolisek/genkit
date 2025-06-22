<script setup>
import { ref } from 'vue';

const showAdvanced = ref(false);
const qrUrl = ref('');
const formData = ref({
  iban: '',
  amount: '5',
  beneficiary_name: '',
  currency: 'EUR',
  due_date: '',
  vs: '',
  ss: '',
  cs: '',
  payment_note: '',
  beneficiary_address1: '',
  beneficiary_address2: '',
  size: '512',
  format: 'png'
});

const toggleAdvanced = () => {
  showAdvanced.value = !showAdvanced.value;
};

const generateQR = () => {
  if (!formData.value.iban || !formData.value.amount) {
    alert("Please enter IBAN and amount");
    return;
  }

  const params = new URLSearchParams();
  params.append('iban', formData.value.iban.replace(/\s/g, ''));
  params.append('amount', formData.value.amount);
  params.append('currency', formData.value.currency);
  params.append('size', formData.value.size);
  params.append('transparent', 'false');

  if (formData.value.due_date) params.append('due_date', formData.value.due_date);
  if (formData.value.vs) params.append('vs', formData.value.vs);
  if (formData.value.ss) params.append('ss', formData.value.ss);
  if (formData.value.cs) params.append('cs', formData.value.cs);
  if (formData.value.payment_note) params.append('payment_note', encodeURIComponent(formData.value.payment_note));
  if (formData.value.beneficiary_name) params.append('beneficiary_name', encodeURIComponent(formData.value.beneficiary_name));
  if (formData.value.beneficiary_address1) params.append('beneficiary_address1', encodeURIComponent(formData.value.beneficiary_address1));
  if (formData.value.beneficiary_address2) params.append('beneficiary_address2', encodeURIComponent(formData.value.beneficiary_address2));

  qrUrl.value = `https://api.qrgenerator.sk/by-square/pay/qr.${formData.value.format}?${params.toString()}`;
};

const downloadImage = () => {
  if (!qrUrl.value) {
    alert("Please generate QR code first");
    return;
  }

  const a = document.createElement('a');
  a.href = qrUrl.value + (qrUrl.value.includes('?') ? '&' : '?') + 'download=' + new Date().getTime();
  a.download = `pay-by-square-qr.${formData.value.format}`;
  a.target = '_blank';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
</script>

<template>
  <div class="my-5">
    <div class="justify-content-center">
      <!-- Formulár generátora -->
      <div class="card mb-5">
        <div class="card-body">
          <form @submit.prevent="generateQR">
            <div class="mb-3">
              <label for="iban" class="form-label">IBAN*</label>
              <input
                  v-model="formData.iban"
                  type="text"
                  class="form-control"
                  id="iban"
                  placeholder="SK8975000000000012345671"
                  required
              >
            </div>

            <div class="mb-3">
              <label for="amount" class="form-label">Suma (€)*</label>
              <input
                  v-model="formData.amount"
                  type="number"
                  class="form-control"
                  id="amount"
                  step="0.01"
                  placeholder="10.00"
                  required
              >
            </div>

            <div class="mb-3">
              <label for="beneficiary_name" class="form-label">Meno príjemcu</label>
              <input
                  v-model="formData.beneficiary_name"
                  type="text"
                  class="form-control"
                  id="beneficiary_name"
              >
            </div>

            <button
                type="button"
                class="btn btn-outline-secondary w-100 mb-3"
                @click="toggleAdvanced"
            >
              <i class="bi" :class="showAdvanced ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
              {{ showAdvanced ? 'Skryť rozšírené možnosti' : 'Zobraziť rozšírené možnosti' }}
            </button>

            <div v-if="showAdvanced" class="advanced-options p-3 bg-light rounded mb-3">
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="currency" class="form-label">Mena</label>
                  <input
                      v-model="formData.currency"
                      type="text"
                      class="form-control"
                      id="currency"
                  >
                </div>
                <div class="col-md-6">
                  <label for="due_date" class="form-label">Dátum splatnosti</label>
                  <input
                      v-model="formData.due_date"
                      type="date"
                      class="form-control"
                      id="due_date"
                  >
                </div>
                <div class="col-md-4">
                  <label for="vs" class="form-label">Variabilný symbol</label>
                  <input
                      v-model="formData.vs"
                      type="text"
                      class="form-control"
                      id="vs"
                  >
                </div>
                <div class="col-md-4">
                  <label for="ss" class="form-label">Špecifický symbol</label>
                  <input
                      v-model="formData.ss"
                      type="text"
                      class="form-control"
                      id="ss"
                  >
                </div>
                <div class="col-md-4">
                  <label for="cs" class="form-label">Konštantný symbol</label>
                  <input
                      v-model="formData.cs"
                      type="text"
                      class="form-control"
                      id="cs"
                  >
                </div>
                <div class="col-12">
                  <label for="payment_note" class="form-label">Poznámka k platbe</label>
                  <input
                      v-model="formData.payment_note"
                      type="text"
                      class="form-control"
                      id="payment_note"
                  >
                </div>
                <div class="col-md-6">
                  <label for="beneficiary_address1" class="form-label">Adresa príjemcu 1</label>
                  <input
                      v-model="formData.beneficiary_address1"
                      type="text"
                      class="form-control"
                      id="beneficiary_address1"
                  >
                </div>
                <div class="col-md-6">
                  <label for="beneficiary_address2" class="form-label">Adresa príjemcu 2</label>
                  <input
                      v-model="formData.beneficiary_address2"
                      type="text"
                      class="form-control"
                      id="beneficiary_address2"
                  >
                </div>
                <div class="col-md-6">
                  <label for="size" class="form-label">Veľkosť QR kódu</label>
                  <select v-model="formData.size" class="form-select" id="size">
                    <option value="128">128 px</option>
                    <option value="256">256 px</option>
                    <option value="512">512 px</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="format" class="form-label">Formát</label>
                  <select v-model="formData.format" class="form-select" id="format">
                    <option value="png">PNG</option>
                    <option value="jpg">JPG</option>
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-primary w-100 py-2">
              <i class="bi bi-qr-code me-2"></i>Generovať QR kód
            </button>
          </form>
        </div>
      </div>

      <!-- Náhľad QR kódu -->
      <div v-if="qrUrl" class="card ">
        <div class="card-body text-center">
          <h3 class="h5 mb-3">Váš PayBySquare QR kód</h3>
          <img :src="qrUrl" class="img-fluid mb-3" alt="Vygenerovaný QR kód">
          <div class="d-flex flex-wrap justify-content-center gap-2">
            <button @click="downloadImage" class="btn btn-success">
              <i class="bi bi-download me-2"></i>Stiahnuť QR kód
            </button>
          </div>
        </div>
      </div>

      <!-- Informačné sekcie -->
      <div class="mt-5">
        <div class="card-body">
          <h2 class="h4 mb-3">O tomto nástroji</h2>
          <p>
            Tento nástroj vám umožňuje rýchlo a jednoducho vytvárať QR kódy pre bezhotovostné platby na Slovensku
            pomocou štandardu Pay By Square.
          </p>
          <p class="mb-0">
            <strong>Žiadne osobné alebo platobné údaje nie sú ukladané.</strong>
          </p>
        </div>
      </div>

      <div class="mt-3">
        <div class="card-body">
          <h2 class="h4 mb-3">Informácie o API</h2>
          <p class="mb-0">
            Generovanie QR kódov je zabezpečené externou API službou dostupnou na:
            <a href="https://qrgenerator.sk/" target="_blank" rel="noopener noreferrer">
              qrgenerator.sk
            </a>.
            Táto služba podporuje parametre ako IBAN, suma, dátum splatnosti, variabilný symbol a ďalšie podľa
            slovenského bankového štandardu.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.advanced-options {
  transition: all 0.3s ease;
}

.card {
  border-radius: 0.5rem;
}

.img-fluid {
  max-width: 100%;
  height: auto;
  border-radius: 0.25rem;
}
</style>