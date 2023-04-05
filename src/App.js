import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Prescr from './pages/Prescr';
import Category from './pages/Category';
import Login from './pages/Login'
import { AuthGoogleProvider } from './context/authGoogle';
import { PrivateRoutes } from './Private';


function App() {
  return (
    <AuthGoogleProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Login/>}/>
      
      <Route path='/home' element={<PrivateRoutes/>}>
        <Route path="/home" element={<Home/>}/>
        </Route>
      
        <Route path='/prescriptions' element={<PrivateRoutes/>}>
        <Route path="/prescriptions" element={<Prescr/>}/>
      </Route>
      <Route path='/category' element={<PrivateRoutes/>}>
        <Route path="/category" element={<Category/>}/>
     </Route>
      </Routes>
      
    
    </BrowserRouter>

    </AuthGoogleProvider>
    
  );
}

export default App;
