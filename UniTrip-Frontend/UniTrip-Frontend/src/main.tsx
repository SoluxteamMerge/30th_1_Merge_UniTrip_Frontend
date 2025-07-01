import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/Header'

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <Header isLoggedIn={false} />
  </React.StrictMode>,
) 