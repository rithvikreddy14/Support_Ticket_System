import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { api } from '../api/api';

const TicketForm = ({ onTicketCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General',
    priority: 'Low'
  });
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [isAutoFilled, setIsAutoFilled] = useState(false);

  // Handle text changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'description') {
      setIsAutoFilled(false); // Reset badge if user edits
    }
  };

  // AI Classification on Blur (when clicking out of description)
  const handleBlur = async () => {
    if (formData.description.length < 5) return;
    
    setIsAnalysing(true);
    try {
      const { data } = await api.classify(formData.description);
      setFormData(prev => ({
        ...prev,
        category: data.suggested_category || 'General',
        priority: data.suggested_priority || 'Medium'
      }));
      setIsAutoFilled(true);
    } catch (error) {
      console.error("AI Auto-fill failed", error);
    } finally {
      setIsAnalysing(false);
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createTicket(formData);
      // Clear form
      setFormData({ title: '', description: '', category: 'General', priority: 'Low' });
      setIsAutoFilled(false);
      // Refresh parent list
      if (onTicketCreated) onTicketCreated();
    } catch (error) {
      console.error("Failed to create ticket", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      {/* Title Input */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
        <input 
          name="title"
          value={formData.title}
          onChange={handleChange}
          type="text" 
          placeholder="e.g. System is crashing..." 
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
          required
        />
      </div>

      {/* Description Input */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Description
        </label>
        <textarea 
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          rows="4"
          placeholder="Describe the issue in detail..."
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
          required
        ></textarea>
        
        {/* Helper text for AI */}
        <div className="h-6 mt-2 flex items-center gap-2">
          {isAnalysing && (
            <span className="text-xs text-indigo-600 font-medium animate-pulse">
              ✨ Analyzing...
            </span>
          )}
          {isAutoFilled && !isAnalysing && (
            <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              ✓ Auto-categorized by AI
            </span>
          )}
          {!isAnalysing && !isAutoFilled && (
            <span className="text-xs text-slate-400">
              AI will detect category & priority automatically
            </span>
          )}
        </div>
      </div>

      {/* Dropdowns Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Category</label>
          <select 
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none capitalize"
          >
            <option value="general">General</option>
            <option value="technical">Technical</option>
            <option value="billing">Billing</option>
            <option value="account">Account</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Priority</label>
          <select 
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none capitalize"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
      >
        <Send size={18} />
        Submit Ticket
      </button>

    </form>
  );
};

export default TicketForm;