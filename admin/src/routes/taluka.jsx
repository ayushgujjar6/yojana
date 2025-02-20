import React, { useEffect, useState, useRef } from "react";
import { Footer } from "@/layouts/footer";
import { PencilLine, Plus, SquareX, Trash } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const Taluka = () => {
    const { theme } = useTheme();
    const [talukaData, setTalukaData] = useState([]); // Store fetched data
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(null); // Stores current form data (for editing)

    // Input Refs
    const engnameRef = useRef();
    const marathinameRef = useRef();
    const pincodeRef = useRef();
    

    // Fetch taluka data from the backend
    const fetchtaluka = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/taluka");
            const data = await response.json();
            setTalukaData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchtaluka(); // Load data on component mount
    }, []);

    //  Handle opening and closing the form
    const handleOpenForm = () => {
        setFormData(null); // Clear form data when adding a new taluka
        setShowForm(true);
    };
    
    const handleCloseForm = () => {
        setShowForm(false);
        setFormData(null);
    };

    // Handle form submission (Add/Edit taluka)
    const submitFormHandler = async (e) => {
        e.preventDefault();

        const newtaluka = {
            taluka_name_eng: engnameRef.current.value,
            taluka_name_marathi: marathinameRef.current.value,
            pincode: pincodeRef.current.value,
        };

        try {
            const response = await fetch(
                formData?.taluka_id ? `http://localhost:5000/api/taluka/${formData.taluka_id}` : "http://localhost:5000/api/new-taluka",
                {
                    method: formData?.taluka_id ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newtaluka),
                }
            );

            if (!response.ok) throw new Error("Failed to save taluka");

            await fetchtaluka(); // Refresh the list after adding/updating
            handleCloseForm();
            console.log(formData?.taluka_id ? "Taluka updated successfully" : "New Taluka added successfully");
        } catch (error) {
            console.error("Error saving Taluka:", error);   
        }
    };

    //  Handle Editing
    const handleEditForm = (taluka) => {
        setFormData(taluka);
        setShowForm(true);
    };

    // Handle Delete
    const deletetaluka = async (id) => {
        console.log("Deleting taluka with id:", id);
        if (!window.confirm("Are you sure you want to delete this taluka?")) 
            return;
        try {
            const response = await fetch(`http://localhost:5000/api/taluka/${id}`, {
             method: "DELETE",
            });

            if (!response.ok){
                 throw new Error("Failed to delete");
            }

            setTalukaData((prevData) => prevData.filter((taluka) => taluka.id !== id));

            console.log("Taluka deleted successfully!");
            await fetchtaluka();
        } catch (error) {
            console.error("Error deleting taluka:", error);
        }
    };

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex flex-row justify-between">
                <h1 className="title">Taluka</h1>
                <button className="flex justify-center items-center w-[80px] h-[30px] text-xl font-bold bg-blue-400 text-white rounded-md" onClick={handleOpenForm}>
                    <Plus className="text-xl" /> New
                </button>
            </div>

            {/* Table to Display taluka Data */}
            <div className="card">
                <div className="card-body p-0">
                    <div className="relative h-[500px] w-full overflow-auto rounded-none [scrollbar-width:_thin]">
                        <table className="table">
                            <thead className="table-header">
                                <tr className="table-row">
                                    <th className="table-head">ID</th>
                                    <th className="table-head">Taluka</th>
                                    <th className="table-head">तालुका</th>
                                    <th className="table-head">Pincode</th>
                                    <th className="table-head">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {talukaData.length > 0 ? (
                                    talukaData.map((taluka, index) => (
                                        <tr key={taluka.taluka_id} className="table-row">
                                            <td className="table-cell">{index + 1}</td>
                                            <td className="table-cell">{taluka.taluka_name_eng}</td>
                                            <td className="table-cell">{taluka.taluka_name_marathi}</td>
                                            <td className="table-cell">{taluka.pincode}</td>
                                            <td className="table-cell">
                                                <div className="flex items-center gap-x-4">
                                                    <button className="text-blue-500 dark:text-blue-600" onClick={() => handleEditForm(taluka)}>
                                                        <PencilLine size={20} />
                                                    </button>
                                                    <button className="text-red-500" onClick={() => deletetaluka(taluka.taluka_id)}>
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

            {/* Form Modal for Adding/Editing */}
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg relative w-96">
                        <button onClick={handleCloseForm} className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-600">
                            <SquareX className="mb-3" />
                        </button>
                        <form onSubmit={submitFormHandler} className="space-y-4 mt-3">
                            <input ref={engnameRef} type="text" placeholder="New Taluka Name" required className="w-full p-2 border rounded-md" defaultValue={formData?.taluka_name_eng|| ""} />
                            <input ref={marathinameRef} type="text" placeholder="नवीन तालुक्याचे नाव" required className="w-full p-2 border rounded-md" defaultValue={formData?.taluka_name_marathi|| ""} />
                            <input ref={pincodeRef} type="text" placeholder="Pincode" required className="w-full p-2 border rounded-md" defaultValue={formData?.pincode || ""} />
                            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">
                                {formData ? "Update Taluka" : "Add taluka"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Taluka;
