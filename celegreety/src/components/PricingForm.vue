<script setup lang="ts">
//dodaj ljepi alert spoji da radi 
import { ref, computed } from 'vue'
import PriceInput from './PriceInput.vue'
import Swal from 'sweetalert2'

const personal = ref<number | null>(null)
const business = ref<number | null>(null)
const loading = ref(false)
const changeReason = ref('')

const isValid = computed(() => {
  return (
    personal.value !== null &&
    business.value !== null &&
    business.value >= personal.value
  )
})

const submit = async () => {
  if (!isValid.value) return
  loading.value = true
  await new Promise((res) => setTimeout(res, 1000)) 
  loading.value = false
  alert(`Submitted: Personal=${personal.value}, Business=${business.value}, Reason=${changeReason.value}`)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <form 
      @submit.prevent="submit" 
      class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
    >
      <h2 class="text-2xl font-bold text-center mb-6">Pricing Update</h2>

      <!-- Personal Input -->
      <div class="mb-4">
        <label class="block mb-1 font-semibold text-gray-700">Personal</label>
        <PriceInput 
          v-model="personal" 
          type="personal" 
          class="w-full input input-bordered rounded-lg"
        />
      </div>

      <!-- Business Input -->
      <div class="mb-4">
        <label class="block mb-1 font-semibold text-gray-700">Business</label>
        <PriceInput 
          v-model="business" 
          type="business" 
          class="w-full input input-bordered rounded-lg"
        />
      </div>

      <!-- Change Reason -->
      <div class="mb-6">
        <label class="block mb-1 font-semibold text-gray-700">Change reason (optional)</label>
        <textarea 
          v-model="changeReason" 
          class="textarea textarea-bordered w-full rounded-lg resize-none rounded-lg border border-gray-300 p-2" 
          rows="3"
          placeholder="Optional reason for change..."
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button 
        type="submit" 
        :disabled="!isValid || loading" 
        class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 flex justify-center items-center gap-2"
      >
        <span v-if="loading" class="loading loading-spinner"></span>
        <span v-else>Submit</span>
      </button>

      <!-- Validation Message -->
      <p v-if="!isValid" class="text-red-500 mt-3 text-sm text-center">
        Business must be ≥ Personal
      </p>
    </form>
  </div>
</template>

