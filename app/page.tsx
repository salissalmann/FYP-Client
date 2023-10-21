
import Navbar from './components/Navigation/Navbar'
import RegisterModel from './components/Modals/RegisterModel'
import LandingPage from './components/LandingPage'
import LoginModal from './components/Modals/LoginModel'

export default function Home() {
  return (
    <>
      <RegisterModel />
      <LoginModal />
      <Navbar />
    </>
  )
}
