import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getTypeLabel } from '../utils/getTypeLabel';

const COLORS = ['#1A1EB2', '#510FAD', '#0A64A4', '#3E94D1'];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 border border-gray-200 rounded shadow-md text-gray-700 dark:text-gray-300 dark:bg-gray-700">
                <p className="font-medium">{payload[0].name}</p>
                <p className="text-sm">{`Сумма: ${payload[0].value.toFixed(2)} ₽`}</p>
                <p className="text-sm">{`${payload[0].payload.percentage}%`}</p>
            </div>
        );
    }
    return null;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text 
            x={x} 
            y={y} 
            fill="white" 
            textAnchor="middle" 
            dominantBaseline="central"
            fontSize={12}
            fontWeight="bold"
        >
            {`${(percent * 100).toFixed(1)}%`}
        </text>
    );
};

function TransactionsChart({ transactions }) {
    const chartData = useMemo(() => {
        const expenses = transactions.filter(t => t.sum < 0);
        console.log(expenses);

        const categoryTotals = expenses.reduce((acc, transaction) => {
            const category = getTypeLabel(transaction.transactionType);
            if (!acc[category]) {
                acc[category] = 0;
            }
            acc[category] += Math.abs(transaction.sum);
            return acc;
        }, {});
        
        const totalExpenses = Object.values(categoryTotals).reduce((sum, value) => sum + value, 0);

        const data = Object.entries(categoryTotals).map(([name, value]) => ({
            name,
            value,
            percentage: ((value / totalExpenses) * 100).toFixed(1)
        }));

        return data.sort((a, b) => b.value - a.value);
    }, [transactions]);

    if (chartData.length === 0) {
        return <div className="text-center py-4">Нет данных о расходах</div>;
    }

    return (
        <div>
            <h2 className="text-lg font-medium text-center">Процентное соотношение расходов</h2>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend formatter={(value) => `${value} (${chartData.find(item => item.name === value).percentage}%)`} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TransactionsChart;