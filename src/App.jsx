import { Navigate, Route, Routes } from "react-router-dom";
import Board from "./pages/Boards/_id";
import NotFound from "./pages/404/NotFound";
import Auth from "./pages/Auth/Auth";
import AuthenticationVerification from "./pages/Auth/AuthenticationVerification";

function App() {

  return (
    <>
      {/* React router dom */}
      <Routes>
        <Route path="/" element={
          // replace set to true will replace the route /. That's mean route / will not in the history of browser
          <Navigate to="/boards/b927744a-d3b1-4778-bad9-5b0d8c73ac06" replace={true}/>
        }/>
        <Route path="/boards/:boardId" element={<Board/>} />
        
        <Route path="/login" element={<Auth />}/>
        <Route path="/register" element={<Auth />}/>
        <Route path="/account/verification" element={<AuthenticationVerification />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  )
}

export default App
