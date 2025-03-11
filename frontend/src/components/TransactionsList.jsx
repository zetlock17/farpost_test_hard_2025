import React, { useState, useEffect } from 'react';
import { getTypeLabel } from '../utils/getTypeLabel';

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

    const getTransactionIcon = (type) => {
        switch(type) {
            case 'autoUp':
                return (
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2 flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-600 dark:text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            case 'viewing':
                return (
                    <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-2 flex-shrink-0">
                        <svg className="h-5 w-5 text-purple-600 dark:text-purple-300" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            case 'stick':
                return (
                    <div className="rounded-full bg-yellow-100 dark:bg-yellow-900 p-2 flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            case 'deposit':
                return (
                    <div className="rounded-full bg-green-100 dark:bg-green-900 p-2 flex-shrink-0">
                        <svg className="h-5 w-5 text-green-600 dark:text-green-300" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-2 flex-shrink-0">
                        <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
        }
    };

    const showTransactionDetails = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const TransactionModal = () => {
        if (!selectedTransaction || !isModalOpen) return null;
        
        return (
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto">
                    <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            Детали транзакции
                        </h3>
                        <button
                            onClick={closeModal}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <div className="p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                {getTransactionIcon(selectedTransaction.transactionType)}
                                <span className="ml-3 font-medium text-gray-900 dark:text-white">
                                    {getTypeLabel(selectedTransaction.transactionType)}
                                </span>
                            </div>
                            <div className={`font-medium ${selectedTransaction.sum < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                {formatAmount(selectedTransaction.sum)}
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Описание</p>
                                <p className="text-gray-800 dark:text-gray-200">{selectedTransaction.description}</p>
                            </div>
                            
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">ID транзакции</p>
                                <p className="text-gray-800 dark:text-gray-200">{selectedTransaction.id}</p>
                            </div>
                            
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Дата и время</p>
                                <p className="text-gray-800 dark:text-gray-200">{formatDateTime(selectedTransaction.date)}</p>
                            </div>
                            
                            {selectedTransaction.details && (
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Дополнительная информация</p>
                                    <pre className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{
                                        JSON.stringify(selectedTransaction.details, null, 2)
                                    }</pre>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-gray-800 dark:text-gray-200"
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        );
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
            
            <TransactionModal />
        </>
    );
}

export default TransactionsList;