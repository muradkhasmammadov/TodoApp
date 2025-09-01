using Microsoft.EntityFrameworkCore;
using TodoApp.Base.Dtos;
using TodoApp.Base.Entities;
using TodoApp.Base.Interfaces;
using TodoApp.Data;

namespace TodoApp.Api.Services
{
    public class TodoService : ITodoService
    {
        private readonly TodoDbContext db;
        public TodoService(TodoDbContext context)
        {
            db = context;
        }
        public async Task<IEnumerable<Todo>> GetTodosAsync()
        {
            return await db.Todos.AsNoTracking().ToListAsync();
        }
        public async Task<Todo> GetTodoAsync(Guid id)
        {
            return await db.Todos.AsNoTracking().FirstOrDefaultAsync(t => t.Id == id);
        }
        public async Task<Todo> CreateTodoAsync(CreateTodoDto dto)
        {
            Todo todo = new Todo
            {
                Description = dto.Description,
                CreatedAt = DateTime.Now,
                DueDate = dto.DueDate
            };
            db.Todos.Add(todo);
            await db.SaveChangesAsync();
            return todo;
        }
        public async Task<Todo> UpdateTodoAsync(Guid id, UpdateTodoDto dto)
        {
            Todo? todo = await db.Todos.FindAsync(id);
            if (todo == null) throw new KeyNotFoundException("Todo not found");
            todo.Description = dto.Description;
            todo.DueDate = dto.DueDate;
            todo.IsDone = dto.IsDone;
            await db.SaveChangesAsync();
            return todo;
        }
        public async Task DeleteTodoAsync(Guid id)
        {
            Todo? todo = await db.Todos.FindAsync(id);
            if (todo == null) throw new KeyNotFoundException("Todo not found");
            db.Todos.Remove(todo);
            await db.SaveChangesAsync();
        }
        public async Task<IEnumerable<Todo>> GetFilteredTodosAsync(bool? isDone, DateTime? dueDate, string? text)
        {
            IQueryable<Todo> query = db.Todos.AsQueryable();
            if (isDone.HasValue)
            {
                query = query.Where(t => t.IsDone == isDone.Value);
            }
            if (dueDate.HasValue)
            {
                query = query.Where(t => t.DueDate.HasValue && t.DueDate.Value.Date == dueDate.Value.Date);
            }
            if (!string.IsNullOrWhiteSpace(text))
            {
                query = query.Where(t => EF.Functions.Like(t.Description, $"%{text}%"));
            }
            return await query.ToListAsync();
        }
    }
}
