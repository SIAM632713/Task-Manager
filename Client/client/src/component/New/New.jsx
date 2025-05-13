import React, { useEffect } from 'react';
import { CiCalendar } from 'react-icons/ci';
import { RiEdit2Line } from 'react-icons/ri';
import { AiOutlineDelete } from 'react-icons/ai';
import { TasklistByStatus } from '../../APIrequest/APIRequest.js';
import { useSelector } from 'react-redux';
import { DeleteToDO } from '../../helper/DeleteAlert.js';
import { UpdateToDO } from '../../helper/UpdateAlert.js';

const New = () => {
    useEffect(() => {
        TasklistByStatus('new');
    }, []);

    const Newlist = useSelector((state) => state.task.new);

    const DeleteItem = (id) => {
        DeleteToDO(id).then((result) => {
            if (result === true) {
                TasklistByStatus('new');
            }
        });
    };

    const UpdatestatusItem = (id, status) => {
        UpdateToDO(id, status).then((result) => {
            if (result === true) {
                TasklistByStatus('new');
            }
        });
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Task In New</h1>
                </div>
                <div>
                    <div className="flex items-center justify-center gap-6">
                        <input
                            type="search"
                            placeholder="Search"
                            className="py-2 px-6 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-[#EC4899]"
                        />
                        <button className="px-6 py-2 rounded-md bg-[#EC4899] text-xl font-semibold text-white hover:bg-[#d4337f] transition-all">
                            SEARCH
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                {Newlist.map((item, index) => (
                    <div
                        key={index}
                        className="p-6 rounded-lg shadow-md bg-gray-200 space-y-3 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                        <h1 className="text-xl font-medium text-gray-800">{item.title}</h1>
                        <p className="text-gray-600">{item.description}</p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-gray-500">
                                <div className="flex items-center gap-2">
                                    <CiCalendar />
                                    <span>4/23/2025</span>
                                </div>
                                <RiEdit2Line
                                    className="text-gray-600 hover:text-blue-500 cursor-pointer"
                                    onClick={UpdatestatusItem.bind(this, item._id, item.status)}
                                />
                                <AiOutlineDelete
                                    className="text-gray-600 hover:text-red-500 cursor-pointer"
                                    onClick={DeleteItem.bind(this, item._id)}
                                />
                            </div>

                            <button
                                className="px-3 py-1 rounded-full bg-blue-400 text-sm text-white hover:bg-blue-500 transition-all cursor-pointer"
                            >
                                {item.status}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default New;
