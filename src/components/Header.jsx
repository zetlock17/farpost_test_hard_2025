import Settings from './Settings';

function Header() {
    return (
        <header className='sticky top-0 z-10 py-1 flex flex-row gap-2 items-end bg-white dark:bg-gray-800'>
            <h1 className='text-2xl'>Платежи</h1>
            <Settings />
        </header>
    );
}

export default Header;