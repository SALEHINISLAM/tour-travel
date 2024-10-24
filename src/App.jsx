import './App.css'
import WebNavbar from './Components/WebNavbar'
import WebFooter from './Components/WebFooter'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <WebNavbar />
      <Outlet />
      <WebFooter />
    </>
  )
}

export default App
