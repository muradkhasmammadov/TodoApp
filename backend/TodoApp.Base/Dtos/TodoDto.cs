using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoApp.Base.Dtos
{
    public class TodoDto
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public bool IsDone { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? DueDate { get; set; }
    }
}
