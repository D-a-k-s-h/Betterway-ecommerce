import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import filterReducer from './slices/filterSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    filters: filterReducer,
  },
})

export default store
