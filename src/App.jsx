import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages.jsx/Home';
import Introduction from './Pages.jsx/Introduction';
import Location from './Pages.jsx/Location';
import Hometown from './Pages.jsx/Hometown';
import Submittion from './Pages.jsx/Submittion';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Introduction" element={<Introduction />} />
          <Route path="/Location" element={<Location />} />
          <Route path="/Hometown" element={<Hometown />} />
          <Route path="/Submittion" element={<Submittion />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
