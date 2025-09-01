using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Services;
using TodoApp.Base.Dtos;
using TodoApp.Base.Entities;
using TodoApp.Data;

namespace TodoApp.Tests.Services
{
    public class TodoServiceTests
    {
        private TodoDbContext GetDbContext()
        {
            DbContextOptions<TodoDbContext> options = new DbContextOptionsBuilder<TodoDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            TodoDbContext context = new TodoDbContext(options);
            context.Todos.AddRange(new List<Todo>
            {
                new Todo { Description = "Do the dishes", IsDone = false, DueDate = DateTime.UtcNow.AddDays(1) },
                new Todo { Description = "Hit the gym", IsDone = true, DueDate = DateTime.UtcNow.AddDays(2) },
                new Todo { Description = "Go shopping", IsDone = false, DueDate = DateTime.UtcNow.AddDays(3) }
            });
            context.SaveChanges();
            return context;
        }

        [Fact]
        public async Task GetTodosAsync_ReturnsAllTodos()
        {
            TodoDbContext context = GetDbContext();
            TodoService service = new TodoService(context);

            IEnumerable<Todo> result = await service.GetTodosAsync();

            Assert.Equal(3, result.Count());
        }

        [Fact]
        public async Task GetTodoAsync_ReturnsCorrectTodo()
        {
            TodoDbContext context = GetDbContext();
            TodoService service = new TodoService(context);
            Todo existingTodo = context.Todos.First();

            Todo result = await service.GetTodoAsync(existingTodo.Id);

            Assert.NotNull(result);
            Assert.Equal(existingTodo.Description, result.Description);
        }

        [Fact]
        public async Task CreateTodoAsync_AddsTodo()
        {
            TodoDbContext context = GetDbContext();
            TodoService service = new TodoService(context);
            CreateTodoDto dto = new CreateTodoDto { Description = "New Todo", DueDate = DateTime.UtcNow.AddDays(5) };

            Todo result = await service.CreateTodoAsync(dto);

            Assert.NotNull(result);
            Assert.Equal(dto.Description, result.Description);
            Assert.Equal(4, context.Todos.Count());
        }

        [Fact]
        public async Task UpdateTodoAsync_UpdatesTodo()
        {
            TodoDbContext context = GetDbContext();
            TodoService service = new TodoService(context);
            Todo existingTodo = context.Todos.First();
            UpdateTodoDto dto = new UpdateTodoDto { Description = "Updated Description", DueDate = DateTime.UtcNow.AddDays(10), IsDone = true };

            Todo result = await service.UpdateTodoAsync(existingTodo.Id, dto);

            Assert.NotNull(result);
            Assert.Equal(dto.Description, result.Description);
            Assert.True(result.IsDone);
        }

        [Fact]
        public async Task UpdateTodoAsync_Throws_WhenTodoNotFound()
        {
            TodoDbContext context = GetDbContext();
            TodoService service = new TodoService(context);
            Guid nonExistentId = Guid.NewGuid();
            UpdateTodoDto dto = new UpdateTodoDto { Description = "Test Description 123", DueDate = DateTime.UtcNow, IsDone = false };

            await Assert.ThrowsAsync<KeyNotFoundException>(() => service.UpdateTodoAsync(nonExistentId, dto));
        }

        [Fact]
        public async Task DeleteTodoAsync_RemovesTodo()
        {
            TodoDbContext context = GetDbContext();
            TodoService service = new TodoService(context);
            Todo existingTodo = context.Todos.First();

            await service.DeleteTodoAsync(existingTodo.Id);

            Assert.Equal(2, context.Todos.Count());
            Assert.Null(await context.Todos.FindAsync(existingTodo.Id));
        }

        [Fact]
        public async Task DeleteTodoAsync_Throws_WhenTodoNotFound()
        {
            TodoDbContext context = GetDbContext();
            TodoService service = new TodoService(context);
            Guid nonExistentId = Guid.NewGuid();

            await Assert.ThrowsAsync<KeyNotFoundException>(() => service.DeleteTodoAsync(nonExistentId));
        }

        [Fact]
        public async Task GetFilteredTodosAsync_FiltersByIsDone()
        {
            TodoDbContext context = GetDbContext();
            TodoService service = new TodoService(context);

            IEnumerable<Todo> result = await service.GetFilteredTodosAsync(false, null, null);

            Assert.Equal(2, result.Count());
            Assert.All(result, t => Assert.False(t.IsDone));
        }

        [Fact]
        public async Task GetFilteredTodosAsync_FiltersByText()
        {
            TodoDbContext context = GetDbContext();
            TodoService service = new TodoService(context);

            IEnumerable<Todo> result = await service.GetFilteredTodosAsync(null, null, "dishes");

            Assert.Single(result);
            Assert.Contains("dishes", result.First().Description);
        }

        [Fact]
        public async Task GetFilteredTodosAsync_FiltersByDueDate()
        {
            TodoDbContext context = GetDbContext();
            TodoService service = new TodoService(context);
            DateTime dueDate = DateTime.UtcNow.AddDays(1).Date;

            IEnumerable<Todo> result = await service.GetFilteredTodosAsync(null, dueDate, null);

            Assert.Single(result);
            Assert.Equal("Do the dishes", result.First().Description);
        }
    }
}