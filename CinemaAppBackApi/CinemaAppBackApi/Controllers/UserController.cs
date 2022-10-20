using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RepoLayer;
using ServiceLayer.Contract_Interface;
using ServiceLayer.Implementation;

namespace CinemaAppBackApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        //IUnitofWork unitofwork = new UnitofWork(new AppDbContext);

    }
}
