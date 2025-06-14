import { Link, Outlet } from "react-router-dom";
import { FaPlus, FaListAlt, FaClipboardList } from "react-icons/fa";
import useTitle from "../hooks/useTitle";

export default function DashboardLayout() {
    useTitle("MarathonPro | Dashboard");
    return (
        
        <div className="min-h-screen flex flex-col">
            
            {/* Header */}
            <header className="bg-primary text-white text-center p-4 text-2xl font-bold shadow">
                🏁 Marathon Dashboard
            </header>

            {/* Layout Body */}
            <div className="flex flex-1 flex-col lg:flex-row">
                {/* Sidebar */}
                <aside className="bg-base-200 p-4 border-r w-full lg:w-64">
                    <nav className="flex flex-col gap-3">
                        <Link
                            to="/dashboard/add-marathon"
                            className="flex items-center gap-2 text-green-700 font-medium hover:text-green-500"
                        >
                            <FaPlus /> Add Marathon
                        </Link>
                        <Link
                            to="/dashboard/my-marathons"
                            className="flex items-center gap-2 text-green-700 font-medium hover:text-green-500"
                        >
                            <FaListAlt /> My Marathon List
                        </Link>
                        <Link
                            to="/dashboard/my-applications"
                            className="flex items-center gap-2 text-green-700 font-medium hover:text-green-500"
                        >
                            <FaClipboardList /> My Apply List
                        </Link>
                    </nav>
                </aside>

                {/* Page Content */}
                <main className="flex-1 p-6 bg-base-100 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
