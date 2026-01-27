import axios from 'axios'
import Swal from 'sweetalert2'//malo ljepši alert

const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosBase.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Unknown error occurred'

    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: message,
    })
    return Promise.reject(error)
  }
)

export default axiosBase
