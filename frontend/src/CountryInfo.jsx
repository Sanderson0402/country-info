import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import 'tailwindcss/tailwind.css';

function CountryInfo() {
    const { countryCode } = useParams();
    const [countryInfo, setCountryInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCountryInfo() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/${countryCode}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch country data');
                }
                const data = await response.json();
                setCountryInfo(data);
            } catch (error) {
                console.error('Error fetching country data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchCountryInfo();
    }, [countryCode]);

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <button 
                onClick={() => navigate('/')} 
                className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
            >
                Back
            </button>
            
            {countryInfo && (
                <div className="mt-6 p-4 bg-white shadow-md rounded">
                    {/* Country Name and Flag */}
                    <div className="flex items-center gap-4 mb-6">
                        <img 
                            src={countryInfo.flagUrl} 
                            alt='Country Flag' 
                            className="w-48 h-32 object-cover border rounded" 
                        />
                        <div>
                            <h1 className="text-3xl font-bold">{countryInfo.countryInfo.name}</h1>
                            <p className="text-gray-600">{countryInfo.countryInfo.officialName}</p>
                        </div>
                    </div>

                    {/* Border Countries */}
                    <h2 className="text-2xl font-bold mb-2">Border Countries</h2>
                    <ul className="list-disc pl-5">
                        {countryInfo.countryInfo.borders.map((border) => (
                            <li key={border}>
                                <button 
                                    onClick={() => navigate(`/country/${border}`)} 
                                    className="text-blue-500 hover:underline bg-transparent border-none cursor-pointer"
                                >
                                    {border}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Population Chart */}
                    <h2 className="text-2xl font-bold mt-6 mb-4">Population Over Time</h2>
                    <div className="w-full h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={countryInfo.populationData?.populationCounts}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 30,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                    dataKey="year"
                                    label={{ value: 'Year', position: 'bottom' }}
                                />
                                <YAxis 
                                    tickFormatter={(value) => new Intl.NumberFormat('en', {
                                        notation: 'compact',
                                        compactDisplay: 'short'
                                    }).format(value)}
                                    label={{ 
                                        value: 'Population', 
                                        angle: -90, 
                                        position: 'insideLeft' 
                                    }}
                                />
                                <Tooltip 
                                    formatter={(value) => new Intl.NumberFormat().format(value)}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#2563eb"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Population Data Table */}
                    <h2 className="text-2xl font-bold mt-6 mb-2">Population Data</h2>
                    <ul>
                        {countryInfo.populationData?.populationCounts.map((pop) => (
                            <li key={pop.year} className="mb-1">
                                {pop.year}: {new Intl.NumberFormat().format(pop.value)} people
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CountryInfo;
