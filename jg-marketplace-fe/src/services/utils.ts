export const formatCurrency = (value: any) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

export const alertError = (error: any) => {
  let message = 'Error: '
  if (error.response?.data?.message) {
    message += error.response.data.message
  }
  alert(message)
};