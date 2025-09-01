import { useEffect, useState } from "react";
import { getTodos, getFilteredTodos, createTodo, updateTodo, deleteTodo } from "../services/todoService";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import TodoFilter from "../components/TodoFilter";

export default function HomePage() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    text: "",
    isDone: null,
    dueDate: ""
  });
  
  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const fetchFilteredTodos = async (filters) => {
    try {
      setIsFiltering(true);
      const data = await getFilteredTodos(filters);
      setTodos(data);
      setActiveFilters(filters);
    } catch (error) {
      console.error("Failed to fetch filtered todos:", error);
    } finally {
      setIsFiltering(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async (todo) => {
    try {
      if (editingTodo) {
        await updateTodo(editingTodo.id, { ...editingTodo, ...todo });
        setEditingTodo(null);
      } else {
        await createTodo(todo);
      }
      if (hasActiveFilters()) {
        fetchFilteredTodos(activeFilters);
      } else {
        fetchTodos();
      }
    } catch (error) {
      console.error("Failed to save todo:", error);
    }
  };

  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      if (hasActiveFilters()) {
        fetchFilteredTodos(activeFilters);
      } else {
        fetchTodos();
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleToggle = async (todo) => {
    try {
      const updatedTodo = { ...todo, isDone: !todo.isDone };
      await updateTodo(todo.id, updatedTodo);
      if (hasActiveFilters()) {
        fetchFilteredTodos(activeFilters);
      } else {
        fetchTodos();
      }
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleFilter = (filters) => {
    if (hasFiltersSet(filters)) {
      fetchFilteredTodos(filters);
    } else {
      fetchTodos();
      setActiveFilters({ text: "", isDone: null, dueDate: "" });
    }
  };

  const handleClearFilters = () => {
    setActiveFilters({ text: "", isDone: null, dueDate: "" });
    fetchTodos();
  };

  const hasFiltersSet = (filters) => {
    return filters.text || filters.isDone !== null || filters.dueDate;
  };

  const hasActiveFilters = () => {
    return hasFiltersSet(activeFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Todo App
          </h1>
          <p className="text-gray-600 text-lg">By Helmes...</p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-4"></div>
        </div>

        <div className="space-y-8">
          <TodoForm 
            onSubmit={handleAdd} 
            existingTodo={editingTodo} 
            onCancel={handleCancelEdit} 
          />
          
          <TodoFilter 
            onFilter={handleFilter}
            onClear={handleClearFilters}
          />
          
          {isFiltering && (
            <div className="text-center py-4">
              <div className="inline-flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                <span>Filtering todos...</span>
              </div>
            </div>
          )}
          
          <TodoList 
            todos={todos} 
            onUpdate={handleEditClick} 
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        </div>
        
        <div className="text-center mt-12 text-gray-500">
          {hasActiveFilters()}
        </div>
      </div>
    </div>
  );
}