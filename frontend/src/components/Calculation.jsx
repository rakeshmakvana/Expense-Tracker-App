import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import apiRequest from '../api';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Calculation = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [monthlyData, setMonthlyData] = useState({ income: [], expense: [] });

  useEffect(() => {
    const fetchDataAndCalculateExpense = async () => {
      try {
        const res = await apiRequest.get('/expenses');
        const fetchedData = res.data;
        setData(fetchedData);

        const totalExpense = fetchedData
          .filter(item => item.transactionType === 'debit')
          .reduce((acc, curr) => acc + curr.amount, 0);
        setExpense(totalExpense);

        const totalIncome = fetchedData
          .filter(item => item.transactionType === 'credit')
          .reduce((acc, curr) => acc + curr.amount, 0);
        setIncome(totalIncome);

        setTotal(totalIncome - totalExpense);

        const monthlyIncome = Array(12).fill(0);
        const monthlyExpense = Array(12).fill(0);

        fetchedData.forEach(item => {
          const month = new Date(item.date).getMonth();
          if (item.transactionType === 'credit') {
            monthlyIncome[month] += item.amount;
          } else {
            monthlyExpense[month] += item.amount;
          }
        });

        setMonthlyData({ income: monthlyIncome, expense: monthlyExpense });
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAndCalculateExpense();
  }, []);

  const chartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ['#4caf50', '#f44336'],
        hoverBackgroundColor: ['#66bb6a', '#ef5350'],
      },
    ],
  };

  const barData = {
    labels: Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' })),
    datasets: [
      {
        label: 'Income',
        data: monthlyData.income,
        backgroundColor: 'rgba(76, 175, 80, 0.7)',
      },
      {
        label: 'Expenses',
        data: monthlyData.expense,
        backgroundColor: 'rgba(244, 67, 54, 0.7)',
      },
    ],
  };

  return (
    <div className="flex flex-col items-center bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-5xl mx-auto mt-4 ">
      <h2 className="font-semibold text-xl text-gray-700 text-center mb-4">TOTAL BALANCE</h2>
      <h1 className={`font-extrabold text-5xl ${total >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {total >= 0 ? `+₹${total}` : `-₹${Math.abs(total)}`}
      </h1>

      <div className="flex items-center justify-between w-full mt-6 px-4">
        <div className="flex flex-col items-center">
          <h2 className="font-semibold text-lg text-gray-600">INCOME</h2>
          <h1 className="font-bold text-3xl text-green-600">+₹{income}</h1>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="font-semibold text-lg text-gray-600">EXPENSES</h2>
          <h1 className="font-bold text-3xl text-red-600">-₹{expense}</h1>
        </div>
      </div>

      <div className="mt-8 w-full flex flex-col items-center">
        <div className="w-full max-w-3xl bg-gray-100 rounded-lg p-4 shadow-md">
          {chartData.datasets[0].data.length > 0 && (
            <Pie data={chartData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: '#333',
                    font: {
                      size: 14,
                      weight: 'bold',
                    },
                  },
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      const label = tooltipItem.label || '';
                      const value = tooltipItem.raw || 0;
                      return `${label}: +₹${value}`;
                    },
                  },
                },
              },
            }} />
          )}
        </div>
      </div>

      <div className="mt-8 w-full flex flex-col items-center">
        <div className="w-full max-w-3xl bg-gray-100 rounded-lg p-4 shadow-md">
          {barData.datasets[0].data.length > 0 && (
            <Bar data={barData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: '#333',
                    font: {
                      size: 14,
                      weight: 'bold',
                    },
                  },
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      const label = tooltipItem.dataset.label || '';
                      const value = tooltipItem.raw || 0;
                      return `${label}: +₹${value}`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: '#333',
                    font: {
                      size: 12,
                      weight: 'bold',
                    },
                  },
                },
                y: {
                  ticks: {
                    color: '#333',
                    font: {
                      size: 12,
                      weight: 'bold',
                    },
                    beginAtZero: true,
                  },
                },
              },
            }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculation;
