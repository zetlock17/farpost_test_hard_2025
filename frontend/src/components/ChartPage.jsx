import React, { useState, useEffect } from 'react';
import TransactionsChart from './TransactionsChart';
import transactionsData from '../data/transactions.json';

function ChartPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransactions(transactionsData);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <TransactionsChart transactions={transactions} />
  );
}

export default ChartPage;