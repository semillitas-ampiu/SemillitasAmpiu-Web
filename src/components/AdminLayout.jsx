import { useState } from "react";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleToggleSidebar = () => {
        setIsCollapsed((prev) => !prev);
    };

    const contentPadding = isCollapsed ? "pl-20" : "pl-64";

    return (
        <div className="min-h-screen bg-gray-900">
        <Sidebar isCollapsed={isCollapsed} onToggle={handleToggleSidebar} />
        <main
            className={`min-h-screen ${contentPadding} p-4 transition-[padding] duration-300 ease-in-out`}
        >
            {children}
        </main>
        </div>
    );
}
