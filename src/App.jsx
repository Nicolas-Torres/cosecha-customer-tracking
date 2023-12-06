import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Customer from './pages/customer/Customer'
import Panel from './pages/panel/Panel'
import AppContainer from './Components/AppContainer'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/*' element={<Navigate to='/customer' />} />
        <Route element={<AppContainer />}>
          <Route path='/customer' element={<Customer />} />
          <Route path='/panel' element={<Panel />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
