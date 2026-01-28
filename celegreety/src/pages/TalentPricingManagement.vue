<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import RegisterForm from '../components/RegisterForm.vue'
import PricingForm from '../components/PricingForm.vue'
import axiosBase from '../../axiosBase'

const route = useRoute()
const talentId = route.params.id as string

// User state
const user = ref<{ id: string; name: string; email: string } | null>(null)
const isRegistering = ref(false) // toggle između login i register

// Pricing state
const pricing = ref<any | null>(null)
const history = ref<any[]>([])
const loading = ref(false)
const error = ref('')

// Load user from localStorage
const loadUser = () => {
  const stored = localStorage.getItem('user')
  user.value = stored ? JSON.parse(stored) : null
}

// Logout
const logout = () => {
  localStorage.removeItem('user')
  user.value = null
  pricing.value = null
  history.value = []
}

// Fetch current pricing + history
const fetchPricing = async () => {
  if (!user.value) return
  loading.value = true
  error.value = ''
  try {
    const res = await axiosBase.get(`/api/talentpricing/${talentId}`)
    pricing.value = res.data?.current || null
    history.value = res.data?.history || []
  } catch (err: any) {
    console.error(err)
    error.value = err?.response?.data?.message || 'Error fetching pricing'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadUser()
  fetchPricing()
})

const hasExistingPricing = computed(() => !!pricing.value)
</script>

<template>
  <div class="min-h-screen p-6 bg-gray-100">
    <!-- NOT LOGGED IN -->
    <div v-if="!user">
      <LoginForm v-if="!isRegistering" @switchToRegister="isRegistering = true" @logged-in="() => { loadUser(); fetchPricing() }" />
      <RegisterForm v-else @switchToLogin="isRegistering = false" @registered="() => { loadUser(); fetchPricing() }" />
    </div>

    <!-- LOGGED IN -->
    <div v-else>
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Talent Pricing Management</h1>
        <button @click="logout" class="btn btn-sm btn-ghost">Logout</button>
      </div>

      <!-- ERROR ALERT -->
      <div v-if="error" class="alert alert-error mb-4">
        <span>{{ error }}</span>
      </div>

      <!-- CURRENT PRICING STATS -->
      <div v-if="hasExistingPricing" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="card bg-white shadow-md p-4">
          <h2 class="font-semibold text-gray-600">Personal Price</h2>
          <p class="text-xl font-bold">€{{ (pricing.personalPrice / 100).toFixed(2) }}</p>
        </div>
        <div class="card bg-white shadow-md p-4">
          <h2 class="font-semibold text-gray-600">Business Price</h2>
          <p class="text-xl font-bold">€{{ (pricing.businessPrice / 100).toFixed(2) }}</p>
        </div>
        <div class="col-span-full text-gray-500 text-sm mt-2">
          Last synced: {{ pricing.lastSyncedAt ? new Date(pricing.lastSyncedAt).toLocaleString() : '-' }}
        </div>
      </div>

      <!-- PRICING FORM -->
      <PricingForm
        v-if="!loading"
        :initialPricing="pricing"
        :talentId="talentId"
        :isUpdate="hasExistingPricing"
        @updated="fetchPricing"
      />

      <!-- HISTORY -->
      <div v-if="history.length" class="mt-6">
        <h2 class="text-xl font-semibold mb-2">Price History (last 10)</h2>
        <div class="overflow-x-auto">
          <table class="table w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th>Date</th>
                <th>Personal (€)</th>
                <th>Business (€)</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in history" :key="item.id">
                <td>{{ new Date(item.createdAt).toLocaleString() }}</td>
                <td>€{{ (item.personalPrice / 100).toFixed(2) }}</td>
                <td>€{{ (item.businessPrice / 100).toFixed(2) }}</td>
                <td>{{ item.changeReason || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- LOADING SPINNER -->
      <div v-if="loading" class="flex justify-center mt-6">
        <span class="loading loading-spinner loading-lg"></span>
      </div>
    </div>
  </div>
</template>

