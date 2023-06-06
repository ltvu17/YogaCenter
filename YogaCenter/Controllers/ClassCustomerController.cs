using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YogaCenter.IRepository;

namespace YogaCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassCustomerController : Controller
    {
        private readonly IClassCustomerRepository _classCustomerRepository;
        private readonly IMapper _mapper;

        public ClassCustomerController(IClassCustomerRepository classCustomerRepository, IMapper mapper)
        {
            _classCustomerRepository = classCustomerRepository;
            _mapper = mapper;
        }
        [HttpGet("{classId}")]
        public async Task<IActionResult> GetClassCustomers(Guid classId)
        {
            var customers = await _classCustomerRepository.GetClasseCustomers(classId);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(customers);
        }
    }
}
