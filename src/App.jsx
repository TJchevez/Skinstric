import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages.jsx/Home';
import Form from './Pages.jsx/Form';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
