import React, { useEffect, useState, useRef } from "react";
import { Footer } from "@/layouts/footer";
import { PencilLine, Plus, SquareX, Trash } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const Yojana = () => {
    const { theme } = useTheme();
    const [yojanaData, setYojanaData] = useState([]); // Store fetched data
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(null); // Stores current form data (for editing)

    // Input Refs
    const categoryRef = useRef();
    const subCategoryRef = useRef();
    const nameInputRef = useRef();
    const linkInputRef = useRef();
    const detailsInputRef = useRef();
    const statusInputRef = useRef();

    // Fetch Yojana data from the backend
    const fetchYojana = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/yojana");
            const data = await response.json();
            setYojanaData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchYojana(); // Load data on component mount
    }, []);

    //  Handle opening and closing the form
    const handleOpenForm = () => {
        setFormData(null); // Clear form data when adding a new Yojana
        setShowForm(true);
    };
    
    const handleCloseForm = () => {
        setShowForm(false);
        setFormData(null);
    };

    // Handle form submission (Add/Edit Yojana)
    const submitFormHandler = async (e) => {
        e.preventDefault();

        const newYojana = {
            category_id: categoryRef.current.value,
            sub_category_id: subCategoryRef.current.value,
            yojana_type: nameInputRef.current.value,
            status: statusInputRef.current.value,
            description: detailsInputRef.current.value,
            link: linkInputRef.current.value,
        };

        try {
            const response = await fetch(
                formData?.id ? `http://localhost:5000/api/yojana/${formData.id}` : "http://localhost:5000/api/new-yojana",
                {
                    method: formData?.id ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newYojana),
                }
            );

            if (!response.ok) throw new Error("Failed to save yojana");

            await fetchYojana(); // Refresh the list after adding/updating
            handleCloseForm();
            console.log(formData?.id ? "Yojana updated successfully" : "New Yojana added successfully");
        } catch (error) {
            console.error("Error saving yojana:", error);
        }
    };

    //  Handle Editing
    const handleEditForm = (yojana) => {
        setFormData(yojana);
        setShowForm(true);
    };

    // Handle Delete
    const deleteYojana = async (id) => {
        console.log("Deleting yojana with id:", id);
        if (!window.confirm("Are you sure you want to delete this Yojana?")) 
            return;
        try {
            const response = await fetch(`http://localhost:5000/api/yojana/${id}`, {
             method: "DELETE",
            });

            if (!response.ok){
                 throw new Error("Failed to delete");
            }

            setYojanaData((prevData) => prevData.filter((yojana) => yojana.id !== id));

            console.log("Yojana deleted successfully!");
            await fetchYojana();
        } catch (error) {
            console.error("Error deleting yojana:", error);
        }
    };

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex flex-row justify-between">
                <h1 className="title">Yojana</h1>
                <button className="flex justify-center items-center w-[80px] h-[30px] text-xl font-bold bg-blue-400 text-white rounded-md" onClick={handleOpenForm}>
                    <Plus className="text-xl" /> New
                </button>
            </div>

            {/* Table to Display Yojana Data */}
            <div className="card">
                <div className="card-body p-0">
                    <div className="relative h-[500px] w-full overflow-auto rounded-none [scrollbar-width:_thin]">
                        <table className="table">
                            <thead className="table-header">
                                <tr className="table-row">
                                    <th className="table-head">ID</th>
                                    <th className="table-head">Yojana Type</th>
                                    <th className="table-head">Status</th>
                                    <th className="table-head">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {yojanaData.length > 0 ? (
                                    yojanaData.map((yojana, index) => (
                                        <tr key={yojana.id} className="table-row">
                                            <td className="table-cell">{index + 1}</td>
                                            <td className="table-cell">{yojana.yojana_type}</td>
                                            <td className="table-cell">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-fit
                                                    ${yojana.status === "Active" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"}`}>
                                                    {yojana.status}
                                                </span>
                                            </td>
                                            <td className="table-cell">
                                                <div className="flex items-center gap-x-4">
                                                    <button className="text-blue-500 dark:text-blue-600" onClick={() => handleEditForm(yojana)}>
                                                        <PencilLine size={20} />
                                                    </button>
                                                    <button className="text-red-500" onClick={() => deleteYojana(yojana.yojana_type_id)}>
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
                            <input ref={nameInputRef} type="text" placeholder="New Yojana Name" required className="w-full p-2 border rounded-md" defaultValue={formData?.yojana_type || ""} />
                            <input ref={categoryRef} type="text" placeholder="Yojana Category" required className="w-full p-2 border rounded-md" defaultValue={formData?.category_id || ""} />
                            <input ref={subCategoryRef} type="text" placeholder="Sub Category" required className="w-full p-2 border rounded-md" defaultValue={formData?.sub_category_id || ""} />
                            <select ref={statusInputRef} className="w-full p-2 border rounded-md" required defaultValue={formData?.status || "Active"}>
                                <option value="Active">Active</option>
                                <option value="Deactive">Deactive</option>
                            </select>
                            <input ref={linkInputRef} type="text" placeholder="Links" required className="w-full p-2 border rounded-md" defaultValue={formData?.link || ""}/>
                            <textarea ref={detailsInputRef} placeholder="Details" required className="w-full p-2 border rounded-md h-24" />
                            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">
                                {formData ? "Update Yojana" : "Add Yojana"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Yojana;
