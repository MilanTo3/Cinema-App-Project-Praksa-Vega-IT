import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import Frontpage from './Pages/logregPage/logregPage';
import Mainnavigation from './Components/layout/mainNav';
import LogRegPage from './Pages/logregPage/logregPage';

function App() {
  return (
    <div>
      <Mainnavigation/>
      <Routes>
        <Route path="/" element={<Frontpage/>}/>
        <Route path='/loginregpage' element={<LogRegPage/>} />
      </Routes>
    </div>
  );
}

export default App;
