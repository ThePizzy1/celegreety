<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'

const email = ref('')
const loading = ref(false)

const isValid = computed(() => email.value.includes('@'))

const submit = async () => {
  if (!isValid.value) return

  loading.value = true
  await new Promise(res => setTimeout(res, 800)) 
  loading.value = false

  Swal.fire({
    icon: 'success',
    title: 'Logged in',
    text: `Welcome back!`
  })

  email.value = ''
}
</script>

<template>
  <form @submit.prevent="submit" class="card bg-base-100 shadow-xl p-6 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Login</h2>

    <div class="form-control mb-4">
      <label class="label">Email</label>
      <input v-model="email" type="email" class="input input-bordered" />
    </div>

    <button class="btn btn-primary w-full" :disabled="!isValid || loading">
      <span v-if="loading" class="loading loading-spinner"></span>
      Login
    </button>
  </form>
</template>
