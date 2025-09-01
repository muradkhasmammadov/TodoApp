namespace TodoApp.Base.Entities
{
    public class Todo
    {
        public Guid Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DueDate { get; set; }
        public bool IsDone { get; set; } = false;
    }
}