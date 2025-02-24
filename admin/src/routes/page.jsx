import React, { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { CreditCard, DollarSign, Package, TrendingUp, Users } from "lucide-react";

const DashboardPage = () => {
    const { theme } = useTheme();
    const [totalyojana, setTotalYojana] = useState(null);
    const [schemes, setSchemes] = useState([]);
    const [filterSearch, setFilterSearch] = useState([]);

    // Fetch Schemes
    useEffect(() => {
        fetch("/api/schemes/search?query=")
            .then((res) => res.json())
            .then((data) => {
                setSchemes(data);
                setFilterSearch(data);
            })
            .catch((err) => console.error("Error fetching schemes:", err));
    }, []);

    // Handle Search
    const handleSearch = (query) => {
        if (query) {
            fetch(`/api/schemes/search?query=${query}`)
                .then((res) => res.json())
                .then((data) => setFilterSearch(data))
                .catch((err) => console.error("Error in search:", err));
        } else {
            setFilterSearch(schemes);
        }
    };

    // Fetch Total Yojana
    useEffect(() => {
        const fetchTotalYojana = async () => {
            try {
                const response = await fetch(`${VITE_REACT_APP_BACKEND_BASEURL}/api/total-yojana`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setTotalYojana(data.totalYojana);
            } catch (error) {
                console.error("Error fetching total Yojana:", error);
                setTotalYojana("N/A"); // Show a fallback value
            }
        };

        fetchTotalYojana();
    }, []);

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Dashboard</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="card">
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
        </div>
    );
};

export default DashboardPage;
