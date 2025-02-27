import React, { useEffect, useState } from "react";
import { CreditCard, DollarSign, Package, TrendingUp, Users } from "lucide-react";

const DashboardPage = () => {
    const [totalyojana, setTotalYojana] = useState(null);
    const [yojana, setYojana] = useState([]);
    const [showYojana, setShowYojana] = useState(false); // State to toggle views

    // Fetch Total Yojana
    useEffect(() => {
        const fetchTotalYojana = async () => {
            try {
                const response = await fetch("http://localhost:5555/api/total-yojana");
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                setTotalYojana(data.totalYojana);
            } catch (error) {
                console.error("Error fetching total Yojana:", error);
                setTotalYojana("N/A");
            }
        };
        fetchTotalYojana();
    }, []);

    // Fetch Yojanas
    const handleYojana = async () => {
        try {
            const response = await fetch("http://localhost:5555/api/yojana");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setYojana(data);
            setShowYojana(true); // Show Yojana list when fetched
        } catch (error) {
            console.error("Error fetching Yojana:", error);
        }
    };

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Dashboard</h1>

            {/* Show Yojana List if showYojana is true */}
            {showYojana ? (
                <div>
                    {/* Back Button */}
                    <button
                        onClick={() => setShowYojana(false)}
                        className="mb-4 rounded bg-blue-500/50 px-4 py-2 font-bold text-white hover:bg-blue-500"
                    >
                        ← Back
                    </button>

                    {/* Display fetched Yojanas */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {yojana.length > 0 ? (
                            yojana.map((yojana, index) => (
                                <div key={index} className="card">
                                    <div className="card-header">
                                        <div className="w-full h-[60px] rounded-lg bg-green-500/20 p-2 text-green-500 flex flex-row">
                                            <p className="card-title">{yojana.yojana_type}</p>
                                        </div>
                                    </div>
                                    {/* <div className="card-body bg-slate-100">
                                        <p className="text-lg font-semibold text-slate-700">
                                            {yojana.description}
                                        </p>
                                    </div> */}
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No Yojanas available</p>
                        )}
                    </div>
                </div>
            ) : (
                // Default Dashboard Cards (Shown when showYojana is false)
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <div className="card" onClick={handleYojana}>
                        <div className="card-header">
                            <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500">
                                <Package size={26} />
                            </div>
                            <p className="card-title">Total Yojana</p>
                        </div>
                        <div className="card-body bg-slate-100">
                            <p className="text-3xl font-bold text-slate-900">
                                {totalyojana !== null ? totalyojana : "Loading..."}
                            </p>
                            <span className="flex w-fit items-center gap-x-2 border border-blue-500 px-2 py-1 font-medium text-blue-500">
                                <TrendingUp size={18} />
                                0
                            </span>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500">
                                <CreditCard size={26} />
                            </div>
                            <p className="card-title">Total Applied</p>
                        </div>
                        <div className="card-body bg-slate-100">
                            <p className="text-3xl font-bold text-slate-900">0</p>
                            <span className="flex w-fit items-center gap-x-2 border border-blue-500 px-2 py-1 font-medium text-blue-500">
                                <TrendingUp size={18} />
                                0
                            </span>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500">
                                <DollarSign size={26} />
                            </div>
                            <p className="card-title">Approved</p>
                        </div>
                        <div className="card-body bg-slate-100">
                            <p className="text-3xl font-bold text-slate-900">0</p>
                            <span className="flex w-fit items-center gap-x-2 border border-blue-500 px-2 py-1 font-medium text-blue-500">
                                <TrendingUp size={18} />
                                0
                            </span>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500">
                                <Users size={26} />
                            </div>
                            <p className="card-title">Pending</p>
                        </div>
                        <div className="card-body bg-slate-100">
                            <p className="text-3xl font-bold text-slate-900">0</p>
                            <span className="flex w-fit items-center gap-x-2 border border-blue-500 px-2 py-1 font-medium text-blue-500">
                                <TrendingUp size={18} />
                                0
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
