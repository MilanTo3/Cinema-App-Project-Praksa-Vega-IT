import { Routes ,Route } from 'react-router-dom';
import Frontpage from './Pages/frontPage/frontPage';
import Mainnavigation from './Components/layout/mainNav';
import LogRegPage from './Pages/logregPage/logregPage';
import Footer from './Components/footer/footer';
import AdminPanel from './Pages/admin/adminPanel';
import AdminCrudPage from './Pages/admin/adminCrudPage/adminCrudPage';
import CinemaReservation from './Pages/cinemaReservationPage/cinemaReservation';
import TicketReservationPage from './Pages/ticketReservationPage/ticketReservation';

function App() {
  return (
    <div>
      <Mainnavigation/>
        <div>
          <Routes>
            <Route path="/" element={<Frontpage/>}/>
            <Route path='/loginregpage' element={<LogRegPage/>} />
            <Route exact path='/admin' element={<AdminPanel/>} />
            <Route exact path='/admin/:type' element={<AdminCrudPage/>} />
            <Route exact path='/screening' element={<CinemaReservation/>} />
            <Route exact path='/reservations' element={<TicketReservationPage/>} />
          </Routes>
        </div>
      <Footer/>
    </div>
  );
}

export default App;
