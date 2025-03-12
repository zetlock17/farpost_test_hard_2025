import React, { useState, useEffect } from 'react';
import { getTransactionIcon } from '../utils/getTransactionIcon';
import TransactionModal from './TransactionModal';

function TransactionsList({ transactions, currentPage, totalPages, onPageChange }) {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputPage, setInputPage] = useState(currentPage.toString());
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [currentPage]);

    useEffect(() => {
        setInputPage(currentPage.toString());
    }, [currentPage]);

    const groupedTransactions = transactions.reduce((groups, transaction) => {
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

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const showTransactionDetails = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const goToPage = (pageNumber) => {
        onPageChange(pageNumber);
    };

    const CompactPagination = () => {
        if (totalPages <= 1) return null;
        
        const handleInputChange = (e) => {
            setInputPage(e.target.value.replace(/[^0-9]/g, ''));
        };
        
        const handleSubmit = (e) => {
            e.preventDefault();
            const pageNum = parseInt(inputPage, 10);
            if (pageNum >= 1 && pageNum <= totalPages) {
                goToPage(pageNum);
            } else {
                setInputPage(currentPage.toString());
            }
            setIsEditing(false);
        };
        
        const handleBlur = () => {
            handleSubmit({ preventDefault: () => {} });
        };
        
        const handleClick = () => {
            setIsEditing(true);
            setTimeout(() => {
                document.getElementById('page-input')?.focus();
                document.getElementById('page-input')?.select();
            }, 0);
        };
        
        return (
            <div className="flex items-center text-sm mt-4">
                <span className="text-gray-500 dark:text-gray-400 mr-2">
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="inline">
                            <input
                                id="page-input"
                                type="text"
                                value={inputPage}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className="w-10 text-center bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-sm"
                                autoFocus
                            />
                        </form>
                    ) : (
                        <span 
                            onClick={handleClick}
                            className="cursor-pointer hover:text-blue-500 dark:hover:text-blue-400"
                            title="Нажмите, чтобы ввести номер страницы"
                        >
                            {currentPage}
                        </span>
                    )}
                    {" из "} {totalPages}
                </span>
                <div className="flex space-x-1">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className={`p-1 rounded-md ${
                            currentPage === 1
                                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                : 'text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700'
                        }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`p-1 rounded-md ${
                            currentPage === totalPages
                                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                : 'text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700'
                        }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        );
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

    return (
        <>
            {transactions.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p>Транзакции не найдены</p>
                </div>
            ) : (
                <>
                    <div className="flex justify-end">
                        <CompactPagination />
                    </div>
                    
                    {sortedDays.map((day, index) => (
                        <div key={day} className={`space-y-2 ${index > 0 ? 'mt-3' : ''}`}>
                            <h3 className="font-medium text-gray-700 dark:text-gray-300 text-sm border-b border-gray-200 dark:border-gray-600 pb-1">
                                {formatDayHeader(groupedTransactions[day].date)}
                            </h3>
                            
                            <div className="space-y-2">
                            {groupedTransactions[day].items.map(transaction => (
                                <div 
                                    key={transaction.id} 
                                    className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
                                    onClick={() => showTransactionDetails(transaction)}
                                >
                                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                                        {getTransactionIcon(transaction.transactionType)}
                                        <div className="min-w-0 flex-1">
                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                                {transaction.description}
                                            </div>
                                            <div className="flex text-xs text-gray-500 dark:text-gray-400">
                                                <span>{new Date(transaction.date).toLocaleTimeString('ru-RU', { 
                                                    hour: '2-digit', 
                                                    minute: '2-digit' 
                                                })}</span>
                                                <span className="hidden md:inline-block ml-2">
                                                    · ID: {transaction.id}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`font-medium whitespace-nowrap ml-2 ${transaction.sum < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
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
            
            <TransactionModal 
                selectedTransaction={selectedTransaction}
                isModalOpen={isModalOpen}
                onClose={closeModal}
                formatAmount={formatAmount}
                formatDateTime={formatDateTime}
            />
        </>
    );
}

export default TransactionsList;