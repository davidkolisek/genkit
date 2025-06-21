<template>
  <div class="my-5">
    <h3 class="mb-4">IBAN Krajiny a príklady</h3>
    <div class="table-responsive" style="max-height: 600px; overflow-y: auto;">
      <table class="table table-striped table-hover align-middle">
        <thead class="table-dark sticky-top">
        <tr>
          <th>Krajina</th>
          <th>Kód</th>
          <th>IBAN</th>
          <th>Akcia</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in randomizedIBANs" :key="index">
          <td>{{ item.krajina }}</td>
          <td>{{ item.kod }}</td>
          <td class="font-monospace">{{ item.iban }}</td>
          <td>
            <button
                class="btn btn-outline-primary btn-sm"
                @click="copyToClipboard(item.iban)"
                :title="'Kopírovať IBAN ' + item.iban"
            >
              <i class="bi bi-clipboard"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import {  computed } from 'vue'
import {useToastStore} from "@/store/toast.js";
const toastStore = useToastStore();


const ibanData = [
  { krajina: 'Albánsko', kod: 'AL', iban: 'AL35202111090000000001234567' },
  { krajina: 'Andora', kod: 'AD', iban: 'AD1400080001001234567890' },
  { krajina: 'Azerbajdžan', kod: 'AZ', iban: 'AZ96AZEJ00000000001234567890' },
  { krajina: 'Bahrajn', kod: 'BH', iban: 'BH02CITI00001077181611' },
  { krajina: 'Belgicko', kod: 'BE', iban: 'BE71096123456769' },
  { krajina: 'Bielorusko', kod: 'BY', iban: 'BY86AKBB10100000002966000000' },
  { krajina: 'Bosna a Hercegovina', kod: 'BA', iban: 'BA393385804800211234' },
  { krajina: 'Brazília', kod: 'BR', iban: 'BR1500000000000010932840814P2' },
  { krajina: 'Bulharsko', kod: 'BG', iban: 'BG18RZBB91550123456789' },
  { krajina: 'Chorvátsko', kod: 'HR', iban: 'HR1723600001101234565' },
  { krajina: 'Costa Rica', kod: 'CR', iban: 'CR23015108410026012345' },
  { krajina: 'Cyprus', kod: 'CY', iban: 'CY21002001950000357001234567' },
  { krajina: 'Dominikánska republika', kod: 'DO', iban: 'DO22ACAU00000000000123456789' },
  { krajina: 'Dánsko', kod: 'DK', iban: 'DK9520000123456789' },
  { krajina: 'El Salvádor', kod: 'SV', iban: 'SV43ACAT00000000000000123123' },
  { krajina: 'Estónsko', kod: 'EE', iban: 'EE471000001020145685' },
  { krajina: 'Faerské ostrovy', kod: 'FO', iban: 'FO9264600123456789' },
  { krajina: 'Francúzsko', kod: 'FR', iban: 'FR7630006000011234567890189' },
  { krajina: 'Fínsko', kod: 'FI', iban: 'FI1410093000123458' },
  { krajina: 'Georgia', kod: 'GE', iban: 'GE60NB0000000123456789' },
  { krajina: 'Gibraltár', kod: 'GI', iban: 'GI04BARC000001234567890' },
  { krajina: 'Grécko', kod: 'GR', iban: 'GR9608100010000001234567890' },
  { krajina: 'Grónsko', kod: 'GL', iban: 'GL8964710123456789' },
  { krajina: 'Guatemala', kod: 'GT', iban: 'GT20AGRO00000000001234567890' },
  { krajina: 'Holandsko', kod: 'NL', iban: 'NL02ABNA0123456789' },
  { krajina: 'Irak', kod: 'IQ', iban: 'IQ20CBIQ861800101010500' },
  { krajina: 'Island', kod: 'IS', iban: 'IS750001121234563108962099' },
  { krajina: 'Izrael', kod: 'IL', iban: 'IL170108000000012612345' },
  { krajina: 'Jordánsko', kod: 'JO', iban: 'JO71CBJO0000000000001234567890' },
  { krajina: 'Katar', kod: 'QA', iban: 'QA54QNBA000000000000693123456' },
  { krajina: 'Kazachstan', kod: 'KZ', iban: 'KZ563190000012344567' },
  { krajina: 'Kosovo', kod: 'XK', iban: 'XK051212012345678906' },
  { krajina: 'Kuvajt', kod: 'KW', iban: 'KW81CBKU0000000000001234560101' },
  { krajina: 'Libanon', kod: 'LB', iban: 'LB92000700000000123123456123' },
  { krajina: 'Lichtenštajnsko', kod: 'LI', iban: 'LI7408806123456789012' },
  { krajina: 'Litva', kod: 'LT', iban: 'LT601010012345678901' },
  { krajina: 'Lotyšsko', kod: 'LV', iban: 'LV97HABA0012345678910' },
  { krajina: 'Luxembursko', kod: 'LU', iban: 'LU120010001234567891' },
  { krajina: 'Macedónsko', kod: 'MK', iban: 'MK07200002785123453' },
  { krajina: 'Malta', kod: 'MT', iban: 'MT31MALT01100000000000000000123' },
  { krajina: 'Mauritánia', kod: 'MR', iban: 'MR1300020001010000123456753' },
  { krajina: 'Maurícius', kod: 'MU', iban: 'MU43BOMM0101123456789101000MUR' },
  { krajina: 'Maďarsko', kod: 'HU', iban: 'HU93116000060000000012345676' },
  { krajina: 'Moldavsko', kod: 'MD', iban: 'MD21EX000000000001234567' },
  { krajina: 'Monako', kod: 'MC', iban: 'MC5810096180790123456789085' },
  { krajina: 'Nemecko', kod: 'DE', iban: 'DE75512108001245126199' },
  { krajina: 'Nórsko', kod: 'NO', iban: 'NO8330001234567' },
  { krajina: 'Pakistan', kod: 'PK', iban: 'PK36SCBL0000001123456702' },
  { krajina: 'Palestína', kod: 'PS', iban: 'PS92PALS000000000400123456702' },
  { krajina: 'Panenské ostrovy, Britiské', kod: 'VG', iban: 'VG21PACG0000000123456789' },
  { krajina: 'Portugalsko', kod: 'PT', iban: 'PT50002700000001234567833' },
  { krajina: 'Poľsko', kod: 'PL', iban: 'PL10105000997603123456789123' },
  { krajina: 'Rakúsko', kod: 'AT', iban: 'AT483200000012345864' },
  { krajina: 'Rumunsko', kod: 'RO', iban: 'RO09BCYP0000001234567890' },
  { krajina: 'San Maríno', kod: 'SM', iban: 'SM76P0854009812123456789123' },
  { krajina: 'Saudská Arábia', kod: 'SA', iban: 'SA4420000001234567891234' },
  { krajina: 'Seychely', kod: 'SC', iban: 'SC52BAHL01031234567890123456USD' },
  { krajina: 'Slovenská republika', kod: 'SK', iban: 'SK8975000000000012345671' },
  { krajina: 'Slovinsko', kod: 'SI', iban: 'SI56192001234567892' },
  { krajina: 'Spojene Kráľovstvo', kod: 'GB', iban: 'GB33BUKB20201555555555' },
  { krajina: 'Spojené Arabské Emiráty', kod: 'AE', iban: 'AE460090000000123456789' },
  { krajina: 'Srbsko', kod: 'RS', iban: 'RS35105008123123123173' },
  { krajina: 'Svätá Lucia', kod: 'LC', iban: 'LC14BOSL123456789012345678901234' },
  { krajina: 'Svätý Tomáš a Princov ostrov', kod: 'ST', iban: 'ST23000200000289355710148' },
  { krajina: 'Taliansko', kod: 'IT', iban: 'IT60X0542811101000000123456' },
  { krajina: 'Timor-Leste', kod: 'TL', iban: 'TL380010012345678910106' },
  { krajina: 'Tunisko', kod: 'TN', iban: 'TN5904018104004942712345' },
  { krajina: 'Turecko', kod: 'TR', iban: 'TR320010009999901234567890' },
  { krajina: 'Ukrajina', kod: 'UA', iban: 'UA903052992990004149123456789' },
  { krajina: 'Írsko', kod: 'IE', iban: 'IE64IRCE92050112345678' },
  { krajina: 'Česká republika', kod: 'CZ', iban: 'CZ5508000000001234567899' },
  { krajina: 'Čierna Hora', kod: 'ME', iban: 'ME25505000012345678951' },
  { krajina: 'Španielsko', kod: 'ES', iban: 'ES7921000813610123456789' },
  { krajina: 'Švajčiarsko', kod: 'CH', iban: 'CH5604835012345678009' },
  { krajina: 'Švédsko', kod: 'SE', iban: 'SE7280000810340009783242' },
]

