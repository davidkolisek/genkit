<template>
  <div class="my-5">
    <div class="justify-content-center">
      <!-- Generator Form -->
      <div class="card mb-5">
        <div class="card-body">
          <form @submit.prevent="generateNumbers">
            <div class="row g-3">
              <!-- Age Input -->
              <div class="col-md-6">
                <label for="age" class="form-label">Vek</label>
                <input
                    v-model.number="formData.age"
                    type="number"
                    class="form-control"
                    id="age"
                    min="0"
                    max="120"
                >
                <small class="form-text text-muted">
                  Alebo zadajte vek – dátum sa doplní automaticky.
                </small>
              </div>

              <!-- Birth Date Input -->
              <div class="col-md-6">
                <label for="birthDate" class="form-label">Dátum narodenia</label>
                <input
                    v-model="formData.birthDate"
                    type="date"
                    class="form-control"
                    id="birthDate"
                    :max="today"
                />
                <small class="form-text text-muted">
                  Voliteľné: zadajte presný dátum, ak ho poznáte.
                </small>
              </div>

              <!-- Gender Selection -->
              <div class="col-md-6">
                <label class="form-label">Pohlavie</label>
                <div class="btn-group w-100" role="group">
                  <button
                      type="button"
                      class="btn"
                      :class="formData.gender === 'male' ? 'btn-primary' : 'btn-outline-primary'"
                      @click="formData.gender = 'male'"
                  >
                    Muž
                  </button>
                  <button
                      type="button"
                      class="btn"
                      :class="formData.gender === 'female' ? 'btn-primary' : 'btn-outline-primary'"
                      @click="formData.gender = 'female'"
                  >
                    Žena
                  </button>
                </div>
              </div>

              <!-- Count Input -->
              <div class="col-md-6">
                <label for="count" class="form-label">Počet</label>
                <input
                    v-model.number="formData.count"
                    type="number"
                    class="form-control"
                    id="count"
                    min="1"
                    max="20"
                    value="1"
                >
              </div>
            </div>

            <button type="submit" class="btn btn-primary w-100 mt-4 py-2">
              <i class="bi bi-gear me-2"></i>Generovať
            </button>
          </form>
        </div>
      </div>

      <!-- Results -->
      <!-- Results -->
      <div v-if="results.length > 0" class="card">
        <div class="card-body">
          <h3 class="h5 mb-3">Vygenerované rodné čísla</h3>

          <div class="table-responsive">
            <table class="table align-middle">
              <thead>
              <tr>
                <th>So lomítkom</th>
                <th>Bez lomítka</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(result, index) in results" :key="index">
                <td>
                  <button
                      @click="copyToClipboard(result.withSlash)"
                      class="btn btn-sm btn-outline-secondary"
                      title="Kopírovať so lomítkom"
                  >
                    <i class="bi bi-clipboard"></i>
                  </button>
                  {{ result.withSlash }}
                </td>
                <td>

                  <button
                      @click="copyToClipboard(result.withoutSlash)"
                      class="btn btn-sm btn-outline-secondary"
                      title="Kopírovať bez lomítka"
                  >
                    <i class="bi bi-clipboard"></i>
                  </button>
                  {{ result.withoutSlash }}
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <button
              @click="copyAllToClipboard"
              class="btn btn-success mt-3"
          >
            <i class="bi bi-clipboard-check me-2"></i>Kopírovať všetky
          </button>
        </div>
      </div>


      <!-- Info Section -->
      <div class=" mt-5">
        <div class="card-body">
          <h2 class="h4 mb-3">Pravidlá pre rodné čísla</h2>
          <ul>
            <li>Rodné číslo má formát RRMMDD/XXXX alebo RRMMDDXXXX</li>
            <li>RR - posledné dve číslice roku narodenia</li>
            <li>MM - mesiac narodenia (+50 pre ženy)</li>
            <li>DD - deň narodenia</li>
            <li>XXXX - štvormiestne číslo (do roku 1985) alebo štvormiestne číslo s kontrolnou číslicou (od roku 1986)
            </li>
            <li>Rodné číslo musí byť deliteľné 11 (pre čísla pridelené po roku 1985)</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue';
