import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { removeFromCart, updateQuantity, clearCart } from '../redux/slices/cartSlice'
import { MdDelete } from 'react-icons/md'

const Cart = () => {
  const dispatch = useDispatch()
  const { items, totalQuantity, totalPrice } = useSelector(state => state.cart)

  const handleRemove = (id) => {
    const item = items.find(i => i.id === id)
    dispatch(removeFromCart(id))
    toast.success(`${item.productName} removed from cart!`)
  }

  const handleQuantityChange = (id, newQuantity) => {
    dispatch(updateQuantity({ id, quantity: parseInt(newQuantity) }))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  if (items.length === 0) {
    return (
      <div className='w-full p-8 flex flex-col items-center justify-center min-h-screen'>
        <h1 className='text-3xl font-bold mb-4'>Your Cart</h1>
        <p className='text-xl text-gray-600 mb-8'>Your cart is empty</p>
        <a href='/' className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700'>
          Continue Shopping
        </a>
      </div>
    )
  }

  return (
    <div className='w-full p-8'>
      <h1 className='text-3xl font-bold mb-8'>Your Cart</h1>
      
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Cart Items */}
        <div className='lg:col-span-2'>
          <div className='space-y-4'>
            {items.map((item) => (
              <div key={item.id} className='border rounded-lg p-4 flex justify-between items-center bg-white shadow'>
                <div className='flex-1'>
                  <h3 className='text-lg font-bold mb-2'>{item.productName}</h3>
                  <p className='text-gray-600 mb-3'>${item.price.toFixed(2)} per item</p>
                  
                  <div className='flex items-center gap-3'>
                    <label className='font-medium'>Quantity:</label>
                    <select 
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className='border rounded px-3 py-1'
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='text-right flex flex-col items-end gap-4'>
                  <div>
                    <p className='text-sm text-gray-600'>Subtotal</p>
                    <p className='text-xl font-bold text-blue-600'>${item.totalPrice.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className='bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-colors'
                  >
                    <MdDelete size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div className='bg-gray-100 rounded-lg p-6 h-fit sticky top-4'>
          <h2 className='text-2xl font-bold mb-6'>Order Summary</h2>
          
          <div className='space-y-4 mb-6 border-b pb-4'>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Total Items:</span>
              <span className='font-bold'>{totalQuantity}</span>
            </div>
            <div className='flex justify-between text-lg'>
              <span className='text-gray-600'>Total Price:</span>
              <span className='font-bold text-blue-600'>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded mb-3 transition-colors'>
            Checkout
          </button>

          <button 
            onClick={handleClearCart}
            className='w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded transition-colors'
          >
            Clear Cart
          </button>

          <a href='/' className='block text-center text-blue-600 hover:text-blue-700 mt-4 font-medium'>
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  )
}

export default Cart
