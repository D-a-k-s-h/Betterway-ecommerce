import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import store from './redux/store';
import './App.css';
import Navbar from './Common/Navbar';
import Home from './Pages/Home';
import Cart from './Pages/Cart';

function App() {
  return (
    <Provider store={store}>
      <Toaster position="top-right" />
      <div className="w-full h-full">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
