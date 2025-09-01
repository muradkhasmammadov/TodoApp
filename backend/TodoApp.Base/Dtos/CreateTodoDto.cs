using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoApp.Base.Dtos
{
    public class CreateTodoDto
    {
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
    }
}
