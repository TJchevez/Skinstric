import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages.jsx/Home';
import Introduction from './Pages.jsx/Introduction';
import Location from './Pages.jsx/Location';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Introduction" element={<Introduction />} />
          <Route path="/Location" element={<Location />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
