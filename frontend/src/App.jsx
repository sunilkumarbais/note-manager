import { Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import CreateNote from "./pages/CreateNote"
import ShowNote from "./pages/ShowNote"
import AllNote from "./pages/AllNote"
import UpdateNote from "./pages/UpdateNote"
import Profile from "./pages/Profile"
import UpdateProfile from "./pages/UpdateProfile"
import Footer from "./components/footer/Footer"

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/profile/update" element={<UpdateProfile/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/create-Note" element={<CreateNote/>}/>
        <Route path="/note/:id" element={<ShowNote/>}/>
        <Route path="/all-notes" element={<AllNote/>}/>
        <Route path="/update-note/:id" element={<UpdateNote/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App