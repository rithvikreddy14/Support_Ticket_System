import React from 'react';
import { Trash2, CheckCircle, Clock, AlertTriangle } from 'lucide-react'; 
import { api } from '../api/api';

const TicketCard = ({ ticket, onRefresh }) => {
  
  // 1. Handle Closing a Ticket
  const handleClose = async () => {
    try {
      await api.updateTicket(ticket.id, { status: 'closed' });
      onRefresh(); // Refresh the list
    } catch (error) {
      console.error("Failed to close ticket", error);
    }
  };

  // 2. Handle Deleting a Ticket
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        await api.deleteTicket(ticket.id);
        onRefresh(); // Refresh the list
      } catch (error) {
        console.error("Failed to delete ticket", error);
      }
    }
  };

  // Helper for Priority Colors
  const getPriorityBadge = (priority) => {
    const styles = {
      critical: 'bg-rose-100 text-rose-700 border-rose-200',
      high: 'bg-orange-100 text-orange-700 border-orange-200',
      medium: 'bg-blue-100 text-blue-700 border-blue-200',
      low: 'bg-slate-100 text-slate-600 border-slate-200'
    };
    return styles[priority.toLowerCase()] || styles.low;
  };

  return (
    <div className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden">
      
      {/* Left Border Indicator based on Status */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${ticket.status === 'open' ? 'bg-indigo-500' : 'bg-slate-300'}`}></div>

      <div className="flex justify-between items-start mb-3 pl-3">
        <div>
          <h3 className={`text-lg font-bold transition-colors ${ticket.status === 'closed' ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
            {ticket.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
            <span>#{ticket.id}</span>
            <span>•</span>
            <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
          </p>
        </div>

        {/* Status Badge */}
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
            ticket.status === 'open' 
            ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
            : 'bg-slate-50 text-slate-500 border-slate-200'
        }`}>
          {ticket.status === 'open' ? (
            <><Clock size={12} /> OPEN</>
          ) : (
            <><CheckCircle size={12} /> CLOSED</>
          )}
        </div>
      </div>

      <p className="text-slate-600 text-sm leading-relaxed mb-5 pl-3">
        {ticket.description}
      </p>

      {/* Footer Area: Badges & Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-50 pl-3">
        
        {/* Badges */}
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wide border ${getPriorityBadge(ticket.priority)}`}>
            {ticket.priority}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-md bg-slate-50 text-slate-500 font-medium border border-slate-200 uppercase tracking-wide">
            {ticket.category}
          </span>
        </div>

        {/* Action Buttons (Always Visible / Pinned) */}
        <div className="flex items-center gap-2">
          
          {ticket.status === 'open' && (
            <button 
              onClick={handleClose}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-100"
              title="Mark as Resolved"
            >
              <CheckCircle size={14} /> Resolve
            </button>
          )}

          <button 
            onClick={handleDelete}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-100"
            title="Delete Ticket"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>

      </div>
    </div>
  );
};

// Main List Component
const TicketList = ({ tickets, filterStatus, filterPriority, searchQuery, onTicketUpdated }) => {
  
  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = filterStatus === 'All Status' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'All Priorities' || ticket.priority === filterPriority;
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  if (filteredTickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-400 bg-white rounded-2xl border border-slate-100 border-dashed">
        <AlertTriangle size={32} className="mb-2 opacity-50" />
        <p>No tickets found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTickets.map(ticket => (
        <TicketCard 
            key={ticket.id} 
            ticket={ticket} 
            onRefresh={onTicketUpdated} 
        />
      ))}
    </div>
  );
};

export default TicketList;