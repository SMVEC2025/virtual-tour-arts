import React from 'react'
import Viewer from './components/viewer'
import Home from './components/Home'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <>
      <AppProvider>
        <Home />
      </AppProvider>
    </>
  )
}

export default App
