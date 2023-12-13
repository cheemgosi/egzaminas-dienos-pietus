import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from "./assets/pages/admin/adminLogin";
import AdminPietus from './assets/pages/admin/adminPietus';
import AdminNaujiPietus from './assets/pages/admin/adminNaujiPietus';
import Login from './assets/pages/public/login';
import Register from './assets/pages/public/register';
import Main from './assets/pages/public/main';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/admin" element={<AdminLogin/>} />
          <Route exact path="/admin/pietus" element={<AdminPietus/>} />
          <Route exact path="/admin/pietus/naujas" element={<AdminNaujiPietus/>} />
          <Route exact path="/admin/*" element={<AdminLogin/>} />

          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/" element={<Main/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
