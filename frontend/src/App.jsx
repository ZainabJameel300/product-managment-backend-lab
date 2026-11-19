import { Route, Routes } from "react-router"
import Homepage from "./pages/Homepage"
import CreateProduct from "./pages/CreateProduct"
import EditProduct from "./pages/EditProduct"
import ProductList from "./pages/ProductList"
import Navbar from "./components/Navbar"
import ProductDetails from "./pages/ProductDetails"



function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/products" element={<ProductList/>} />
        <Route path="/products/:productId" element={<ProductDetails/>} />
        <Route path="/products/create" element={<CreateProduct/>} />
        <Route path="/products/:productId/edit" element={<EditProduct/>} />
      </Routes>
    </div>
  )
}

export default App