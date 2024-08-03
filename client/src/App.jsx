import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Signup, UserSessions } from "./pages";
import Todos from "./components/todos";
import { ProtectedRoute } from "./components";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector(store => store.auth.username);
  return (
    <BrowserRouter>
      <div className="bg-gray-900 min-h-screen text-gray-100 transition-all duration-300">
        <Routes>
          <Route path="/" element={<Todos />} /> 
          <Route path="/sessions" element={<UserSessions />} />
          <Route path="/login" element={
            <ProtectedRoute isAuth={user} message="You are already logged in">
              <Login />
            </ProtectedRoute>
          } />
          <Route path="/signup" element={
            <ProtectedRoute isAuth={user} message="You are already logged in">
              <Signup />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;