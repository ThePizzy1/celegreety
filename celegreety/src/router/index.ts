import { createRouter, createWebHistory } from 'vue-router'
import TalentPricingManagement from '../pages/TalentPricingManagement.vue'

const routes = [
  { path: '/', name: 'Home', component: TalentPricingManagement }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
