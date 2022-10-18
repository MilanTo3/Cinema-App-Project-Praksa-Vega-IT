import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import Frontpage from './Pages/frontPage/frontPage';
import Mainnavigation from './Components/layout/mainNav';
import LogRegPage from './Pages/logregPage/logregPage';
import Footer from './Components/footer/footer';
import classes from './App.css';

function App() {
  return (
    <div>
      <Mainnavigation/>
      <Routes>
        <Route path="/" element={<Frontpage/>}/>
        <Route path='/loginregpage' element={<LogRegPage/>} />
      </Routes>
      <Footer className={classes.footer}/>
    </div>
  );
}

export default App;
