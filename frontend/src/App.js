import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Header from './components/utils/Header'
import LoginScreen from './components/screens/LoginScreen'
import RegisterScreen from './components/screens/RegisterScreen'
import ProfileScreen from './components/screens/ProfileScreen'
import HomeScreen from './components/screens/HomeScreen'
import ProtectedRoute from './routing/ProtectedRoute' 
import './App.css'

function App() {
  console.log( process.env )
  return (
    <Router>
      <Header />
      <main className='container content'>
        <Routes>
          <Route path='/' element={<HomeScreen />} />          
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} /> 
          <Route element={<ProtectedRoute />}>
            <Route path='/user-profile' element={<ProfileScreen />} />
          </Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
