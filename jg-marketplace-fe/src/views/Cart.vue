<template>
<div class="cart-container">
  <!-- IZQUIERDA: PRODUCTOS -->
  <div class="cart-products" v-if="items">
    <h2>Carrito de compras</h2>
    <div v-for="(item, index) in items" :key="index" class="product-card">
      <img :src="item.product.picture" class="product-image"/>
      <div class="product-info">
        <div class="product-title">
          {{item.product.name}}
        </div>
        <div class="product-price">
          {{formatCurrency(item.product.price)}}
        </div>
        <div class="quantity">
          <button @click="decrease(item)">
            -
          </button>
          <span>
            {{item.quantity}}
          </span>
          <button @click="increase(item)">
            +
          </button>
        </div>
      </div>
      <div class="product-total">
        {{formatCurrency(item.product.price * item.quantity) }}
        <button class="remove-btn"
                @click="remove(item)">
          Eliminar
        </button>
      </div>
    </div>
  </div>


  <!-- DERECHA: RESUMEN -->
  <div class="cart-summary">
    <h3>Resumen de compra</h3>
    <div class="summary-row">
      <span>Subtotal</span>
      <span> {{ formatCurrency(subtotal) }}</span>
    </div>
    <div class="summary-row">
      <span>IVA (19%)</span>
      <span> {{formatCurrency(iva) }}</span>
    </div>
    <div class="summary-row">
      <span>Envío</span>
      <span> {{formatCurrency(shipping) }}</span>
    </div>
    <hr>
    <div class="summary-total">
      <span>Total</span>
      <span> {{ formatCurrency(total) }}</span>
    </div>
    <button class="checkout-btn" @click="checkout()">
      Continuar compra
    </button>
  </div>
</div>

</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import api from '../services/api'
import { alertError, formatCurrency } from '../services/utils'
import { computed } from 'vue'

const auth = useAuthStore()
const router = useRouter()
const items = ref([])

onMounted(async () => {
  try {
    const response = await api.get(`/api/getCart/${auth.userId}`)
    items.value =  response.data.carItems || []
  } catch (error) {
    console.error(error)
  }
})

const subtotal = computed(() => {
  return items.value.reduce(
    (sum, i) => sum + (i.product.price * i.quantity),
    0
  )
})

const iva = computed(() => {
  return subtotal.value * 0.19;
})

const shipping = computed(() => {
  if(items.value.length > 0) {
    return 15000;
  } else {
    return 0;
  }
})

const total = computed(() => {
  return subtotal.value + iva.value + shipping.value;
})

const increase = (item) => {
  if(item.product.stock <= item.quantity) {
    alert('No hay suficiente stock para aumentar la cantidad');
    return;
  }
  item.quantity++
  setQuantity(item, item.quantity);
}

const decrease = (item) => {
  if (item.quantity > 1) {
    item.quantity--
    setQuantity(item, item.quantity);
  }
}
const setQuantity = async (item, quantity) => {
  try {
    await api.post('/api/setQuantity', {
      id: item.id,
      quantity: quantity
    })
  } catch (error) {
    alertError(error);
  }
}

const remove = (async (item) => {
  try {
    await api.post('/api/removeFromCart', { id: item.id })
    items.value = items.value.filter(i => i !== item)
  } catch (error) {
    alertError(error);
  }
})

const checkout = async () => {
  try {
    await api.post('/api/checkout', { items: items.value, userId: auth.userId })
    alert('Compra realizada con éxito')
    items.value = [];
  } catch (error) {
    alertError(error);
  }
}

</script>

<style scoped>
.cart-container{
    max-width:1200px;
    margin:auto;
    display:grid;
    grid-template-columns: 2fr 1fr;
    gap:20px;
    margin-top:30px;
}


/* PRODUCTOS */

.cart-products{
    background:white;
    padding:20px;
    border-radius:10px;
}


.product-card{
    display:grid;
    grid-template-columns:120px 1fr 150px;
    gap:15px;
    padding:15px 0;
    border-bottom:1px solid #eee;
}


.product-image{
    width:100px;
    height:100px;
    object-fit:cover;
}


.product-title{
    font-size:16px;
    margin-bottom:10px;
}


.product-price{
    font-weight:bold;
    margin-bottom:10px;
}


.quantity button{
    width:30px;
    height:30px;
    border:none;
    background:#3483fa;
    color:white;
    border-radius:5px;
    cursor:pointer;
}


.quantity span{
    margin:0 10px;
}


.product-total{
    text-align:right;
    font-weight:bold;
}


.remove-btn{
    margin-top:10px;
    border:none;
    background:none;
    color:#3483fa;
    cursor:pointer;
}



/* RESUMEN */

.cart-summary{
    background:white;
    padding:20px;
    border-radius:10px;
    height:fit-content;
    position:sticky;
    top:20px;
}


.summary-row{
    display:flex;
    justify-content:space-between;
    margin:10px 0;
}


.summary-total{
    display:flex;
    justify-content:space-between;
    font-size:20px;
    font-weight:bold;
    margin:15px 0;
}


.checkout-btn{

    width:100%;
    padding:15px;

    background:#3483fa;
    border:none;
    color:white;

    font-size:16px;
    border-radius:8px;

    cursor:pointer;
}
</style>