import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/registerandLogin/Login';
import AdminDashboard from './components/dashboards/AdminDashboard';
import UserProvider from './components/UserContext';
import TeacherDashboard from './components/dashboards/TeacherDashboard';
import StudentDashboard from './components/dashboards/StudentDashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Import your ProtectedRoute component
import { AdminProvider } from './components/AdminContext';
import Users from './components/pages/Users';

function App() {
  return (
    <UserProvider>
       <AdminProvider>
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route 
            path='/admin' 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/teacher' 
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/student' 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path='/users' element={<Users/>}></Route>
        </Routes>
        
      </BrowserRouter>
       </AdminProvider>
    </UserProvider>
  );
}

export default App;
