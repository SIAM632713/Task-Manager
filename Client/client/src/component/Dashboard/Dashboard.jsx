import React, { useEffect } from 'react';
import { SummaryRequest } from '../../APIrequest/APIRequest.js';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    useEffect(() => {
        SummaryRequest();
    }, []);

    const Summarylist = useSelector((state) => state.summary.value);

    return (
        <div className="p-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Summarylist.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 ease-in-out cursor-pointer">
                        <h3 className="text-xl font-bold text-gray-700 mb-1">{item._id}</h3>
                        <p className="text-gray-500 text-sm">Total: {item.sum}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
