import React, { useState, useEffect } from 'react';
import Filters from "./Filters";
import TransactionsList from "./TransactionsList";
import transactionsData from '../data/transactions.json';
import TransactionsChart from './TransactionsChart';

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTransactions(transactionsData);
            setFilteredTransactions(transactionsData);
            setLoading(false);
        }, 300);
        
        return () => clearTimeout(timer);
    }, []);

    const handleFilterChange = (filteredTransactions) => {
        setFilteredTransactions(filteredTransactions);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <>
            {transactions.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p>Транзакции не найдены</p>
                </div>
            ) : (
                <>
                    <TransactionsChart transactions={transactions} />
                    <Filters 
                        transactions={transactions} 
                        onFilterChange={handleFilterChange} 
                    />
                    <TransactionsList 
                        transactions={filteredTransactions}
                    />
                </>
            )}
        </>
    );
}

export default Transactions;