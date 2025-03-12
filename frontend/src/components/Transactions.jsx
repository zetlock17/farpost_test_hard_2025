import React, { useState, useEffect } from 'react';
import Filters from "./Filters";
import TransactionsList from "./TransactionsList";
import apiClient from '../services/api';
import Loading from './Loading';

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(25);
    const [loading, setLoading] = useState(true);
    const [totalFilteredItems, setTotalFilteredItems] = useState(0);
    const [error, setError] = useState(null);
    const [currentFilters, setCurrentFilters] = useState(null);

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
            applyFiltersWithPagination(currentFilters);
        }
    }, [currentPage, transactions, currentFilters]);

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
        setCurrentFilters(filters);
        applyFiltersWithPagination(filters);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (loading && transactions.length === 0) {
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
                        <Loading />
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