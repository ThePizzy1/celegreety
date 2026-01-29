<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import PricingForm from '../components/PricingForm.vue'

interface User {
  id: number
  name: string
  email: string
  created_At: string
}

interface PricingHistoryItem {
  id: number
  personalPrice: number
  businessPrice: number
  changeReason: string | null
  createdAt: string | null
  lastSyncedAt: string | null
}

const user = ref<User | null>(null)
const isRegistering = ref(false)
const hasProfile = ref(false)

const email = ref('')
const name = ref('')
const loading = ref(false)
const pricing = ref<any | null>(null)
const history = ref<PricingHistoryItem[]>([])
const error = ref('')

const emailValid = computed(() => email.value.includes('@'))

const loadUser = () => {
  const stored = localStorage.getItem('user')
  user.value = stored ? JSON.parse(stored) : null
  if (user.value) fetchPricing()
}

const logout = () => {
  localStorage.removeItem('user')
  user.value = null
  hasProfile.value = false
  pricing.value = null
  history.value = []
}

const fetchPricing = async () => {
  if (!user.value) return
  loading.value = true
  try {
    const res = await axios.get(`http://localhost:5080/api/talentpricing/${user.value.id}`)
    pricing.value = res.data?.current || null
    history.value = res.data?.history || []
    hasProfile.value = !!pricing.value
  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Error fetching pricing'
  } finally {
    loading.value = false
  }
}

const submitLogin = async () => {
  if (!emailValid.value || loading.value) return
  loading.value = true
  try {
    const res = await axios.get('http://localhost:5080/api/users/by-email', { params: { email: email.value } })
    const u = res.data
    if (!u || !u.id) throw new Error('User not found')
    user.value = u
    localStorage.setItem('user', JSON.stringify(u))
    Swal.fire({ icon: 'success', title: 'Logged in 🎉', text: `Welcome back, ${u.name}!` })
    email.value = ''
    fetchPricing()
  } catch (err: any) {
    Swal.fire({ icon: 'error', title: 'Login failed', text: err?.response?.data?.message || err.message })
  } finally {
    loading.value = false
  }
}

const submitRegister = async () => {
  if (!emailValid.value || !name.value || loading.value) return
  loading.value = true
  try {
    const url = `http://localhost:5080/api/users/register?name=${encodeURIComponent(name.value)}&email=${encodeURIComponent(email.value)}`
    const res = await axios.post(url)
    const u = res.data
    if (!u || !u.id) throw new Error('Registration failed')
    await Swal.fire({ icon: 'success', title: 'Registered!', text: `User ${name.value} created.` })
    isRegistering.value = false
    name.value = ''
    email.value = ''
  } catch (err: any) {
    Swal.fire({ icon: 'error', title: 'Registration failed', text: err?.response?.data?.message || err.message })
  } finally {
    loading.value = false
  }
}

const onPricingSaved = () => {
  fetchPricing()
}

onMounted(() => loadUser())
</script>

<template>
  <div class="min-h-screen bg-gray-100  py-6">
    <div class="mx-auto mx-auto">


  <div v-if="!user" class="flex justify-center">
  <div class="w-full md:w-1/2 lg:w-1/3">
    
    <form v-if="!isRegistering" @submit.prevent="submitLogin" class="bg-white p-6 rounded shadow-md mb-6">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
      <input v-model="email" type="email" placeholder="email@example.com" class="border px-4 py-2 rounded w-full mb-4"/>
      <button type="submit" :disabled="!emailValid || loading" class="bg-green-500 w-full py-2 px-4 rounded text-white disabled:opacity-50">
        <span v-if="loading" class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 inline-block mr-2"></span>
        <span v-else>Login</span>
      </button>
      <p class="mt-4 text-gray-600 text-sm text-center">
        Not registered? 
        <span class="text-green-500 cursor-pointer" @click="isRegistering = true">Click here</span>
      </p>
    </form>

    <form v-else @submit.prevent="submitRegister" class="bg-white p-6 rounded shadow-md mb-6">
      <h2 class="text-2xl font-bold mb-4 text-center">Register</h2>
      <input v-model="name" type="text" placeholder="Name" class="border px-4 py-2 rounded w-full mb-4"/>
      <input v-model="email" type="email" placeholder="Email" class="border px-4 py-2 rounded w-full mb-4"/>
      <button type="submit" :disabled="!emailValid || !name || loading" class="bg-green-500 w-full py-2 px-4 rounded text-white disabled:opacity-50">
        <span v-if="loading" class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 inline-block mr-2"></span>
        <span v-else>Register</span>
      </button>
      <p class="mt-4 text-gray-600 text-sm text-center">
        Already have an account? 
        <span class="text-green-500 cursor-pointer" @click="isRegistering = false">Login here</span>
      </p>
    </form>

  </div>
</div>


   
      <div v-else>
        <div class="flex justify-between items-center mb-6 mx-5">
          <h1 class="text-3xl font-bold">Welcome, {{ user.name }}</h1>
          <button @click="logout" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Logout</button>
        </div>

        <div v-if="error" class="text-red-600 mb-4 mx-5">{{ error }}</div>

        <div v-if="pricing" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mx-5">
          <div class="bg-white p-4 shadow rounded">
            <h2 class="font-semibold text-gray-600">Personal Price</h2>
            <p class="text-xl font-bold">€{{ (pricing.personalPrice / 100).toFixed(2) }}</p>
          </div>
          <div class="bg-white p-4 shadow rounded">
            <h2 class="font-semibold text-gray-600">Business Price</h2>
            <p class="text-xl font-bold">€{{ (pricing.businessPrice / 100).toFixed(2) }}</p>
          </div>
        </div>

        <div class="mb-6 text-gray-500 mx-5">
          Last updated: {{ pricing?.pricesLastSyncedAt ? new Date(pricing.pricesLastSyncedAt).toLocaleString() : '-' }}
        </div>

        <PricingForm
          v-if="user"
          :talentId="user.id"
          :initialPricing="pricing"
          :history="history"
          @saved="onPricingSaved"
        />

        <div v-if="history.length" class="mt-6 mx-5">
          <table class="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead class="bg-gray-100 text-left">
              <tr>
                <th class="px-4 py-2 border-b">Date</th>
                <th class="px-4 py-2 border-b">Personal (€)</th>
                <th class="px-4 py-2 border-b">Business (€)</th>
                <th class="px-4 py-2 border-b">Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in history" :key="item.id" class="hover:bg-gray-50">
                <td class="px-4 py-2 border-b">{{ item.createdAt ? new Date(item.createdAt).toLocaleString() : '-' }}</td>
                <td class="px-4 py-2 border-b">€{{ (item.personalPrice / 100).toFixed(2) }}</td>
                <td class="px-4 py-2 border-b">€{{ (item.businessPrice / 100).toFixed(2) }}</td>
                <td class="px-4 py-2 border-b">{{ item.changeReason || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>
