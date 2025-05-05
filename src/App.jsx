import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages.jsx/Home';
import Introduction from './Pages.jsx/Introduction';
import Location from './Pages.jsx/Location';
import Hometown from './Pages.jsx/Hometown';
import Submittion from './Pages.jsx/Submittion';
import Result from './Pages.jsx/Result';
import Demographics from './Components.jsx/Demographics';
import AnalysisOptions from './Pages.jsx/AnalysisOptions';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Introduction" element={<Introduction />} />
          <Route path="/Location" element={<Location />} />
          <Route path="/Hometown" element={<Hometown />} />
          <Route path="/Submittion" element={<Submittion />} />
          <Route path="/Result" element={<Result />} />
          <Route path="/AnalysisOptions" element={<AnalysisOptions />} />
          <Route path="/Demographics" element={<Demographics />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
