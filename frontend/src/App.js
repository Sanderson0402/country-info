import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountrySelector from './CountrySelector'; 
import CountryInfo from './CountryInfo'; 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CountrySelector />} />
                <Route path="/country/:countryCode" element={<CountryInfo />} />
            </Routes>
        </Router>
    );
}

export default App;
