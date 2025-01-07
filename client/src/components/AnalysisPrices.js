// client/src/components/AnalysisPrices.js
import React, { useState, useEffect } from 'react';

const AnalysisPrices = () => {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch('/api/prices', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch prices');
                }

                const data = await response.json();
                setPrices(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, []);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Analysis Prices</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prices.map((price) => (
            <div key={price._id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{price.name}</h2>
            <p className="text-gray-600 mb-4">{price.description}</p>
            <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-blue-600">
            ${price.price}
            </span>
            <span className="text-sm text-gray-500">
            TAT: {price.turnaroundTime}
            </span>
            </div>
            </div>
        ))}
        </div>
        </div>
    );
};

export default AnalysisPrices;
