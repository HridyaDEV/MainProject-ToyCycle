
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './Pages/Home'
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Sell from './Pages/Sell';
import Profile from './Pages/Profile';
import Shop from './Pages/Shop';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import Favourite from './Pages/Favourite';
import { ToastContainer } from 'react-toastify';
import CategoryPage from './Pages/CategoryPage';
import CategorySpecificPage from './Pages/CategorySpecificPage';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sell' element={<Sell />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/shop' element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favs" element={<Favourite />} />
          <Route path="/categories" element={<CategoryPage />} />
                <Route path="/category/:categoryName" element={<CategorySpecificPage />} />

        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"


        />


      </BrowserRouter>
    </>
  )
}

export default App
