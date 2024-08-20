import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Search from './components/Search';
import Post from './components/Post';
import Browse from './components/Browse';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Terms from './components/Terms';
import Editprofile from './components/Editprofile';
import Fullblog from './components/Fullblog';
import About from './components/About';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import Blogadd from './components/Blogadd';
import Notfound from './components/Notfound';
import Loginfirst from './components/Loginfirst';
import Chatbox from './components/Chatbox';
import ProtectedRoute from './components/ProtectedRoute';
import RoomView from './components/Roomview';
import Adminlogin from './components/Adminlogin';
import AdminDashboard from './components/AdminDashboard';
import AdminRoute from './components/AdminRoute';
function App() {
  const location = useLocation();

  const showHeaderFooter = ![
    '/login',
    '/signup',
    '/loginfirst',
    '/404',
    '/admin256',
    "/admin/dashboard"
  ].includes(location.pathname);

  const showChatbox =[
    '/terms',
    '/about',
    '/search',
    '/post',
    '/browse',
    '/'
  ].includes(location.pathname);
  return (
    <>
      {showHeaderFooter && <Header />}
      {showChatbox && <Chatbox />} 
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/loginfirst" element={<Loginfirst />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin256" element={<Adminlogin/>} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        
        <Route path="/roomview/:id" element={<RoomView />} />

        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
        <Route path="/post" element={<ProtectedRoute><Post /></ProtectedRoute>} />
        <Route path="/editprofile" element={<ProtectedRoute><Editprofile /></ProtectedRoute>} />
        <Route path="/browse" element={<ProtectedRoute><Browse /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/fullblog/:id" element={<ProtectedRoute><Fullblog /></ProtectedRoute>} />
        <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
        <Route path="/blogadd" element={<ProtectedRoute><Blogadd /></ProtectedRoute>} />
        

        <Route path="/404" element={<Notfound />} />
        <Route path="*" element={<Navigate to="/404" />} /> 
      </Routes>
      {showHeaderFooter && <Footer />}
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
