<template>
  <div class="container">
    <h2>Crear Usuario</h2>
    <form @submit.prevent="saveUser">
      <div>
        <label>Nombre</label>
        <input 
          type="text"
          v-model="user.name"
          required
        />
      </div>

      <div>
        <label>Nombre de usuario</label>
        <input 
          type="text"
          v-model="user.username"
          required
        />
      </div>

      <div>
        <label>Password</label>
        <input 
          type="password"
          v-model="user.password"
          required>
        </input>
      </div>

      <div>
        <label>Rol</label>
        <select
            name="role"
            v-model="user.role"
            autocomplete="off"
            required>

            <option value="">Seleccione rol</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>

        </select>
      </div>

      <br>

      <button type="submit" :disabled="!isValid"> Guardar Usuario </button>
      <button class="btn-danger" @click="cancel()"> Cancelar </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '../services/api'
import { alertError, formatCurrency } from '../services/utils'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const id = route.params.id
const user = reactive({
  name: '',
  username: '',
  password: '',
  role: ''
})

onMounted(async () => {
  try {
    if (id !== 'null') {
      const response = await api.get(`/api/getUser/${id}`)
      Object.assign(user, response.data)
    }
  } catch (error) {
    alertError(error);
  }
})

const isValid = computed(() => {
  return (
    user.username &&
    user.name &&
    user.password &&
    user.role
  )
})

const saveUser = async () => {
  console.log('Usero:', user)
  try {
    await api.post('/api/createUser', {
      id: id,
      name: user.name,
      username: user.username,
      password: user.password,
      role: user.role
    })
    router.push('/admin-users')
  } catch (error) {
    alertError(error);
  }
}

const cancel = () => {
  router.push('/admin-users')
}

</script>

<style scoped>
/* Contenedor principal */
.container {
  width: 500px;
  margin: 40px auto;
  font-family: Arial, Helvetica, sans-serif;
}

/* Caja del formulario */
form {
  background: white;
  padding: 45px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
}

/* Título */
h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

/* Labels */
label {
  display: block;
  margin-top: 15px;
  margin-bottom: 5px;
  font-weight: bold;
  color: #444;
}

/* Inputs */
input,
textarea,
select {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
  transition: border 0.2s;
}

/* Focus */
input:focus,
textarea:focus {
  outline: none;
  border: 1px solid #3483fa;
}

/* Textarea altura */
textarea {
  height: 80px;
  resize: vertical;
}

/* Botón */
button {
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background-color: #3483fa;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

/* Hover botón */
button:hover {
  background-color: #2968c8;
}

.btn-danger {
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background-color: #dc3545;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-danger:hover {
  background-color: #c82333;
}

/* Botón deshabilitado */
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Imagen preview */
img {
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 5px;
  background: white;
}

/* Responsive */
@media (max-width: 600px) {

  .container {
    width: 90%;
  }

}
</style>