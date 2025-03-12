export const getTransactionIcon = (type) => {
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