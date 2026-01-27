<script setup lang="ts">
import { ref, computed } from 'vue'
import PriceInput from './PriceInput.vue'

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
  <form @submit.prevent="submit" class="p-4 bg-white rounded shadow-md">
    <PriceInput v-model="personal" type="personal" />
    <PriceInput v-model="business" type="business" />
    
    <div class="mb-4">
      <label class="mb-1 font-semibold">Change reason (optional)</label>
      <textarea v-model="changeReason" class="textarea textarea-bordered w-full" rows="3"></textarea>
    </div>

    <button 
      type="submit" 
      :disabled="!isValid || loading" 
      class="btn btn-primary"
    >
      <span v-if="loading" class="loading loading-spinner"></span>
      Submit
    </button>

    <p v-if="!isValid" class="text-red-500 mt-2 text-sm">Business must be >= Personal</p>
  </form>
</template>

