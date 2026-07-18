import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalLayout from './components/layout/GlobalLayout'

import Home from './Pages/Home'
import Projects from './Pages/Projects'
import Stack from './Pages/About'
import Contact from './Pages/Contact'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <GlobalLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/stack' element={<Stack />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </GlobalLayout>
    </BrowserRouter>
  )
}

export default App;