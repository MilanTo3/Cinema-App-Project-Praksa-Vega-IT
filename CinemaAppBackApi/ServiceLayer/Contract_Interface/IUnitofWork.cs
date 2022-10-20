using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Contract_Interface
{
    public interface IUnitofWork: IDisposable
    {

        IUserRepository users { get; }
        int Complete(); // za transkacije.

    }
}
