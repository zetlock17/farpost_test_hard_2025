import { Link } from 'react-router-dom';
import Settings from './Settings';

function Header() {
    return (
        <header className='sticky top-0 z-10 py-2 flex flex-row gap-2 items-center justify-between bg-white dark:bg-gray-800'>
            <div className="flex items-center gap-4">
                <Link to="/" className="text-2xl hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    Платежи
                </Link>
                <Link 
                    to="/chart" 
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm flex items-center"
                >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    График
                </Link>
            </div>
            <Settings />
        </header>
    );
}

export default Header;