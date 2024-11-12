import { Radio, Select, Table } from 'antd';
import React, { useState } from 'react';
const { Option } = Select;

function TransactionsTable({ transactions }) {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [sortKey, setSortKey] = useState('');

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    let filteredTransactions = transactions.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter)
    );

    let sortedTransactions = [...filteredTransactions].sort((a, b) => {
        if (sortKey === 'date') {
            return new Date(a.date) - new Date(b.date);
        } else if (sortKey === 'amount') {
            return a.amount - b.amount;
        } else {
            return 0;
        }
    });

    return (
        <div className="p-4 bg-gr-100 shadow-lg">
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name"
                className="block w-full p-2 mb-4 text-black bg-white outline-none placeholder-opacity-50"
            />

            <Select
                className="w-full p-2 mb-4 bg-white text-black"
                onChange={(value) => setTypeFilter(value)}
                value={typeFilter}
                placeholder="Filter"
                allowClear
                bordered={false}
            >
                <Option value="" className="text-black">All</Option>
                <Option value="income" className="text-black">Income</Option>
                <Option value="expense" className="text-black">Expense</Option>
            </Select>

            <Radio.Group
                className="w-full mb-4 flex justify-around p-2 bg-white"
                onChange={(e) => setSortKey(e.target.value)}
                value={sortKey}
            >
                <Radio.Button value="" className="text-black">No Sort</Radio.Button>
                <Radio.Button value="date" className="text-black">Sort by Date</Radio.Button>
                <Radio.Button value="amount" className="text-black">Sort by Amount</Radio.Button>
            </Radio.Group>

            <Table
                dataSource={sortedTransactions}
                columns={columns}
                pagination={false}
                className="shadow-lg"
            />
        </div>
    );
}

export default TransactionsTable;
