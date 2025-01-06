import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

function CountrySelector() {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCountries() {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/countries`);
            setCountries(response.data);
        }
        fetchCountries();
    }, []);

    const handleSelect = () => {
        if (selectedCountry) {
            navigate(`/country/${selectedCountry}`);
        }
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4 text-center">Select a Country</h1>
            <div className="flex flex-col items-center">
                <select onChange={(e) => setSelectedCountry(e.target.value)} value={selectedCountry} className="p-2 border rounded mb-4">
                    <option value=''>Select a country</option>
                    {countries.map((country) => (
                        <option key={country.countryCode} value={country.countryCode}>{country.name}</option>
                    ))}
                </select>
                <button onClick={handleSelect} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Get Info</button>
            </div>
        </div>
    );
}

export default CountrySelector;