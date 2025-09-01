using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoApp.Base.Dtos
{
    public class UpdateTodoDto
    {
        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;
        public bool IsDone { get; set; }
        public DateTime DueDate { get; set; }
    }
}
