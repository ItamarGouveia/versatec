import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Prescr from './pages/Prescr';
import Category from './pages/Category';
import User from './pages/User';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Home/>}/>
      <Route path="/prescriptions"  element={<Prescr/>}/>
      <Route path="/category"  element={<Category/>}/>
      
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
