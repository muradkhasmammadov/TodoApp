import axios from "axios";

const API_URL = "https://localhost:7034/api/Todos";

export const getTodos = async (params) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const getFilteredTodos = async (filters) => {
  const params = new URLSearchParams();
  
  if (filters.isDone !== null && filters.isDone !== undefined) {
    params.append('isDone', filters.isDone);
  }
  
  if (filters.dueDate) {
    params.append('dueDate', filters.dueDate);
  }
  
  if (filters.text && filters.text.trim()) {
    params.append('text', filters.text.trim());
  }
  
  const response = await axios.get(`${API_URL}/filter`, { params });
  return response.data;
};

export const getTodo = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
};

export const updateTodo = async (id, todo) => {
  const response = await axios.put(`${API_URL}/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};