import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import App from './App'

const Layout = () => {
  return (
    <Routes>
        <Route path="/users" element={<App />} />
    </Routes>
  )
}

export default Layout
