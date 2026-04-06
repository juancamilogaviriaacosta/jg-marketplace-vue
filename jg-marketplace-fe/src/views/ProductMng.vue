<template>
  <div class="container">
    <h2>Crear Producto</h2>
    <form @submit.prevent="saveProduct">
      <div>
        <label>SKU</label>
        <input 
          type="text"
          v-model="product.sku"
          required
        />
      </div>

      <div>
        <label>Nombre</label>
        <input 
          type="text"
          v-model="product.name"
          required
        />
      </div>

      <div>
        <label>Descripción</label>
        <textarea
          v-model="product.description">
        </textarea>
      </div>

      <div>
        <label>Imagen (URL)</label>
        <input 
          type="text"
          v-model="product.picture"
        />
      </div>

      <div>
        <label>Precio</label>
        <input 
          type="number"
          v-model="product.price"
          required
        />
      </div>

      <div>
        <label>Stock</label>
        <input 
          type="number"
          v-model="product.stock"
          required
        />
      </div>

      <br>

      <button type="submit" :disabled="!isValid"> Guardar Producto </button>
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
const product = reactive({
  sku: '',
  name: '',
  description: '',
  picture: '',
  price: null,
  stock: null
})

onMounted(async () => {
  try {
    if (id !== 'null') {
      const response = await api.get(`/api/getProduct/${id}`)
      Object.assign(product, response.data)
    }
  } catch (error) {
    alertError(error);
  }
})

const isValid = computed(() => {
  return (
    product.sku &&
    product.name &&
    product.price !== null &&
    product.stock !== null
  )
})

const saveProduct = async () => {
  console.log('Producto:', product)
  try {
    await api.post('/api/createProduct', {
        id: id,
        sku: product.sku,
        name: product.name,
        description: product.description,
        picture: product.picture,
        price: product.price,
        stock: product.stock,
        version: product.version
      })
      router.push('/admin-products')
    } catch (error) {
      alertError(error);
    }
}

const cancel = () => {
  router.push('/admin-products')
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
textarea {
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