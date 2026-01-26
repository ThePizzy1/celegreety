<script setup lang="ts">
/*
Prikaz:
1. Ako još nema cijene:
Prazan form za unos
"Create Pricing" button

2. Ako cijene postoje:
Stats cards sa trenutnim cijenama (DaisyUI)
Last synced info
Form za update cijena
"Update Pricing" button
 */
import PricingForm from '../components/PricingForm.vue'
</script>

<template>
  <div class="min-h-screen p-10 bg-gray-100">
    <h1 class="text-3xl font-bold mb-6">Talent Pricing Management</h1>
    <PricingForm />
  </div>
</template>
