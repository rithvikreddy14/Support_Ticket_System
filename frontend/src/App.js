import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Clock, AlertCircle, CheckCircle2, Search } from 'lucide-react'; 
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import { api } from './api/api'; 

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [filterPriority, setFilterPriority] = useState('All Priorities');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch tickets on load
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await api.getTickets();
      setTickets(response.data);
    } catch (error) {
      console.error("Failed to fetch tickets", error);
    }
  };

  // Calculate Real Stats
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    critical: tickets.filter(t => t.priority === 'critical').length,
    avg: (tickets.length / 30).toFixed(1) // Mock logic for "Avg/Day"
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Support Dashboard
            </h1>
            <p className="text-slate-500 mt-1">Manage and track your support tickets efficiently.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Stats & Create Form (Span 4 columns) */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* 1. Beautified Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard 
                icon={<LayoutDashboard size={20} />} 
                label="Total Tickets" 
                value={stats.total} 
                color="bg-blue-100 text-blue-600"
              />
              <StatCard 
                icon={<Clock size={20} />} 
                label="Pending" 
                value={stats.open} 
                color="bg-amber-100 text-amber-600"
              />
              <StatCard 
                icon={<CheckCircle2 size={20} />} 
                label="Avg / Day" 
                value={stats.avg} 
                color="bg-emerald-100 text-emerald-600"
              />
              <StatCard 
                icon={<AlertCircle size={20} />} 
                label="Critical" 
                value={stats.critical} 
                color="bg-rose-100 text-rose-600"
              />
            </div>

            {/* 2. Create Ticket Form Wrapper */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                Create New Ticket
              </h2>
              {/* Pass fetchTickets to refresh list after submission */}
              <TicketForm onTicketCreated={fetchTickets} /> 
            </div>
          </aside>

          {/* RIGHT COLUMN: Ticket List & Filters (Span 8 columns) */}
          <main className="lg:col-span-8 space-y-6">
            
            {/* Search & Filter Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search tickets..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm outline-none"
                />
              </div>
              
              <div className="flex gap-3 w-full sm:w-auto">
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 bg-slate-50 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 cursor-pointer border-none focus:ring-0 outline-none"
                >
                  <option>All Status</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
                <select 
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-4 py-2 bg-slate-50 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 cursor-pointer border-none focus:ring-0 outline-none"
                >
                  <option>All Priorities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            {/* Ticket List Area */}
            <div className="space-y-4">
              <TicketList 
                tickets={tickets} 
                filterStatus={filterStatus} 
                filterPriority={filterPriority}
                searchQuery={searchQuery}
                onTicketUpdated={fetchTickets} // <--- IMPORTANT: Allows the list to refresh
              />
            </div>

          </main>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Stats
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-start justify-between transition hover:shadow-md">
    <div className={`p-2 rounded-lg mb-3 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{label}</p>
      <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
    </div>
  </div>
);

export default App;