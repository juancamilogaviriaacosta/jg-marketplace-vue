<template>

<div v-if="product" class="product-container">

  <!-- IZQUIERDA - GALERIA -->
  <div class="gallery">
    <div class="thumbnails">
        <img v-for="(img, index) in product.images" :key="index"
           :src="img"
           @click="selectImage(img)"
           class="thumb"/>      
    </div>
    <div class="main-image">
      <img :src="selectedImage"/>
    </div>
  </div>

  <!-- CENTRO - INFO -->
  <div class="product-info">
    <div class="condition">
      Nuevo | +100 vendidos
    </div>
    <h1 class="title">
      {{product.name}}
    </h1>
    <div class="price">
      {{formatCurrency(product.price)}}
    </div>
    <div class="installments">
      en 12x {{formatCurrency(product.price/12)}}
    </div>
    <div class="description-title">
      Descripción
    </div>
    <div class="description">
      {{product.description}}
    </div>
  </div>

  <!-- DERECHA - COMPRA -->
  <div class="buy-box">
    <div class="stock">
      Stock disponible
    </div>
    <div class="quantity">
      Cantidad:
      <select v-model="quantity">
        <option v-for="q in quantities" :key="q" :value="q">
          {{q}}
        </option>
      </select>

      ({{product.stock}} disponibles)
    </div>

    <button
      class="buy-btn"
      @click="addToCart()">
      Agregar al carrito
    </button>
  </div>
</div>

</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '../services/api'
import { alertError, formatCurrency } from '../services/utils'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const product = ref(null)
const id = route.params.id
const selectedImage = ref('');
const quantity = ref(1);
const quantities = ref([1, 2]);
//const userId = localStorage.getItem('id');

const selectImage = (img) => {
  selectedImage.value = img;
}

onMounted(async () => {
  try {
    const response = await api.get(`/api/getProduct/${id}`)
    product.value = response.data
    product.value.images = [
      product.value.picture,
      product.value.picture,
      product.value.picture,
    ];
    quantities.value = Array.from({ length: product.value.stock }, (_, i) => i + 1);
    selectedImage.value = product.value.images[0];
  } catch (error) {
    alertError(error);
  }
})

const addToCart = (async () => {
  if(product.value.stock < quantity.value) {
    alert('No hay suficiente stock disponible');
  } else {
    try {
      await api.post('/api/addToCart', {
        productId: product.value.id,
        quantity: quantity.value,
        userId: auth.userId
      })
      router.push('/cart');
    } catch (error) {
      alertError(error);
    }
  }
})
</script>

<style scoped>
.product-container{
    max-width:1200px;
    margin:auto;
    display:grid;
    grid-template-columns:
        450px 1fr 320px;
    gap:30px;
    margin-top:30px;
}

/* GALERIA */
.gallery{
    display:flex;
}
.thumbnails{
    display:flex;
    flex-direction:column;
    gap:10px;
}

.thumb{
    width:60px;
    height:60px;
    object-fit:cover;
    border:1px solid #ddd;
    border-radius:5px;
    cursor:pointer;
}

.main-image img{
    width:380px;
    margin-left:20px;
}

/* INFO */
.condition{
    color:gray;
    margin-bottom:10px;
}

.title{
    font-size:22px;
    font-weight:400;
}

.price{
    font-size:32px;
    margin:20px 0;
}

.installments{

    color:#00a650;
    margin-bottom:20px;
}

.description-title{

    font-size:18px;
    margin-top:30px;
}

.description{

    color:#555;
    margin-top:10px;
}

/* BUY BOX */
.buy-box{
    border:1px solid #eee;
    padding:20px;
    border-radius:10px;
    height:fit-content;
}

.stock{
    color:#00a650;
    margin-bottom:15px;
}

.quantity{
    margin-bottom:20px;
}

.buy-btn{
    width:100%;
    padding:14px;
    border:none;
    background:#3483fa;
    color:white;
    border-radius:8px;
    font-size:16px;
    cursor:pointer;
    margin-bottom:10px;
}

.buy-now{
    width:100%;
    padding:14px;
    border:none;
    background:#2968c8;
    color:white;
    border-radius:8px;
    font-size:16px;
    cursor:pointer;
}
</style>