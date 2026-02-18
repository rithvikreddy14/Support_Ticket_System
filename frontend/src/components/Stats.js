import React from 'react';
import { BarChart3, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

const Stats = ({ stats }) => {
  if (!stats) return <div className="loading-stats">Loading dashboard...</div>;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="icon-wrapper blue"><BarChart3 size={20} /></div>
        <div>
          <span className="stat-label">Total Tickets</span>
          <h3 className="stat-value">{stats.total_tickets}</h3>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="icon-wrapper orange"><Clock size={20} /></div>
        <div>
          <span className="stat-label">Open Tickets</span>
          <h3 className="stat-value">{stats.open_tickets}</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="icon-wrapper green"><CheckCircle2 size={20} /></div>
        <div>
          <span className="stat-label">Avg / Day</span>
          <h3 className="stat-value">{stats.avg_tickets_per_day.toFixed(1)}</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="icon-wrapper red"><AlertCircle size={20} /></div>
        <div>
          <span className="stat-label">Critical</span>
          <h3 className="stat-value">{stats.priority_breakdown?.critical || 0}</h3>
        </div>
      </div>
    </div>
  );
};

export default Stats;