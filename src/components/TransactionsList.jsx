import React, { useState, useEffect, useRef } from 'react';
import transactionsData from '../data/transactions.json';

function TransactionsList() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTransactions(transactionsData);
            setLoading(false);
        }, 300);
        
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [currentPage]);

    const totalPages = Math.ceil(transactions.length / itemsPerPage);
    
    const currentTransactions = transactions.slice(
        (currentPage - 1) * itemsPerPage, 
        currentPage * itemsPerPage
    );

    const groupedTransactions = currentTransactions.reduce((groups, transaction) => {
        const date = new Date(transaction.date);
        const dayKey = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString().split('T')[0];
        
        if (!groups[dayKey]) {
            groups[dayKey] = {
                date: date,
                items: []
            };
        }
        
        groups[dayKey].items.push(transaction);
        return groups;
    }, {});
    
    const sortedDays = Object.keys(groupedTransactions).sort((a, b) => b.localeCompare(a));

    const goToNextPage = () => {
        setCurrentPage(page => Math.min(page + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage(page => Math.max(page - 1, 1));
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const formatAmount = (amount) => {
        const sign = amount < 0 ? '-' : '+';
        return `${sign} ${Math.abs(amount).toLocaleString('ru-RU', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        })} ₽`;
    };

    const formatDayHeader = (date) => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.getDate() === today.getDate() && 
            date.getMonth() === today.getMonth() && 
            date.getFullYear() === today.getFullYear()) {
            return 'Сегодня';
        }
        
        if (date.getDate() === yesterday.getDate() && 
            date.getMonth() === yesterday.getMonth() && 
            date.getFullYear() === yesterday.getFullYear()) {
            return 'Вчера';
        }
        
        return new Intl.DateTimeFormat('ru-RU', { 
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    const getTransactionIcon = (type) => {
        switch(type) {
            case 'autoUp':
                return (
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2">
                        <svg className="h-5 w-5 text-blue-600 dark:text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            case 'viewing':
                return (
                    <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-2">
                        <svg className="h-5 w-5 text-purple-600 dark:text-purple-300" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            case 'stick':
                return (
                    <div className="rounded-full bg-yellow-100 dark:bg-yellow-900 p-2">
                        <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            case 'deposit':
                return (
                    <div className="rounded-full bg-green-100 dark:bg-green-900 p-2">
                        <svg className="h-5 w-5 text-green-600 dark:text-green-300" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-2">
                        <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
        }
    };

    const Pagination = () => {
        if (totalPages <= 1) return null;

        let pageNumbers = [];
        if (totalPages <= 5) {
            pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            if (currentPage <= 3) {
                pageNumbers = [1, 2, 3, 4, '...', totalPages];
            } else if (currentPage >= totalPages - 2) {
                pageNumbers = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                pageNumbers = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
            }
        }

        return (
            <div className="flex justify-center items-center mt-6 space-x-1">
                <button 
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md ${
                        currentPage === 1 
                            ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed' 
                            : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                    }`}
                >
                    &laquo;
                </button>

                {pageNumbers.map((page, index) => (
                    <button 
                        key={index}
                        onClick={() => page !== '...' && goToPage(page)}
                        className={`px-3 py-1 rounded-md ${
                            page === currentPage 
                                ? 'bg-blue-500 text-white' 
                                : page === '...' 
                                    ? 'cursor-default'
                                    : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                        }`}
                    >
                        {page}
                    </button>
                ))}

                <button 
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md ${
                        currentPage === totalPages
                            ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed' 
                            : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                    }`}
                >
                    &raquo;
                </button>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {transactions.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p>Транзакции не найдены</p>
                </div>
            ) : (
                <>
                    {sortedDays.map(day => (
                        <div key={day} className="space-y-2">
                            <h3 className="font-medium text-gray-700 dark:text-gray-300 text-sm border-b border-gray-200 dark:border-gray-600 pb-2">
                                {formatDayHeader(groupedTransactions[day].date)}
                            </h3>
                            
                            <div className="space-y-2">
                                {groupedTransactions[day].items.map(transaction => (
                                    <div 
                                        key={transaction.id} 
                                        className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 flex items-center justify-between"
                                    >
                                        <div className="flex items-center space-x-4">
                                            {getTransactionIcon(transaction.transactionType)}
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {transaction.description}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {new Date(transaction.date).toLocaleTimeString('ru-RU', { 
                                                        hour: '2-digit', 
                                                        minute: '2-digit' 
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`font-medium ${transaction.sum < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                            {formatAmount(transaction.sum)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <Pagination />
                </>
            )}
        </div>
    );
}

export default TransactionsList;