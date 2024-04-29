import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Booking from './pages/Booking';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking/:locationId" element={<Booking />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
