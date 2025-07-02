import { useState } from 'react'
import Header from './components/Header'
import SignupPage from './SignupPage'

import './App.css'

function App() {

  return (
    <>
      <Header isLoggedIn={false} />
      <SignupPage />
    </>
  )
}

export default App
