import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import PlaylistPage from './pages/PlaylistPage.js';
import ProfilePage from './pages/ProfilePage.js';
import SplashPage from './pages/SplashPage.js';
import SearchPage from './pages/SearchPage.js';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* routes */}
                <Route path="/" element={<SplashPage />} />
                <Route path="/home" element={<HomePage />} />
                {/* dynamic routes */}
                <Route path="/playlist/:id" element={<PlaylistPage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/search" element={<SearchPage />} />
            </Routes>
        </Router>
    );
};

export default App;