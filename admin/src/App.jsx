import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";
import {Toaster} from 'react-hot-toast';

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/page";
import Yojana from "@/routes/yojana";
import Taluka from "@/routes/taluka";
import GramPanchayat from "@/routes/gram-panchayat";
import Village from '@/routes/village';
import SignIn from '@/routes/sign-in';
import Category from "@/routes/category";
import Subcategory from "@/routes/sub-category";
import Document_Yojana from "@/routes/document_yojana";
import Document from "@/routes/document";

function App() {
    const router = createBrowserRouter([
        // {
        //     path: "/",
        //     element: <SignIn />,  // Show Sign-In first
        // },
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "analytics",
                    element: <h1 className="title">Analytics</h1>,
                },
                {
                    path: "reports",
                    element: <h1 className="title">Reports</h1>,
                },
                {
                    path: "category",
                    element: <Category />,
                },
                {
                    path: "subcategory",
                    element: <Subcategory />,
                },
                {
                    path: "yojana",
                    element: <Yojana />,
                },
                {
                    path: "document-yojana",
                    element: <Document_Yojana />,
                },
                {
                    path: "document",
                    element: <Document />,
                },
                {
                    path: "taluka",
                    element: <Taluka />,
                },
                {
                    path: "gram-panchayat",
                    element: <GramPanchayat />,
                },
                {
                    path: "village",
                    element: <Village />,
                },
                {
                    path: "new-customer",
                    element: <h1 className="title">New Customer</h1>,
                },
                {
                    path: "verified-customers",
                    element: <h1 className="title">Verified Customers</h1>,
                },
                {
                    path: "settings",
                    element: <h1 className="title">Settings</h1>,
                },
            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
            <Toaster 
                position="bottom-center"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        style: {
                            background: '#4CAF50',
                        },
                    },
                    error: {
                        style: {
                            background: '#F44336',
                        },
                    },
                }}
            />
        </ThemeProvider>
    );
}

export default App;
