import React, { useState, useEffect } from 'react';
import TransactionsChart from './TransactionsChart';
import apiClient from '../services/api';

function ChartPage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get('/transactions');
                setTransactions(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching transactions:', err);
                setError('Не удалось загрузить данные для графика');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8 text-red-500 dark:text-red-400">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <TransactionsChart transactions={transactions} />
    );
}

export default ChartPage;