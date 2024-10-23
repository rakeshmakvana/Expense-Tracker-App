import React, { useState } from 'react';
import apiRequest from '../api';

const InputForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('');
  const [date, setDate] = useState('');

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(parseFloat(e.target.value));
  };
  const handleTransactionType = (e) => {
    setTransactionType(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiRequest
      .post('/expenses', {
        description,
        amount,
        transactionType,
        date,
      })
      .then(() => {
        console.log('Transaction added');
        setDescription('');
        setAmount(0);
        setTransactionType('');
        setDate('');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 mt-8">
      <form
        className="py-10 px-8 flex flex-col gap-6 bg-white rounded-xl shadow-xl w-full max-w-lg transition-transform transform hover:scale-105 duration-300"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Add Transaction
        </h2>

        <div className="flex flex-col gap-3">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            className="px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            type="text"
            value={description}
            onChange={handleDescription}
            required
            placeholder="Enter transaction description"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="amount" className="text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            className="px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            type="number"
            onChange={handleAmount}
            step="0.01"
            required
            placeholder="Enter amount"
          />
        </div>

        <div className="flex gap-6">
          <div className="flex items-center">
            <input
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              type="radio"
              name="transactionType"
              value="debit"
              onChange={handleTransactionType}
              required
            />
            <label className="ml-2 text-sm font-medium text-gray-700">Debit (Expense)</label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              type="radio"
              name="transactionType"
              value="credit"
              onChange={handleTransactionType}
              required
            />
            <label className="ml-2 text-sm font-medium text-gray-700">Credit (Income)</label>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="date" className="text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            className="px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            type="date"
            value={date}
            onChange={handleDate}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-lime-600 rounded-lg py-3 text-white font-semibold shadow-md hover:bg-lime-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default InputForm;
