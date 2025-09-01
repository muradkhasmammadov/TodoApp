using TodoApp.Base.Dtos;
using TodoApp.Base.Entities;

namespace TodoApp.Base.Interfaces
{
    public interface ITodoService
    {
        Task<IEnumerable<Todo>> GetTodosAsync();
        Task<Todo> GetTodoAsync(Guid id);
        Task<Todo> CreateTodoAsync(CreateTodoDto dto);
        Task<Todo> UpdateTodoAsync(Guid id, UpdateTodoDto dto);
        Task DeleteTodoAsync(Guid id);
        Task<IEnumerable<Todo>> GetFilteredTodosAsync(bool? isDone, DateTime? dueDate, string? text);
    }
}
