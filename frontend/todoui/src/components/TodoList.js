import { CheckCircle2, Circle } from "lucide-react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, onUpdate, onDelete, onToggle }) {
  const completedCount = todos.filter(todo => todo.isDone).length;
  const totalCount = todos.length;

  const pendingTodos = todos.filter(todo => !todo.isDone);
  const completedTodos = todos.filter(todo => todo.isDone);

  return (
    <div>
      {totalCount > 0 && (
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Progress</h3>
            <span className="text-sm text-gray-600">
              {completedCount} of {totalCount} completed
            </span>
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-0">
        {todos.length > 0 ? (
          <>
            {pendingTodos.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Circle size={20} className="text-blue-500" />
                  Pending ({pendingTodos.length})
                </h3>
                {pendingTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onToggle={onToggle}
                  />
                ))}
              </div>
            )}

            {completedTodos.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-green-500" />
                  Completed ({completedTodos.length})
                </h3>
                {completedTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onToggle={onToggle}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No todos yet</h3>
            <p className="text-gray-500">Add your first todo to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}