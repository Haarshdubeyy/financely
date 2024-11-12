import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

function App() {
  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
