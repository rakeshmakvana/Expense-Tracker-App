import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Calculation from './Calculation';
import InputForm from './InputForm';
import ShowRecentTransactions from './ShowRecentTransactions';
import { FaPlus, FaEye, FaSignOutAlt, FaBalanceScale } from 'react-icons/fa';

const Home = () => {
    const [activeTab, setActiveTab] = useState('calculation');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        useNavigate('/login');
    };

    return (
        <div className='pt-3 bg-gray-100 min-h-screen flex flex-col px-5 sm:px-10 items-center'>
            <header className='w-full bg-white p-4 rounded-lg shadow-md flex justify-between items-center mb-6'>
                <h1 className='font-title font-extrabold text-2xl text-[#211212]'>
                    <span className='text-[#c36430]'>Expense</span>
                    <span className='text-[#3dad48]'> Tracker</span>
                </h1>
                <nav className='flex items-center gap-6'>
                    <Link
                        to="#"
                        onClick={() => handleTabChange('calculation')}
                        className={`flex items-center text-gray-800 font-semibold hover:text-[#c36430] transition duration-200 ${activeTab === 'calculation' ? 'underline' : ''}`}
                    >
                        <FaBalanceScale className='mr-2 text-xl text-[#3dad48]' /> Balance
                    </Link>
                    <Link
                        to="#"
                        onClick={() => handleTabChange('add')}
                        className={`flex items-center text-gray-800 font-semibold hover:text-[#c36430] transition duration-200 ${activeTab === 'add' ? 'underline' : ''}`}
                    >
                        <FaPlus className='mr-2 text-[#3dad48]' /> Add
                    </Link>
                    <Link
                        to="#"
                        onClick={() => handleTabChange('view')}
                        className={`flex items-center text-gray-800 font-semibold hover:text-[#c36430] transition duration-200 ${activeTab === 'view' ? 'underline' : ''}`}
                    >
                        <FaEye className='mr-2 text-[#3dad48]' /> View
                    </Link>
                    <Link
                        to="#"
                        onClick={handleLogout}
                        className='flex items-center text-gray-800 font-semibold hover:text-[#c36430] transition duration-200'
                    >
                        <FaSignOutAlt className='mr-2 text-[#3dad48]' /> Logout
                    </Link>
                </nav>
            </header>

            <div className='flex flex-col md:flex-row gap-6 h-auto w-full max-w-xl'>
                <div className='flex flex-col gap-5 w-full max-w-2xl'>
                    {activeTab === 'calculation' && <Calculation />}
                    {activeTab === 'add' && <InputForm />}
                    {activeTab === 'view' && <ShowRecentTransactions />}
                </div>
            </div>
        </div>
    );
};

export default Home;
