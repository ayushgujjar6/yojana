import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/page";
import Yojana from "@/routes/yojana";
import Taluka from "@/routes/taluka";
import GramPanchayat from "@/routes/gram-panchayat";
import Village from '@/routes/village';
import SignIn from '@/routes/sign-in';

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
                    path: "yojana",
                    element: <Yojana />,
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
        </ThemeProvider>
    );
}

export default App;
