// Layout.js
import Header from "../components/navComonents/Header"
import React from "react"
import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div>
      <Header />
      <Outlet /> {/* This will render the child routes */}
    </div>
  )
}

export default Layout
