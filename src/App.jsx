import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BloqueUno } from './Pages/BloqueUno';
import { BloqueDos } from './Pages/BloqueDos';
import { BloqueTres } from './Pages/BloqueTres';
import { BloqueCuatro } from './Pages/BloqueCuatro';
import { BloqueCinco } from './Pages/BloqueCinco';
import './App.css';
import { Resumen } from './Pages/Resumen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BloqueUno />} />
        <Route path="/bloque-uno" element={<BloqueUno />} />
        <Route path="/bloque-dos" element={<BloqueDos />} />
        <Route path="/bloque-tres" element={<BloqueTres />} />
        <Route path="/bloque-cuatro" element={<BloqueCuatro />} />
        <Route path="/bloque-cinco" element={<BloqueCinco />} />
        <Route path="/resumen" element={<Resumen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
