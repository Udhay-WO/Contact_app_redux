
import './App.css'
import SignIn from './component/SignIn'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignUp from './component/SignUp'
import ContactForm from './component/ContactForm'
function App() {


  return (
    <>
      
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp/> }/>
        <Route path='/' element={<SignIn /> }/>
        <Route path='/contactform' element={<ContactForm/> }/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
