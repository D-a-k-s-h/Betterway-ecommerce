import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productName, price, stockStatus, id } = action.payload
      
      // Check if item already exists in cart
      const existingItem = state.items.find(item => item.id === id)
      
      if (existingItem) {
        // Check if quantity won't exceed available stock
        if (existingItem.quantity < 10) { // Assuming max 10 per product
          existingItem.quantity += 1
          existingItem.totalPrice = existingItem.quantity * parseFloat(existingItem.price)
        }
      } else {
        // Add new item
        if (stockStatus === 'In Stock') {
          state.items.push({
            id,
            productName,
            price: parseFloat(price),
            quantity: 1,
            totalPrice: parseFloat(price),
            stockStatus,
          })
        }
      }
      
      // Update totals
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0)
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0)
    },
    
    removeFromCart: (state, action) => {
      const id = action.payload
      state.items = state.items.filter(item => item.id !== id)
      
      // Update totals
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0)
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0)
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      
      if (item) {
        // Ensure quantity doesn't exceed reasonable limit
        if (quantity > 0 && quantity <= 10) {
          item.quantity = quantity
          item.totalPrice = quantity * item.price
        }
      }
      
      // Update totals
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0)
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0)
    },
    
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalPrice = 0
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
