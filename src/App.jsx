import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Board from "./pages/Boards/_id";
import NotFound from "./pages/404/NotFound";
import Auth from "./pages/Auth/Auth";
import AuthenticationVerification from "./pages/Auth/AuthenticationVerification";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./redux/user/userSlice";
import Settings from "./pages/Settings/Settings";

const ProtectedRoute = ({ user }) => {
  if(!user) return <Navigate to='/login' replace={true}/>
  return <Outlet />
}

function App() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      {/* React router dom */}
      <Routes>
        <Route path="/" element={
          // replace set to true will replace the route /. That's mean route / will not in the history of browser
          <Navigate to="/boards/b927744a-d3b1-4778-bad9-5b0d8c73ac06" replace={true}/>
        }/>
        {/* Protected Routes allow access after login in */}
        <Route element={<ProtectedRoute user={currentUser} />}>
        {/* Outlet of react-router-dom will run child route */}
          <Route path="/boards/:boardId" element={<Board/>} />
          
          <Route path="/settings/account" element={<Settings />} />
          <Route path="/settings/security" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Auth />}/>
        <Route path="/register" element={<Auth />}/>
        <Route path="/account/verification" element={<AuthenticationVerification />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  )
}

export default App
