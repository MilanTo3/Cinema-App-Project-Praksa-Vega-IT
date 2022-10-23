using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public class TokenDto
    {

        public long id { get; set; }
        public string token { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string role { get; set; }
        public string errorMessage { get; set; }

    }
}
