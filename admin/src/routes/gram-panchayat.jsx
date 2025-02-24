import React, { useEffect, useState, useRef } from "react";
import { Footer } from "@/layouts/footer";
import { PencilLine, Plus, SquareX, Trash } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import  axios from 'axios';

const GramPanchayat = () => {
    const { theme } = useTheme();
    const [talukaData, setTalukatData] = useState([]); 
    const [panchayatData, setPanchayatData] = useState([]); // Store fetched data
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(null); // Stores current form data (for editing)
    const [selectedTaluka, setSelectedTaluka] = useState(null);





   


    // Input Refs
    const panchayat_marathiRef = useRef();
    const panchayat_engRef = useRef();
    const panchayat_idRef = useRef();
    const taluka_idRef = useRef();

    

    const fetchtaluka = async () => {
        try{
            const response = await fetch(`${VITE_REACT_APP_BACKEND_BASEURL}/api/taluka`);
            const data = await response.json();
            setTalukatData(data);
        }catch(e){
            console.log(e);
        }
    } 

    // Fetch panchayat data from the backend
    const fetchpanchayat = async (taluka_id) => {
        try {
            const response = await fetch(`${VITE_REACT_APP_BACKEND_BASEURL}/api/panchayat/${taluka_id}`);
            const data = await  response.json();
            setPanchayatData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    
    


    useEffect(() => {
        fetchtaluka();// Load data on component mount
        const storedTaluka = localStorage.getItem("SelectedTaluka");
        if(storedTaluka){
            setSelectedTaluka(storedTaluka);
            fetchpanchayat(storedTaluka);
        }
    }, []);

    useEffect(() => {
        fetchpanchayat(selectedTaluka);
    }, [selectedTaluka]);


    const handleTalukaChange = async (event) => {
        const taluka_id = event.target.value;
        setSelectedTaluka(taluka_id);
        localStorage.setItem("SelectedTaluka", taluka_id);
        await fetchpanchayat();
    }




    //  Handle opening and closing the form
    const handleOpenForm = () => {
        setFormData(null); // Clear form data when adding a new panchayat
        setShowForm(true);
    };
    
    const handleCloseForm = () => {
        setShowForm(false);
        setFormData(null);
    };

    // Handle form submission (Add/Edit panchayat)
    const submitFormHandler = async (e) => {
        e.preventDefault();

        const newpanchayat = {
            panchayat_eng: panchayat_engRef.current.value,
            panchayat_marathi: panchayat_marathiRef.current.value,
            taluka_id : taluka_idRef.current.value,
           };

        try {
            const response = await fetch(
                formData?.id ? `${VITE_REACT_APP_BACKEND_BASEURL}/api/panchayat/${formData.id}` : `${VITE_REACT_APP_BACKEND_BASEURL}/api/new-panchayat`,
                {
                    method: formData?.id ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newpanchayat),
                }
            );

            if (!response.ok) throw new Error("Failed to save panchayat");

            fetchpanchayat(); // Refresh the list after adding/updating


            handleCloseForm();
            console.log(formData?.id ? "Panchayat updated successfully" : "New Panchayat added successfully");
        } catch (error) {
            console.error("Error saving panchayat:", error);
        }
    };

    //  Handle Editing
    const handleEditForm = (panchayat) => {
        setFormData(panchayat);
        setShowForm(true);
    };

    // Handle Delete
    const deletepanchayat = async (id) => {
        console.log("Deleting panchayat with id:", id);
        if (!window.confirm("Are you sure you want to delete this Panchayat?")) 
            return;
        try {
            const response = await fetch(`${VITE_REACT_APP_BACKEND_BASEURL}/api/panchayat/${id}`, {
             method: "DELETE",
            });

            if (!response.ok){
                 throw new Error("Failed to delete");
            }

            setPanchayatData((prevData) => prevData.filter((panchayat) => panchayat.id !== id));

            console.log("Panchayat deleted successfully!");
            await fetchpanchayat();
        } catch (error) {
            console.error("Error deleting panchayat:", error);
        }
    };

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex lg:flex-row md:flex-row flex-col justify-between">
                <h1 className="title">Gram Panchayat</h1>
                <button className="flex justify-center mt-2 items-center lg:w-[80px] lg:h-[30px] md:w-[80px] md:h-[30px] w-[60px] h-[25px]  lg:text-xl  text-xs  font-bold bg-blue-400 text-white rounded-md" onClick={handleOpenForm}>
                    <Plus className="text-xl" /> New
                </button>
            </div>

            <div className="flex flex-col justify-between">
                <select ref={taluka_idRef} onChange={handleTalukaChange} value={selectedTaluka} className="w-[200px] h-[30px] rounded-md outline outline-2  outline-slate-200 dark:bg-slate-800 dark:text-white">
                    <option value="">Select Taluka</option>
                    {talukaData.map(taluka => (
                        <option key={taluka.taluka_id} value={taluka.taluka_id}>
                            {taluka.taluka_name_eng}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table to Display panchayat Data */}
            <div className="card">
                <div className="card-body p-0">
                    <div className="relative h-[500px] w-full overflow-auto rounded-none [scrollbar-width:_thin]">
                        <table className="table">
                            <thead className="table-header">
                                <tr className="table-row">
                                    <th className="table-head">ID</th>
                                    <th className="table-head">Gram Panchayat</th>
                                    <th className="table-head">ग्राम पंचायत</th>
                                    <th className="table-head">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {panchayatData.length > 0 ? (
                                    panchayatData.map((panchayat, index) => (
                                        <tr key={panchayat.id} className="table-row">
                                            <td className="table-cell">{index + 1}</td>
                                            <td className="table-cell">{panchayat.panchayat_eng}</td>
                                            <td className="table-cell">{panchayat.panchayat_marathi}</td>   
                                            <td className="table-cell">
                                                <div className="flex items-center gap-x-4">
                                                    <button className="text-blue-500 dark:text-blue-600" onClick={() => handleEditForm(panchayat)}>
                                                        <PencilLine size={20} />
                                                    </button>
                                                    <button className="text-red-500" onClick={() => deletepanchayat(panchayat.panchayat_id)}>
                                                        <Trash size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center p-4">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showForm && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg relative w-96">
                                    <button onClick={handleCloseForm} className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-600">
                                        <SquareX className="mb-3" />
                                    </button>
                                    <form onSubmit={submitFormHandler} className="space-y-4 mt-3">
                                        <input ref={panchayat_engRef} type="text" placeholder="New Panchayat Name" required className="w-full p-2 border rounded-md" defaultValue={formData?.panchayat_eng|| ""} />
                                        <input ref={panchayat_marathiRef} type="text" placeholder="पंचायतीचे नवे नाव" required className="w-full p-2 border rounded-md" defaultValue={formData?.panchayat_marathi|| ""} />
                                        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">
                                            {formData ? "Update Panchayat" : "Add Panchayat"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
            

           

            <Footer />
        </div>
    );
};

export default GramPanchayat;
