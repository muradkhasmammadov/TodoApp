import { useState } from "react";
import { Filter, X, Search, Calendar, CheckCircle, Circle } from "lucide-react";

export default function TodoFilter({ onFilter, onClear }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    text: "",
    isDone: null,
    dueDate: ""
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleClear = () => {
    const clearedFilters = {
      text: "",
      isDone: null,
      dueDate: ""
    };
    setFilters(clearedFilters);
    onClear();
    setIsExpanded(false);
  };

  const hasActiveFilters = filters.text || filters.isDone !== null || filters.dueDate;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          <Filter size={18} />
          <span className="font-medium">Filter Todos</span>
          {hasActiveFilters && (
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={handleClear}
            className="text-gray-500 hover:text-red-500 transition-colors duration-200 p-1"
            title="Clear all filters"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Search size={14} />
              Search Description
            </label>
            <input
              type="text"
              placeholder="Search in todo descriptions..."
              value={filters.text}
              onChange={(e) => handleFilterChange('text', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => handleFilterChange('isDone', null)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                  filters.isDone === null
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Filter size={14} />
                All
              </button>
              
              <button
                onClick={() => handleFilterChange('isDone', false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                  filters.isDone === false
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Circle size={14} />
                Pending
              </button>
              
              <button
                onClick={() => handleFilterChange('isDone', true)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                  filters.isDone === true
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <CheckCircle size={14} />
                Completed
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Calendar size={14} />
              Due Date
            </label>
            <input
              type="date"
              value={filters.dueDate}
              onChange={(e) => handleFilterChange('dueDate', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Date Filters
            </label>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleFilterChange('dueDate', new Date().toISOString().split('T')[0])}
                className="px-3 py-1 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200"
              >
                Today
              </button>
              
              <button
                onClick={() => {
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  handleFilterChange('dueDate', tomorrow.toISOString().split('T')[0]);
                }}
                className="px-3 py-1 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200"
              >
                Tomorrow
              </button>
              
              <button
                onClick={() => {
                  const nextWeek = new Date();
                  nextWeek.setDate(nextWeek.getDate() + 7);
                  handleFilterChange('dueDate', nextWeek.toISOString().split('T')[0]);
                }}
                className="px-3 py-1 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200"
              >
                Next Week
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}