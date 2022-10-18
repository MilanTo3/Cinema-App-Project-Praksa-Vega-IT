import { Routes ,Route } from 'react-router-dom';
import Frontpage from './Pages/frontPage/frontPage';
import Mainnavigation from './Components/layout/mainNav';
import LogRegPage from './Pages/logregPage/logregPage';
import Footer from './Components/footer/footer';
import classes from './App.css';
import AdminPanel from './Pages/admin/adminPanel';

function App() {
  return (
    <div>
      <Mainnavigation/>
      <Routes>
        <Route path="/" element={<Frontpage/>}/>
        <Route path='/loginregpage' element={<LogRegPage/>} />
        <Route path='/adminPanel' element={<AdminPanel/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
