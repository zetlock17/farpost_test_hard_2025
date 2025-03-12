import React from 'react';
import { getTypeLabel } from '../utils/getTypeLabel';
import { getTransactionIcon } from '../utils/getTransactionIcon';

function TransactionModal({ 
    selectedTransaction, 
    isModalOpen, 
    onClose, 
    formatAmount, 
    formatDateTime 
}) {
    if (!selectedTransaction || !isModalOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto">
                <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Детали транзакции
                    </h3>
                    <button
                        onClick={onClose}
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
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-gray-800 dark:text-gray-200"
                    >
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TransactionModal;