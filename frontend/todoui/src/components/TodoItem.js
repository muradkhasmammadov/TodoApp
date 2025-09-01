import { CheckCircle2, Circle, Edit3, Trash2, Calendar } from "lucide-react";

export default function TodoItem({ todo, onUpdate, onDelete, onToggle }) {
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.isDone;
  const isDueToday = todo.dueDate && new Date(todo.dueDate).toDateString() === new Date().toDateString();
  
  const handleToggleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggle) {
      onToggle(todo);
    }
  };
  
  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 mb-4 border-l-4 transform hover:-translate-y-1 ${
      todo.isDone 
        ? "border-l-green-400 bg-gradient-to-r from-green-50 to-white"
        : isOverdue
        ? "border-l-red-400 bg-gradient-to-r from-red-50 to-white"
        : isDueToday
        ? "border-l-yellow-400 bg-gradient-to-r from-yellow-50 to-white"
        : "border-l-blue-400"
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <button
            type="button"
            onClick={handleToggleClick}
            className="transition-all duration-200 hover:scale-110 focus:outline-none"
          >
            {todo.isDone ? (
              <CheckCircle2 size={24} className="text-green-500" />
            ) : (
              <Circle size={24} className="text-gray-400 hover:text-blue-500" />
            )}
          </button>
          
          <div className="flex-1">
            <p className={`text-lg font-medium transition-all duration-200 ${
              todo.isDone 
                ? "text-gray-500 line-through" 
                : "text-gray-800"
            }`}>
              {todo.description}
            </p>
            
            {todo.dueDate && (
              <div className="flex items-center gap-1 mt-1">
                <Calendar size={14} className={
                  isOverdue ? "text-red-500" : 
                  isDueToday ? "text-yellow-600" : 
                  "text-gray-500"
                } />
                <span className={`text-sm ${
                  isOverdue ? "text-red-500 font-medium" : 
                  isDueToday ? "text-yellow-600 font-medium" : 
                  "text-gray-500"
                }`}>
                  {isOverdue ? "Overdue: " : isDueToday ? "Due today: " : "Due: "}
                  {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdate(todo)}
            className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 transition-all duration-200 hover:scale-105"
            title="Edit todo"
          >
            <Edit3 size={18} />
          </button>
          
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-all duration-200 hover:scale-105"
            title="Delete todo"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}