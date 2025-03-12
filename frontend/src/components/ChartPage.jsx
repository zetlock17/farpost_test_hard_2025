import React, { useState, useEffect } from 'react';
import TransactionsChart from './TransactionsChart';
import apiClient from '../services/api';
import Loading from './Loading';

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
            <Loading />
        );
    }

    if (error) {
        return (
            <Error error={error} />
        );
    }

    return (
        <TransactionsChart transactions={transactions} />
    );
}

export default ChartPage;