import {useToastStore} from "@/store/toast.js";

const formData = ref({
  age: 29,
  birthDate: '',
  gender: 'male',
  count: 1
});

const results = ref([]);
const today = new Date().toISOString().split('T')[0];
const toastStore = useToastStore();


// Watch for age changes to update birth date
watch(() => formData.value.age, (newAge) => {
  if (newAge < 0) {
    formData.value.age = 0;
    return;
  }
  if (newAge && !isNaN(newAge)) {
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - newAge;
    formData.value.birthDate = `${birthYear}-01-01`;
  }
});

// Watch for birth date changes to update age
watch(() => formData.value.birthDate, (newDate) => {
  if (newDate) {
    const birthYear = new Date(newDate).getFullYear();
    const currentYear = new Date().getFullYear();
    formData.value.age = currentYear - birthYear;
  }
});

watch(() => formData.value.birthDate, (newDate) => {
  if (newDate) {
    const selectedDate = new Date(newDate);
    const now = new Date();
    if (selectedDate > now) {
      formData.value.birthDate = today; // fallback
      return;
    }

    const birthYear = selectedDate.getFullYear();
    const currentYear = now.getFullYear();
    formData.value.age = currentYear - birthYear;
  }
});

const generateNumbers = () => {
  results.value = [];

  for (let i = 0; i < formData.value.count; i++) {
    let birthDate;

    if (formData.value.birthDate) {
      birthDate = new Date(formData.value.birthDate);
    } else if (formData.value.age) {
      const currentYear = new Date().getFullYear();
      birthDate = new Date(currentYear - formData.value.age, 0, 1);
    } else {
      // Random date between 1900 and current year
      const currentYear = new Date().getFullYear();
      const randomYear = Math.floor(Math.random() * (currentYear - 1900 + 1)) + 1900;
      birthDate = new Date(randomYear, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    }

    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();

    // Format month according to gender
    let formattedMonth = month.toString().padStart(2, '0');
    if (formData.value.gender === 'female') {
      formattedMonth = (month + 50).toString().padStart(2, '0');
    }

    // Generate serial number
    let serialNumber;
    if (year >= 1986) {
      // After 1985 - must be divisible by 11
      const firstThree = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      const checkDigit = calculateCheckDigit(year, month, day, firstThree);
      serialNumber = firstThree + checkDigit;
    } else {
      // Before 1986 - random 4 digits
      serialNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    }

    // Format parts
    const yearShort = year.toString().slice(-2).padStart(2, '0');
    const dayFormatted = day.toString().padStart(2, '0');

    const birthNumber = `${yearShort}${formattedMonth}${dayFormatted}${serialNumber}`;

    results.value.push({
      withSlash: `${birthNumber.slice(0, 6)}/${birthNumber.slice(6)}`,
      withoutSlash: birthNumber
    });
  }
};

const calculateCheckDigit = (year, month, day, firstThree) => {
  const yearShort = year.toString().slice(-2).padStart(2, '0');
  const monthFormatted = month.toString().padStart(2, '0');
  const dayFormatted = day.toString().padStart(2, '0');

  // Create base number without check digit
  const baseNumber = parseInt(`${yearShort}${monthFormatted}${dayFormatted}${firstThree}0`);

  // Find check digit that makes the number divisible by 11
  for (let i = 0; i <= 9; i++) {
    if ((baseNumber + i) % 11 === 0) {
      return i.toString();
    }
  }

  // Fallback if no digit found (shouldn't happen with valid inputs)
  return '0';
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  // You might want to add a toast notification here
  toastStore.showToast('success', 'Skopírované', `Rodné číslo ${text} bolo skopírované do schránky.`);

};

const copyAllToClipboard = () => {
  const allNumbers = results.value
      .map(r => `${r.withSlash} - ${r.withoutSlash}`)
      .join('\n');
  navigator.clipboard.writeText(allNumbers);
  toastStore.showToast('success', 'Všetky čísla skopírované', 'Všetky rodné čísla boli skopírované do schránky.');
};

</script>

<style scoped>
.btn-group .btn {
  flex: 1;
}

.table th, .table td {
  vertical-align: middle;
}
</style>