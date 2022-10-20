using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace DomainLayer.Models
{
    public class User
    {

        [Key]
        public long userId { get; set; }
        public string name { get; set; }
        public DateTime birthday { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string role { get; set; }
        public bool verified { get; set; }
        public bool blocked { get; set; }
        public DateTime updateDateTime { get; set; }

    }
}
