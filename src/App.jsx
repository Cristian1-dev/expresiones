import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div></div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
