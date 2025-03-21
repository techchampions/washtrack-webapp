import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Onboarding from './pages/OnboardingScreen'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
