using Microsoft.AspNetCore.Mvc;
using TodoApp.Base.Dtos;
using TodoApp.Base.Interfaces;

namespace TodoApp.Api.Controllers
{
    public class TodoController : Controller
    {
        [ApiController]
        [Route("api/[controller]")]
        public class TodosController : ControllerBase
        {
            private readonly ITodoService _todoService;
            public TodosController(ITodoService todoService)
            {
                _todoService = todoService;
            }
            [HttpGet]
            public async Task<IActionResult> GetTodos()
            {
                var todos = await _todoService.GetTodosAsync();
                return Ok(todos);
            }
            [HttpGet("{id}")]
            public async Task<IActionResult> GetTodoById(Guid id)
            {
                var todo = await _todoService.GetTodoAsync(id);
                if (todo == null) return NotFound();
                return Ok(todo);
            }
            [HttpPost]
            public async Task<IActionResult> Create([FromBody] CreateTodoDto dto)
            {
                var todo = await _todoService.CreateTodoAsync(dto);
                return CreatedAtAction(nameof(GetTodoById), new { id = todo.Id }, todo);
            }
            [HttpPut("{id}")]
            public async Task<IActionResult> Update(Guid id, [FromBody] UpdateTodoDto dto)
            {
                var todo = await _todoService.UpdateTodoAsync(id, dto);
                return Ok(todo);
            }
            [HttpDelete("{id}")]
            public async Task<IActionResult> Delete(Guid id)
            {
                await _todoService.DeleteTodoAsync(id);
                return NoContent();
            }
            [HttpGet("filter")]
            public async Task<IActionResult> GetFilteredTodos([FromQuery] bool? isDone, [FromQuery] DateTime? dueDate, [FromQuery] string? text)
            {
                var todos = await _todoService.GetFilteredTodosAsync(isDone, dueDate, text);
                return Ok(todos);
            }
        }
    }
}
