import { createRouter, createWebHistory } from 'vue-router'

import TalentPricingManagement from '../pages/TalentPricingManagement.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/pricing', component: TalentPricingManagement },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
