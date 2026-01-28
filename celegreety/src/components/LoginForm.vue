<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'

const email = ref('')
const loading = ref(false)


const isValid = computed(() => email.value.includes('@'))

const submit = async () => {
  if (!isValid.value || loading.value) return

  loading.value = true
  try {

    await new Promise(res => setTimeout(res, 1000))
    const user = { id: '123', name: 'Demo User', email: email.value }
    localStorage.setItem('user', JSON.stringify(user))

    Swal.fire({
      icon: 'success',
      title: 'Logged in 🎉',
      text: `Welcome back, ${user.name}!`,
    })

    email.value = ''
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <form
      @submit.prevent="submit"
      class="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full"
    >
      <h2 class="text-3xl font-bold mb-6 text-center">Login</h2>

      <div class="mb-4">
        <label class="block mb-1 font-medium text-gray-700">Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="email@example.com"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500"
        />
      </div>

      <button
        type="submit"
        :disabled="!isValid || loading"
        class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 flex justify-center items-center gap-2"
      >
        <span v-if="loading" class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
        <span v-else>Login</span>
      </button>

      <p class="mt-4 text-center text-gray-600">
        If you are not registered, 
        <span
          class="text-green-500 font-medium cursor-pointer hover:underline"
          @click="$emit('switchToRegister')"
        >
          click here
        </span>
      </p>
    </form>
  </div>
</template>
