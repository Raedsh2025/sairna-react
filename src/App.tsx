import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Footer from './components/layout/Footer'
import AnnouncementBar from './components/layout/AnnouncementBar'
import Header from './components/layout/Header'

function App() {

  return (
    <><AnnouncementBar />
     <Header />

      <main>
        {/* محتوى الصفحات سنضيفه لاحقاً */}
      </main>
        <Footer />
    </>
  )
}

export default App
