import { Routes, Route } from "react-router";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Tasks from "./pages/Tasks/Index";

function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="auth">
                <Route path="sign-up" element={<SignUp />} />
            </Route>

            <Route path="tasks">
                <Route index element={<Tasks />} />
            </Route>
        </Routes>
    </>
  )
}

export default App
