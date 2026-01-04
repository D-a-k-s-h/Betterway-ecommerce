import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
  category: '',
  sort: '', // '' | 'lowToHigh' | 'highToLow'
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setSort: (state, action) => {
      state.sort = action.payload
    },
    clearFilters: (state) => {
      state.search = ''
      state.category = ''
      state.sort = ''
    },
  },
})

export const { setSearch, setCategory, setSort, clearFilters } = filterSlice.actions
export default filterSlice.reducer
