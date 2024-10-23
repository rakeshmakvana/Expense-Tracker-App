import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete, MdSearch } from 'react-icons/md';
import apiRequest from '../api';

const ShowRecentTransactions = () => {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedAmount, setUpdatedAmount] = useState(0);
  const [updatedTransactionType, setUpdatedTransactionType] = useState('');
  const [date, setDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest.get('/expenses');
        setRecentTransactions(res.data);
      } catch (error) {
        console.error('Error fetching recent transactions:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await apiRequest.delete(`/expenses/${id}`);
      setRecentTransactions(recentTransactions.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransactionId(transaction._id);
    setUpdatedDescription(transaction.description);
    setUpdatedAmount(transaction.amount);
    setUpdatedTransactionType(transaction.transactionType);
    setDate(transaction.date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest.put(`/expenses/${editingTransactionId}`, {
        description: updatedDescription,
        amount: updatedAmount,
        transactionType: updatedTransactionType,
        date,
      });
      setEditingTransactionId(null);
      const res = await apiRequest.get('/expenses');
      setRecentTransactions(res.data);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const filteredTransactions = recentTransactions.filter(item =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex flex-col gap-6 p-6 bg-gray-50 rounded-xl shadow-md mt-8'>
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>Recent Transactions</h2>
      <div className='flex items-center mb-4'>
        <div className='relative w-full'>
          <input
            type='text'
            placeholder='Search By Name'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
          />
          <MdSearch className='absolute text-xl top-3 right-3 text-gray-600' />
        </div>
      </div>
      {filteredTransactions.map(item => (
        <div key={item._id} className='flex flex-col gap-3 bg-white px-4 py-4 rounded-lg border border-gray-200 shadow-sm transition duration-200 hover:shadow-lg'>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col'>
              <h3 className='text-lg font-semibold text-gray-800'>{item.description}</h3>
              <h4 className='text-sm text-gray-600'>
                {new Date(item.date).toLocaleDateString()}
              </h4>
            </div>
            <div className='flex items-center gap-2'>
              <h3 className={`font-semibold text-lg ${item.transactionType === 'debit' ? 'text-red-600' : 'text-green-600'}`}>
                {item.transactionType === 'debit' ? '-' : '+'} ₹{item.amount.toFixed(2)}
              </h3>
              <button onClick={() => handleEdit(item)}>
                <MdEdit className='h-6 w-6 text-blue-500 hover:text-blue-700 transition duration-200' />
              </button>
              <button onClick={() => handleDelete(item._id)}>
                <MdDelete className='h-6 w-6 text-red-500 hover:text-red-700 transition duration-200' />
              </button>
            </div>
          </div>
          {editingTransactionId === item._id && (
            <form className='py-4 flex flex-col gap-4 bg-gray-100 rounded-lg' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium text-gray-700'>Description</label>
                <input
                  className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                  type='text'
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  required
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium text-gray-700'>Amount</label>
                <input
                  className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                  type='number'
                  value={updatedAmount}
                  onChange={(e) => setUpdatedAmount(parseFloat(e.target.value))}
                  step='0.01'
                  required
                />
              </div>
              <div className='flex gap-4'>
                <div className='flex gap-1 items-center'>
                  <input
                    className='h-4 w-4'
                    type='radio'
                    name='transactionType'
                    value='debit'
                    checked={updatedTransactionType === 'debit'}
                    onChange={(e) => setUpdatedTransactionType(e.target.value)}
                    required
                  />
                  <label className='text-sm font-medium text-gray-700'>Expense</label>
                </div>
                <div className='flex gap-1 items-center'>
                  <input
                    className='h-4 w-4'
                    type='radio'
                    name='transactionType'
                    value='credit'
                    checked={updatedTransactionType === 'credit'}
                    onChange={(e) => setUpdatedTransactionType(e.target.value)}
                    required
                  />
                  <label className='text-sm font-medium text-gray-700'>Income</label>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium text-gray-700'>Date</label>
                <input
                  className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                  type='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <button
                type='submit'
                className='bg-lime-600 rounded-md py-2 text-white font-semibold transition duration-200 hover:bg-lime-700'
              >
                Update Transaction
              </button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowRecentTransactions;
