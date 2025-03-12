import React, { useState, useRef, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

function Settings() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (!isMobile) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobile]);

    useEffect(() => {
        if (isMobile && isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobile, isOpen]);

    const renderContent = () => (
        <div className="py-1 px-4" role="menu" aria-orientation="vertical">
            <div className="py-3 text-xl mb-1 text-gray-700 dark:text-gray-200 border-b dark:border-gray-600 flex justify-between items-center">
                <span className="font-medium">Настройки</span>
                {isMobile && (
                    <button 
                        onClick={toggleDropdown}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
            
            <div className='flex flex-row justify-between items-center py-2'>
                <span>Смена темы:</span>
                <ThemeToggle />
            </div>
        </div>
    );

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="p-2 btn-settings"
                aria-label="Настройки"
            >
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>

            {isOpen && !isMobile && (
                <div className="absolute right-0 mt-2 w-56 text-sm rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
                    {renderContent()}
                </div>
            )}
            
            {isOpen && isMobile && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-start">
                    <div className="text-xl bg-white dark:bg-gray-800 w-full max-w-lg mx-auto mt-0 rounded-none md:mt-16 md:rounded-lg overflow-auto shadow-xl">
                        {renderContent()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;