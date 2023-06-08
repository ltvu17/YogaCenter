using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YogaCenter.IRepository;
using YogaCenter.Models;
using YogaCenter.ModelsDto;
using YogaCenter.Repository;

namespace YogaCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassCustomerController : Controller
    {
        private readonly IClassCustomerRepository _classCustomerRepository;
        private readonly IMapper _mapper;
        private readonly ICustomerRepository _customerRepository;
        private readonly IClassRepository _classRepository;

        public ClassCustomerController(IClassCustomerRepository classCustomerRepository, IMapper mapper,
            IClassRepository classRepository, ICustomerRepository customerRepository)
        {
            _classCustomerRepository = classCustomerRepository;
            _mapper = mapper;
            _customerRepository = customerRepository;
            _classRepository = classRepository;
        }
        [HttpGet("{classId}")]
        public async Task<IActionResult> GetClassCustomers(Guid classId)
        {
            if( !await _classCustomerRepository.ClassExists(classId)) { return NotFound("Class is not exist"); }
            var customers = await _classCustomerRepository.GetClasseCustomers(classId);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_mapper.Map<ICollection<ClassCustomerDto>>(customers));
        }
        [HttpGet("getCustomer/{customerId}")]
        public async Task<IActionResult> GetCustomerClasses(Guid customerId)
        {
            if (!await _classCustomerRepository.CustomerExists(customerId)) { return NotFound("Customer is not exist"); }
            var classes = await _classCustomerRepository.GetCustomerClasses(customerId);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_mapper.Map<ICollection<ClassCustomerDto>>(classes));
        }
        [HttpPost("{classId}")]
        public async Task<IActionResult> CreateClass(Guid classId, [FromHeader] Guid customerId)
        {
            if (classId.Equals(Guid.Empty) || customerId.Equals(Guid.Empty)) { return BadRequest(); }
            if (!await _classRepository.ClassExists(classId))
            {
                ModelState.AddModelError("", "Class is not exists");
                return BadRequest(ModelState);
            }
            if (!await _customerRepository.CustomerExists(customerId)) return BadRequest("Customer is not exists");
            if (await _classCustomerRepository.GetClassAndCustomerById(classId: classId, customerId: customerId) != null)
                return BadRequest("Already Exist");
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
           
            var classs = await _classRepository.GetClassByIdDelete(classId);
            var customer = await _customerRepository.GetCustomerById(customerId);
            var classCustomer = new ClassCustomer()
            {
                Class = classs,
                Customer = customer
            };
            if (await _classCustomerRepository.CreateClass(classCustomer))
            {
                return Ok("Created");
            }
            return NotFound();
        }
        [HttpDelete("{classId}")]
        public async Task<IActionResult> DeleteClassCustomer(Guid classId, [FromHeader] Guid customerId)
        {
            if (classId.Equals(Guid.Empty) || customerId.Equals(Guid.Empty)) { return NotFound(); }
            var classCustomer = await _classCustomerRepository.GetClassAndCustomerById(classId: classId, customerId: customerId);
            if (classCustomer == null)
            {
                ModelState.AddModelError("", "Class is not Exists");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }           
            if (await _classCustomerRepository.DeleteClass(classCustomer))
            {
                return Ok("Deleted");
            }
            return NotFound();
        }


    }
}
