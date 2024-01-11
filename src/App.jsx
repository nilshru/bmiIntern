import React from "react"
import {  Route, Routes, HashRouter } from "react-router-dom"
import {BrowserRouter}  from "react-router-dom"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Layout from "./pages/Layout"
import CartItem from "./pages/CartItem"
import { ProductProvider } from "./context/Product/ProductContext"
import { CartProvider } from "./context/Cart/CartContext"
import { AuthProvider } from "./context/Auth/AuthContex"
import ProtectedRoute from "./pages/ProtectedRoute"

function App() {
  return (
    // <BrowserRouter>
   
    <HashRouter>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<HomePage />} />
                <Route path="cart" element={<CartItem />} />
              </Route>
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </HashRouter>
    // </BrowserRouter>
  )
}

export default App
