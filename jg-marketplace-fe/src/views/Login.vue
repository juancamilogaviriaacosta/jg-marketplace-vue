<template>
<div class="login-container">
  <div class="login-card">
    <h2>Iniciar Sesión</h2>

    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <input v-model="username" placeholder="Usuario" />
      </div>
      <div class="form-group">
        <input v-model="password" type="password" placeholder="Contraseña" />
      </div>

      <button class="login-button" type="submit">Ingresar</button>
    </form>

    <p v-if="error">Credenciales inválidas</p>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const username = ref('jg.marketplace@gmail.com')
const password = ref('123456')
const error = ref(false)

const auth = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  error.value = false

  const success = await auth.login(username.value, password.value)

  if (success) {
    router.push('/dashboard')
  } else {
    error.value = true
  }
}
</script>