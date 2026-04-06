<template>
  <div class="hero">
    <h1>Compra fácil y rápido</h1>
    <p>Encuentra miles de productos al mejor precio</p>
  </div>

  <div class="products">
    <h2>Productos Destacados</h2>

    <div class="grid">
      <div class="card" v-for="(item, index) in items" :key="index" @click="goDetails(item)">
        <img :src="item.picture" />
        <div class="title">
          {{ item.name }}
        </div>
        <div class="price">
          {{ formatCurrency(item.price) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import api from '../services/api'
import { alertError, formatCurrency } from '../services/utils'

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/')
}

const items = ref([])

onMounted(async () => {
  try {
    const response = await api.get('/api/getProducts')
    items.value = response.data
  } catch (error) {
    alertError(error);
  }
})

const goDetails = (item) => {
  router.push(`/product/${item.id}`)
}


</script>