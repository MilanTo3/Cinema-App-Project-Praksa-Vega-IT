using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace DomainLayer.Models
{
    public class Genre
    {

        [Key]
        public long genreId { get; set; }
        public string name { get;set; }
        public DateTime updated{get;set;}

    }
}