// Function to randomly modify last 3 to 6 chars of IBAN, keeping letters intact
function randomizeIBAN(iban) {
  if (!iban) return ''
  const chars = iban.split('')
  // find last digit position to randomize from (only digits at the end)
  let lastDigitIndex = chars.length - 1
  while (lastDigitIndex >= 0 && /\d/.test(chars[lastDigitIndex])) {
    lastDigitIndex--
  }
  lastDigitIndex++ // move to first digit at end
  const digitsCount = chars.length - lastDigitIndex
  const randomCount = Math.min(digitsCount, Math.floor(Math.random() * 4) + 3) // 3 to 6
  for (let i = 0; i < randomCount; i++) {
    chars[chars.length - 1 - i] = Math.floor(Math.random() * 10).toString()
  }
  return chars.join('')
}

const randomizedIBANs = computed(() => {
  return ibanData.map((item) => ({
    krajina: item.krajina,
    kod: item.kod,
    iban: randomizeIBAN(item.iban),
  }))
})

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    toastStore.showToast('success', 'IBAN skopírovaný', `IBAN ${text} bol skopírovaný do schránky.`)
  }).catch(() => {
    toastStore.showToast('error', 'Chyba pri kopírovaní', 'Nepodarilo sa skopírovať IBAN do schránky.')
  })
}
</script>

<style>
.container {
  max-width: 900px;
}
.table thead th {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
