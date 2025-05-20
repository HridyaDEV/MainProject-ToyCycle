

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './Pages/Home'
import SignUp from './Pages/SignUp';


function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
   <Route path='/' element={<Home />} />
   <Route path='/SignUp' element={<SignUp />} />
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
