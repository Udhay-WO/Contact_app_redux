
import './App.css'
import SignIn from './component/SignIn'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignUp from './component/SignUp'
import Popup from './component/Popup'
import { ContactList } from './component/ContactList'
function App() {


  return (
    <>
      
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp/> }/>
        <Route path='/' element={<SignIn /> }/>
        <Route path='/pop' element={<Popup /> }/>
        <Route path='/contactlist' element={<ContactList /> }/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
