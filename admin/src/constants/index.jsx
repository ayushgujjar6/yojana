import { ChartColumn, Home, NotepadText, Plus , Package, PackagePlus, Settings,ShoppingBag, UserCheck, UserPlus, Users, MapPinHouse, Landmark } from "lucide-react";

import ProfileImage from "@/assets/profile-image.jpg";
import ProductImage from "@/assets/product-image.jpg";

export const navbarLinks = [
    {
        title: "Dashboard",
        links: [
            {
                label: "Dashboard",
                icon: Home,
                path: "/",
            },
            
        ],
    },
    {
        title: "Schemes",
        links: [
            {
                label: "Yojana",
                icon: Package,
                path: "/yojana",
            },
            
            // {
            //     label: "Inventory",
            //     icon: ShoppingBag,
            //     path: "/inventory",
            // },
        ],
    },
    {
        title: "Manage",
        links: [
            {
                label: "Taluka",
                icon: MapPinHouse,
                path: "/taluka",
            },
            {
                label: "Gram Panchayat",
                icon: Landmark ,
                path: "/gram-panchayat",
            },
            {
                label: "Village",
                icon: Landmark ,
                path: "/village",
            },
        ],
    },
    {
        title: "Users",
        links: [
            {
                label: "Users",
                icon: Users,
                path: "/user",
            },
            {
                label: "New User",
                icon: UserPlus,
                path: "/user",
            },
            {
                label: "Verified User",
                icon: UserCheck,
                path: "/user",
            },
        ],
    },
    
    {
        title: "Settings",
        links: [
            {
                label: "Settings",
                icon: Settings,
                path: "/user",
            },
        ],
    },
];


