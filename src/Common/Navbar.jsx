import React from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import logo from '../Assets/download.png'

const Navbar = () => {
  const cartQuantity = useSelector(state => state.cart.totalQuantity)
  
  return (
    <nav className='w-full bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex items-center justify-between'>
        {/* Logo */}
        <Link to='/' className='text-2xl font-bold text-blue-600 hover:text-blue-700'>
          <img className='w-10 object-fill' src={logo} alt='logo'/>
        </Link>

        {/* Home Button - Center */}
        <Link 
          to='/' 
          className='text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors'
        >
          Home
        </Link>

        {/* Cart Icon - Right */}
        <Link 
          to='/cart' 
          className='relative text-2xl text-gray-700 hover:text-blue-600 transition-colors'
        >
          <FiShoppingCart />
          {cartQuantity > 0 && (
            <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
              {cartQuantity}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}

export default Navbar