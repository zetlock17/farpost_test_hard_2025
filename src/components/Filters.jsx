import React, { useState, useEffect } from 'react';
import { getTypeLabel } from '../utils/getTypeLabel';

function Filters({ transactions, onFilterChange }) {
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [amountRange, setAmountRange] = useState({ min: '', max: '' });

    const transactionTypes = [...new Set(transactions.map(t => t.transactionType))];

    useEffect(() => {
        applyFilters();
    }, [dateRange, selectedTypes, amountRange]);
    
    const applyFilters = () => {
        let filtered = [...transactions];

        if (dateRange.from) {
            const fromDate = new Date(dateRange.from);
            filtered = filtered.filter(t => new Date(t.date) >= fromDate);
        }
        
        if (dateRange.to) {
            const toDate = new Date(dateRange.to);
            toDate.setHours(23, 59, 59, 999);
            filtered = filtered.filter(t => new Date(t.date) <= toDate);
        }

        if (selectedTypes.length > 0) {
            filtered = filtered.filter(t => selectedTypes.includes(t.transactionType));
        }

        if (amountRange.min !== '') {
            const min = parseFloat(amountRange.min);
            filtered = filtered.filter(t => t.sum >= min);
        }
        
        if (amountRange.max !== '') {
            const max = parseFloat(amountRange.max);
            filtered = filtered.filter(t => t.sum <= max);
        }

        onFilterChange(filtered);
    };

    const handleTypeToggle = (type) => {
        setSelectedTypes(prev => 
            prev.includes(type) 
                ? prev.filter(t => t !== type) 
                : [...prev, type]
        );
    };
    
    const handleClearFilters = () => {
        setDateRange({ from: '', to: '' });
        setSelectedTypes([]);
        setAmountRange({ min: '', max: '' });
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-2">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Фильтры</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Период</h3>
                    <div className="flex flex-col space-y-2">
                        <div>
                            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">С</label>
                            <input 
                                type="date" 
                                value={dateRange.from} 
                                onChange={e => setDateRange({...dateRange, from: e.target.value})}
                                className="w-full h-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">По</label>
                            <input 
                                type="date" 
                                value={dateRange.to} 
                                onChange={e => setDateRange({...dateRange, to: e.target.value})}
                                className="w-full h-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Тип транзакции</h3>
                    <div className="space-y-2">
                        {transactionTypes.map(type => (
                            <label key={type} className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    checked={selectedTypes.includes(type)}
                                    onChange={() => handleTypeToggle(type)}
                                    className="rounded border-gray-300 text-blue-600 mr-2"
                                />
                                <span className="text-gray-700 dark:text-gray-300">
                                    {getTypeLabel(type)}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Сумма</h3>
                    <div className="flex flex-col space-y-2">
                        <div>
                            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">От</label>
                            <input 
                                type="number" 
                                value={amountRange.min}
                                step={1000}
                                onChange={e => setAmountRange({...amountRange, min: e.target.value})}
                                className="w-full h-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                placeholder="Минимум"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">До</label>
                            <input 
                                type="number" 
                                value={amountRange.max} 
                                step={1000}
                                onChange={e => setAmountRange({...amountRange, max: e.target.value})}
                                className="w-full h-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                placeholder="Максимум"
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-6 flex justify-end">
                <button 
                    onClick={handleClearFilters}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-gray-700 dark:text-gray-300"
                >
                    Сбросить фильтры
                </button>
            </div>
        </div>
    );
}

export default Filters;