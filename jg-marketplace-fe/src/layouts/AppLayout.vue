<template>
     <div class="header">
      <div class="top-bar">
         <div class="logo" @click="goToMainProducts()" style="cursor: pointer;">
            JG<span>Marketplace</span>
         </div>
         <div class="search-container">
            <input class="search-input" id="search" placeholder="Buscar productos...">
            <button class="search-btn"> 🔍 </button>
         </div>
      </div>
      <div class="nav">
         <div class="nav-left">
            <!--if(auth.isUser()) {-->
              <a :href="'/cart'">Carrito</a>
            <!--}-->
            
            <!--if(auth.isAdmin()) {-->
              <a :href="'/admin-products'">Administrar Productos</a>
              <a :href="'/admin-users'">Administrar Usuarios</a>
            <!--}-->
         </div>
         <div class="nav-right">
            <!--if(auth.isloggedIn()) {-->
              <a @click="logout" style="cursor: pointer;">Cerrar Sesión</a>
            <!--} else {-->
              <a @click="login" style="cursor: pointer;">Iniciar Sesión</a>
            <!--}-->
         </div>
      </div>
   </div>



<main class="content">
  <router-view />
</main>

</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const login = () => {
  router.push('/login')
}

const logout = () => {
  auth.logout()
  router.push('/')
}

const goToMainProducts = () => {
  router.push('/dashboard')
}
</script>
