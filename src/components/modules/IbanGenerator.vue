<template>
  <div class="my-5">
    <div class="card mx-auto">
      <div class="card-body">
        <h4 class="mb-4">Generátor IBAN čísla</h4>

        <form @submit.prevent="generateIBAN">
          <div class="mb-3">
            <label for="country" class="form-label">Kód krajiny (2 písmená)</label>
            <input
                id="country"
                v-model="formData.country"
                type="text"
                maxlength="2"
                class="form-control text-uppercase"
                placeholder="SK"
                required
            />
            <div v-if="errors.country" class="form-text text-danger">{{ errors.country }}</div>
          </div>

          <div class="mb-3">
            <label for="bankCode" class="form-label">Bankový kód (4 čísla)</label>
            <input
                id="bankCode"
                v-model="formData.bankCode"
                type="text"
                maxlength="4"
                pattern="[0-9]{4}"
                class="form-control"
                placeholder="7500"
                required
            />
            <div v-if="errors.bankCode" class="form-text text-danger">{{ errors.bankCode }}</div>
          </div>

          <div class="mb-3">
            <label for="accountNumber" class="form-label">Číslo účtu (max 16 číslic)</label>
            <input
                id="accountNumber"
                v-model="formData.accountNumber"
                type="text"
                maxlength="16"
                pattern="[0-9]{1,16}"
                class="form-control"
                placeholder="1234567890123456"
                required
            />
            <div v-if="errors.accountNumber" class="form-text text-danger">{{ errors.accountNumber }}</div>
          </div>

          <button type="submit" class="btn btn-primary w-100">
            Vygenerovať IBAN
          </button>
        </form>

        <div v-if="iban" class="alert alert-success mt-4 d-flex align-items-center" role="alert">
          <div class="flex-grow-1">
            <strong>Vygenerovaný IBAN:</strong><br />
            <code class="fs-5">{{ ibanFormatted }}</code>
          </div>
          <button @click="copyIBAN" class="btn btn-outline-success ms-3" title="Kopírovať IBAN">
            <i class="bi bi-clipboard"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {useToastStore} from "@/store/toast.js";
const toastStore = useToastStore();

const formData = ref({
  country: 'SK',
  bankCode: '',
  accountNumber: '',
})

const errors = ref({
  country: '',
  bankCode: '',
  accountNumber: '',
})

const iban = ref('')

// Validácie formuláru
function validate() {
  errors.value = { country: '', bankCode: '', accountNumber: '' }
  let valid = true

  if (!/^[A-Z]{2}$/.test(formData.value.country.toUpperCase())) {
    errors.value.country = 'Kód krajiny musí byť 2 veľké písmená.'
    valid = false
  }
  if (!/^\d{4}$/.test(formData.value.bankCode)) {
    errors.value.bankCode = 'Bankový kód musí mať presne 4 číslice.'
    valid = false
  }
  if (!/^\d{1,16}$/.test(formData.value.accountNumber)) {
    errors.value.accountNumber = 'Číslo účtu musí obsahovať 1 až 16 číslic.'
    valid = false
  }
  return valid
}

// Funkcia na výpočet kontrolného čísla IBAN (mod97 podľa ISO 7064)
function calculateIBANCheckDigits(ibanWithoutCheckDigits) {
  // Presuň prvé 4 znaky na koniec
  const rearranged = ibanWithoutCheckDigits.slice(4) + ibanWithoutCheckDigits.slice(0, 4)

  // Nahraď písmená číslami (A=10, B=11, ..., Z=35)
  const converted = rearranged
      .toUpperCase()
      .split('')
      .map((ch) => {
        const code = ch.charCodeAt(0)
        if (code >= 65 && code <= 90) return (code - 55).toString() // A=10
        return ch
      })
      .join('')

  // Modulo 97 výpočet pre veľké číslo
  let remainder = ''
  for (let i = 0; i < converted.length; i += 7) {
    const part = remainder + converted.substring(i, i + 7)
    remainder = (parseInt(part, 10) % 97).toString()
  }
  const checkDigits = 98 - parseInt(remainder, 10)
  return checkDigits.toString().padStart(2, '0')
}

const generateIBAN = () => {
  if (!validate()) {
    iban.value = ''
    return
  }

  const country = formData.value.country.toUpperCase()
  const bankCode = formData.value.bankCode.padStart(4, '0')
  const accountNumber = formData.value.accountNumber.padStart(16, '0')

  // SK IBAN formát: SKkk BBBB SSSS CCCC CCCC CCCC
  // kde B=bank code, S=branch/other, C=account number (tu zjednodušene iba číslo účtu)

  // Pre jednoduchosť použijeme: bankCode + accountNumber bez medzier

  const bban = bankCode + accountNumber
  let tempIBAN = country + '00' + bban
  const checkDigits = calculateIBANCheckDigits(tempIBAN)
  iban.value = country + checkDigits + bban
}

const copyIBAN = () => {
  navigator.clipboard.writeText(iban.value)
  .then(() => {
    toastStore.showToast('success', 'IBAN skopírovaný', `IBAN ${iban.value} bol skopírovaný do schránky.`)
  })
}

const ibanFormatted = computed(() => {
  if (!iban.value) return ''
  return iban.value.match(/.{1,4}/g).join(' ')
})
</script>

<style scoped>
code {
  user-select: all;
}
</style>
