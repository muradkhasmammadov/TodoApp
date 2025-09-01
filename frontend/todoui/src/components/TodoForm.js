import { useState, useEffect } from "react";
import { Edit3, Plus, Calendar, X } from "lucide-react";

export default function TodoForm({ onSubmit, existingTodo, onCancel }) {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (existingTodo) {
      setDescription(existingTodo.description);
      setDueDate(existingTodo.dueDate ? existingTodo.dueDate.split("T")[0] : "");
    }
  }, [existingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    onSubmit({ description, dueDate });
    setDescription("");
    setDueDate("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        {existingTodo ? (
          <>
            <Edit3 size={20} className="text-blue-500" />
            Edit Todo
          </>
        ) : (
          <></>
        )}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            Description
          </label>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyPress={handleKeyPress}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 placeholder-gray-400"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <Calendar size={16} />
            Due Date (Optional)
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800"
          />
        </div>
        
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={!description.trim() || (!existingTodo && !dueDate)}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              !description.trim() || (!existingTodo && !dueDate)
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : existingTodo
                ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            }`}
          >
            {existingTodo ? (
              <>
                <Edit3 size={18} />
                Update Todo
              </>
            ) : (
              <>
                <Plus size={18} />
                Add Todo
              </>
            )}
          </button>
          
          {existingTodo && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <X size={18} />
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}