<script setup lang="ts">
import { ref, watch, computed } from 'vue'

interface Props {
  modelValue: number | null
  type: 'personal' | 'business'
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
}>()


const inputValue = ref(
  props.modelValue !== null ? (props.modelValue / 100).toFixed(2) : ''
)


const isValid = computed(() => {
  const num = parseFloat(inputValue.value)
  return !isNaN(num) && num > 0
})


watch(inputValue, (val) => {
  const num = parseFloat(val)
  emit('update:modelValue', isNaN(num) ? null : Math.round(num * 100))
})

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = val !== null ? (val / 100).toFixed(2) : ''
  }
)
</script>

<template>
  <div class="flex flex-col mb-4">
    <label class="mb-1 font-semibold capitalize">{{ props.type }} Price (€)</label>
    <input
      type="number"
      min="0"
      step="0.01"
      v-model="inputValue"
      class="input input-bordered"
      :class="{ 'input-error': !isValid }"
    />
    <span v-if="!isValid" class="text-red-500 text-sm mt-1">Must be greater than 0</span>
  </div>
</template>
