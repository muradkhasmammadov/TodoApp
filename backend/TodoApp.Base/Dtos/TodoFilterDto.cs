using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoApp.Base.Dtos
{
    public class TodoFilterDto
    {
        public bool? IsDone { get; set; }
        public DateTime? DueDate { get; set; }
        public string? SearchText { get; set; }

    }
}
