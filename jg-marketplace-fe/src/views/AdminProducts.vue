<template>
    <div class="container">
        <h2>Lista de Productos</h2>
        <div class="mb-3">
            <button class="btn-success" @click="createProduct()">Crear Producto</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>SKU</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Imagen</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Opciones</th>
                </tr>
            </thead>

            <tbody v-for="item in items" :key="item.id">
                <tr>
                    <td>{{item.sku}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.description}}</td>
                    <td>
                    <img 
                        :src="item.picture"
                        width="80">
                    </td>
                    <td>
                    {{formatCurrency(item.price)}}
                    </td>
                    <td>
                    {{item.stock}}
                    </td>
                    <td>
                    <button class="btn-success" @click="editProduct(item)">Editar</button>&nbsp;
                    <button class="btn-danger" @click="deleteProduct(item)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import api from '../services/api'
import { alertError, formatCurrency } from '../services/utils'

const items = ref([])
const router = useRouter()

onMounted(async () => {
  try {
    const response = await api.get(`/api/getProducts`)
    items.value =  response.data || []
  } catch (error) {
    alertError(error);
  }
})

const createProduct = () => {
    router.push(`/product-mng/null`);
}

const editProduct = (item) => {
    router.push(`/product-mng/${item.id}`);
}

const deleteProduct = async (item) => {
  try {
    await api.delete(`/api/deleteProduct/${item.id}`)
    items.value = items.value.filter(i => i !== item)
  } catch (error) {
    alertError(error);
  }
}
</script>

<style scoped>
/* Contenedor */
.container {
  width: 90%;
  margin: 30px auto;
  font-family: Arial, Helvetica, sans-serif;
}

/* Título */
h2 {
  margin-bottom: 20px;
  color: #333;
}

.btn-success {
  background-color: #3483fa;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  width: 150px;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  width: 150px;
}

/* Tabla */
table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0px 3px 10px rgba(0,0,0,0.1);
}

/* Header */
thead {
  background-color: #3483fa; /* estilo MercadoLibre */
  color: white;
}

th {
  padding: 12px;
  text-align: left;
  font-size: 14px;
}

/* Filas */
td {
  padding: 12px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

/* Imágenes */
img {
  border-radius: 6px;
  border: 1px solid #ddd;
}

/* Precio */
td:nth-child(5) {
  font-weight: bold;
  color: #2a7a2a;
}

/* Stock bajo */
.low-stock {
  color: red;
  font-weight: bold;
}

.mb-3 {
  margin-bottom: 15px;
}

/* Responsive */
@media (max-width: 800px) {

  table {
    font-size: 12px;
  }

  img {
    width: 50px;
  }

}
</style>