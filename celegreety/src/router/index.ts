import { createRouter, createWebHistory } from 'vue-router'

import TalentPricingManagement from '../pages/TalentPricingManagement.vue'

const routes = [
  { path: '/', component: TalentPricingManagement },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
