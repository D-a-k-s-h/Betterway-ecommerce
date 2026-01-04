import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { addToCart } from '../redux/slices/cartSlice'
import { setSearch, setCategory, setSort, clearFilters } from '../redux/slices/filterSlice'
import productData from '../Assets/Product-data';
import image from '../Assets/images.jpg';
import { MdClear } from 'react-icons/md'

const Home = () => {
  const dispatch = useDispatch()
  const { search, category, sort } = useSelector(state => state.filters)

  // Get unique categories
  const categories = [...new Set(productData.map(p => p.category))]

  // Apply all filters and sorting
  const filteredProducts = useMemo(() => {
    let result = productData

    // Search filter
    if (search) {
      result = result.filter(product =>
        product.productName.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Category filter
    if (category) {
      result = result.filter(product => product.category === category)
    }

    // Sort by price
    if (sort === 'lowToHigh') {
      result = [...result].sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    } else if (sort === 'highToLow') {
      result = [...result].sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    }

    return result
  }, [search, category, sort])

  const handleAddToCart = (product, index) => {
    if (product.stockStatus === 'In Stock') {
      dispatch(addToCart({
        id: index,
        productName: product.productName,
        price: product.price,
        stockStatus: product.stockStatus,
      }))
      toast.success(`${product.productName} added to cart!`)
    } else {
      toast.error('This item is out of stock')
    }
  }

  const hasActiveFilters = search || category || sort

  return (
    <div className='w-full p-8 bg-gray-50 min-h-screen'>
      <h1 className='text-3xl font-bold mb-8'>Products</h1>

      {/* Filters Section */}
      <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
          {/* Search */}
          <div>
            <label className='block text-sm font-medium mb-2'>Search</label>
            <input
              type='text'
              placeholder='Search products...'
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className='block text-sm font-medium mb-2'>Category</label>
            <select
              value={category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className='block text-sm font-medium mb-2'>Sort by Price</label>
            <select
              value={sort}
              onChange={(e) => dispatch(setSort(e.target.value))}
              className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>No Sort</option>
              <option value='lowToHigh'>Low to High</option>
              <option value='highToLow'>High to Low</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className='flex items-end'>
            <button
              onClick={() => dispatch(clearFilters())}
              disabled={!hasActiveFilters}
              className={`w-full py-2 rounded font-medium flex items-center justify-center gap-2 transition-colors ${
                hasActiveFilters
                  ? 'bg-red-500 hover:bg-red-600 text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <MdClear size={20} />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className='text-sm text-gray-600'>
            <span className='font-medium'>Active Filters:</span>
            {search && <span className='ml-2 inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded'>Search: "{search}"</span>}
            {category && <span className='ml-2 inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded'>Category: {category}</span>}
            {sort && <span className='ml-2 inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded'>Price: {sort === 'lowToHigh' ? 'Low to High' : 'High to Low'}</span>}
          </div>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {filteredProducts.map((product, index) => (
            <div key={index} className='bg-white rounded-md shadow hover:shadow-lg transition-shadow overflow-hidden'>
              <img src={image} alt={product.productName} className='w-full h-40 object-cover'/>
              <div className='p-4'>
                <p className='font-bold text-lg mb-2'>{product.productName}</p>
                <p className='text-gray-600 text-sm mb-1'>{product.category}</p>
                <p className='text-xl font-bold text-blue-600 mb-2'>${product.price}</p>
                <p className={`mb-4 font-medium text-sm ${product.stockStatus === 'In Stock' ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stockStatus}
                </p>
                <button
                  onClick={() => handleAddToCart(product, index)}
                  disabled={product.stockStatus !== 'In Stock'}
                  className={`w-full p-2 rounded-md font-medium transition-colors ${
                    product.stockStatus === 'In Stock'
                      ? 'bg-green-500 text-black hover:bg-green-600 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center py-16'>
          <p className='text-xl text-gray-600 mb-4'>No products found</p>
          <button
            onClick={() => dispatch(clearFilters())}
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded'
          >
            Clear Filters and Try Again
          </button>
        </div>
      )}

      {/* Results Count */}
      {filteredProducts.length > 0 && (
        <div className='mt-8 text-center text-gray-600'>
          Showing <span className='font-bold'>{filteredProducts.length}</span> of <span className='font-bold'>{productData.length}</span> products
        </div>
      )}
    </div>
  )
}

export default Home