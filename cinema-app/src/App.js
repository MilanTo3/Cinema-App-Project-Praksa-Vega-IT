import { Routes ,Route } from 'react-router-dom';
import Frontpage from './Pages/frontPage/frontPage';
import Mainnavigation from './Components/layout/mainNav';
import LogRegPage from './Pages/logregPage/logregPage';
import Footer from './Components/footer/footer';
import AdminPanel from './Pages/admin/adminPanel';
import AdminCrudPage from './Pages/admin/adminCrudPage/adminCrudPage';
import CinemaReservation from './Pages/cinemaReservationPage/cinemaReservation';
import TicketReservationPage from './Pages/ticketReservationPage/ticketReservation';
import PasswordReset from './Pages/passwordResetPage/passwordReset';
import { AnimatePresence } from 'framer-motion';
import {motion} from "framer-motion";
import MyProfile from './Pages/myProfile/myProfile';

function App() {

  return (
    <div>
      <Mainnavigation/>
          <AnimatePresence>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <Routes>
              <Route path="/" element={<Frontpage/>}/>
              <Route path='/loginregpage' element={<LogRegPage/>} />
              <Route exact path='/admin' element={<AdminPanel/>} />
              <Route exact path='/admin/:type' element={<AdminCrudPage/>} />
              <Route exact path='/screening/:id' element={<CinemaReservation/>} />
              <Route exact path='/reservations' element={<TicketReservationPage/>} />
              <Route path='/passwordreset' element={<PasswordReset />} />
              <Route path='/myProfile' element={<MyProfile />} />
            </Routes>
            </motion.div>
          </AnimatePresence>
      <Footer/>
    </div>
  );
}

export default App;
