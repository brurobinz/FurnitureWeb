import { Route, Routes,Navigate } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import Add from "./pages/Add/Add"
import List from "./pages/List/List"
import Orders from "./pages/Orders/Orders"
import AdminHelpTab from "./pages/Help/AdminRes"
import Sale from "./pages/Sale/Sale"
import { useState ,useEffect} from "react"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/ProtectedRoute"
import AdminLogin from "./pages/Login/AdminLogin"
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    // Check for token on load
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsAuthenticated(!!token);
  }, []);

  // Save token on login
  const handleLogin = () => {
    localStorage.setItem("adminToken", "your-token");
    setIsAuthenticated(true);
  };

  // Clear token on logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
};

  const url = "http://localhost:4000"
  return (
    <div>
      <ToastContainer/>
      <Navbar onLogout={handleLogout}/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        
        <Routes>
        <Route path="/" element={<Navigate to="/admin-login" />} />
          <Route
            path="/add"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Add url={url} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <List url={url} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Orders url={url} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/help"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminHelpTab url={url} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sale"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Sale url={url} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-login"
            element={<AdminLogin onLogin={handleLogin} />}
          />
        </Routes>
        
      </div>
    </div>
  )
}

export default App