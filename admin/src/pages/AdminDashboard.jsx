import { useState, useEffect } from "react";
import axios from "axios";
import { Menu, User, X, Home, Users, LogOut } from "lucide-react";
import { AButton } from "../components/ui/AButton";
import { backendUrl } from "../App";
import Pageswitch from "./Pageswitch";

const AdminDashboard = ({setToken}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("dashboard");
  const [selectState, setSelectState] = useState("Dashboard");
  const [data, setData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchData = async (filter) => {
    try {
      const response = await axios.get(`${backendUrl}/admin/usertable?filter=${filter}`);
      setData(response.data.userData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData(selectedFilter);
  }, [selectedFilter]);

  const handleLogout = () => {
    console.log("Logging out...");
    // Add logout functionality here
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", filter: "dashboard" },
    { icon: Users, label: "All applications", filter: "all" },
    { icon: Users, label: "Accepted", filter: "accepted" },
    { icon: Users, label: "Rejected", filter: "rejected" },
    { icon: Users, label: "Pending", filter: "pending" }
  ];

  return (
    <div className="flex h-screen bg-slate-900">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div className={`fixed md:relative bg-slate-800 h-full transition-transform duration-300 z-20 w-64 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
          <AButton variant="ghost" size="icon" className="text-slate-400 hover:text-white md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </AButton>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <AButton
              key={item.filter}
              variant={selectedFilter === item.filter ? "default" : "ghost"}
              className={`w-full justify-start space-x-3 ${selectedFilter === item.filter ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white hover:bg-slate-700"}`}
              onClick={() => {
                setSelectedFilter(item.filter);
                setSelectState(item.label);
              }}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </AButton>
          ))}
        </nav>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4 bg-slate-800 shadow-lg relative z-30">
          <AButton variant="ghost" size="icon" className="md:hidden text-slate-400 hover:text-white" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </AButton>
          <h1 className="text-xl font-bold text-white">{selectState}</h1>
          <div className="relative">
            <AButton
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-white"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <User className="h-6 w-6" />
            </AButton>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
                <AButton
                  variant="ghost"
                  className="flex w-full justify-start px-4 py-2 text-gray-700 hover:bg-gray-100"
              
                >
                  <LogOut className="h-5 w-5 mr-2"      onClick={setToken("")}/> Logout
                  
                </AButton>
              </div>
            )}
          </div>
        </div>
        <Pageswitch data={data} selectedFilter={selectedFilter} />
      </div>
    </div>
  );
};

export default AdminDashboard;