using DomainLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Contract_Interface
{
    public interface IUserRepository: IRepository<User>
    {

        public void approveUser(long id);
        public void blockUser(long id);

    }
}
