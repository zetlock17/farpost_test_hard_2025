import React, { useState, useEffect } from 'react';
import Filters from "./Filters";
import TransactionsList from "./TransactionsList";
import apiClient from '../services/api';

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(25);
    const [loading, setLoading] = useState(true);
    const [totalFilteredItems, setTotalFilteredItems] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get('/transactions');
                setTransactions(response.data);
                setFilteredTransactions([]);
                setError(null);
            } catch (err) {
                console.error('Error fetching transactions:', err);
                setError('Не удалось загрузить транзакции');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    useEffect(() => {
        if (transactions.length > 0) {
            applyFiltersWithPagination();
        }
    }, [currentPage, transactions]);

    const applyFiltersWithPagination = (filters = null) => {
        setLoading(true);

        setTimeout(() => {
            let filtered = [...transactions];

            if (filters) {
                if (filters.dateRange.from) {
                    const fromDate = new Date(filters.dateRange.from);
                    filtered = filtered.filter(t => new Date(t.date) >= fromDate);
                }
                
                if (filters.dateRange.to) {
                    const toDate = new Date(filters.dateRange.to);
                    toDate.setHours(23, 59, 59, 999);
                    filtered = filtered.filter(t => new Date(t.date) <= toDate);
                }
                
                if (filters.selectedTypes.length > 0) {
                    filtered = filtered.filter(t => filters.selectedTypes.includes(t.transactionType));
                }
                
                if (filters.amountRange.min !== '') {
                    const min = parseFloat(filters.amountRange.min);
                    filtered = filtered.filter(t => t.sum >= min);
                }
                
                if (filters.amountRange.max !== '') {
                    const max = parseFloat(filters.amountRange.max);
                    filtered = filtered.filter(t => t.sum <= max);
                }
            }

            setTotalFilteredItems(filtered.length);

            const startIndex = (currentPage - 1) * itemsPerPage;
            const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);
            
            setFilteredTransactions(paginatedData);
            setLoading(false);
        }, 300);
    };

    const handleFilterChange = (filters) => {
        setCurrentPage(1);
        applyFiltersWithPagination(filters);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (loading && transactions.length === 0) {
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
        <>
            {transactions.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p>Транзакции не найдены</p>
                </div>
            ) : (
                <>
                    <Filters 
                        transactions={transactions} 
                        onFilterChange={handleFilterChange} 
                    />
                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <TransactionsList 
                            transactions={filteredTransactions}
                            currentPage={currentPage}
                            totalPages={Math.ceil(totalFilteredItems / itemsPerPage)}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </>
    );
}

export default Transactions;