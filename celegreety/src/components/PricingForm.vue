<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import PriceInput from './PriceInput.vue'

const props = defineProps<{
  talentId: number
  initialPricing: any | null
  history: any[] | null
}>()

const emit = defineEmits<{
  (e: 'saved'): void
}>()
const personal = ref<number | null>(null)
const business = ref<number | null>(null)
const changeReason = ref('')
const loading = ref(false)
watch(
  () => props.initialPricing,
  (val) => {
    if (val) {
      personal.value = val.personalPrice
      business.value = val.businessPrice
    }
  },
  { immediate: true }
)
const isValid = computed(() => {
  return (
    personal.value !== null &&
    business.value !== null &&
    business.value >= personal.value
  )
})
const submit = async () => {
  if (!isValid.value || loading.value) return
  loading.value = true
  try {
    const hasHistory = props.history && props.history.length > 0
    const url = 'http://localhost:5080/api/talentpricing'

    if (hasHistory) {
      await axios.put(
        url,
        {
          talentId: props.talentId,
          personalPrice: personal.value,
          businessPrice: business.value,
          changeReason: changeReason.value || 'Market adjustment'
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
    } else {
            await axios.post(
          'http://localhost:5080/api/talentpricing',
          {
            TalentId: props.talentId,
            PersonalPrice: personal.value,
            BusinessPrice: business.value,
            Currency: 'EUR'
          },
          { headers: { 'Content-Type': 'application/json' } }
        )

    }

    Swal.fire({
      icon: 'success',
      title: 'Pricing saved 🎉',
      text: hasHistory
        ? 'Pricing successfully updated.'
        : 'Pricing successfully created.'
    })

    changeReason.value = ''
    emit('saved')
  } catch (err: any) {
    console.error('Pricing error:', err)
    Swal.fire({
      icon: 'error',
      title: 'Save failed',
      text:
        err?.response?.data?.message ||
        'Backend rejected the request'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>

  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div class="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-2xl">
      <h2 class="text-3xl font-bold text-center mb-8">
        {{ history && history.length ? 'Update pricing' : 'Create pricing' }}
      </h2>

      <div class="mb-6">
        <label class="block mb-2 font-semibold text-gray-700">
          Personal price (€)
        </label>
        <PriceInput
          v-model="personal"
          type="personal"
          class="w-full border rounded-lg px-4 py-3 text-lg"
        />
      </div>


      <div class="mb-6">
        <label class="block mb-2 font-semibold text-gray-700">
          Business price (€)
        </label>
        <PriceInput
          v-model="business"
          type="business"
          class="w-full border rounded-lg px-4 py-3 text-lg"
        />
      </div>


      <div v-if="history && history.length" class="mb-8">
        <label class="block mb-2 font-semibold text-gray-700">
          Change reason
        </label>
        <textarea
          v-model="changeReason"
          rows="4"
          placeholder="Optional reason for price change"
          class="w-full border rounded-lg p-4 resize-none text-base"
        ></textarea>
      </div>

      <button
        @click.prevent="submit"
        :disabled="!isValid || loading"
        class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 flex justify-center items-center gap-3 text-lg"
      >
        <span
          v-if="loading"
          class="animate-spin border-2 border-white border-t-transparent rounded-full w-6 h-6"
        ></span>
        <span v-else>
          {{ history && history.length ? 'Update pricing' : 'Create pricing' }}
        </span>
      </button>

      <p v-if="!isValid" class="text-red-500 mt-4 text-sm text-center">
        Business price must be greater than or equal to Personal price
      </p>
    </div>
  </div>
</template>
