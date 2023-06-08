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
    public class CustomerController : Controller
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        public CustomerController(ICustomerRepository customerRepository, IMapper mapper, IUserRepository userRepository)
        {
            _customerRepository = customerRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {
            var customers = await _customerRepository.GetAllCustomers();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_mapper.Map<ICollection<CustomerDto>>(customers));
        }
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCustomerByUserId(Guid userId)
        {
            if (userId.Equals(null)) return BadRequest();
            if (!await _userRepository.UserExistsById(userId)) return NotFound();
            if (!((await _userRepository.GetUserById(userId)).Role.RoleName.ToUpper() == "Customer".ToUpper()))
            {
                return NotFound("Not found Customer Account");
            }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var customer = await _customerRepository.GetCustomerByUserId(userId);
            return Ok(_mapper.Map<CustomerDto>(customer));
        }
        [HttpPost("{userId}")]
        public async Task<IActionResult> CreateCustomer(Guid userId, [FromBody] CustomerDto customerDto)
        {
            if (customerDto == null) { return BadRequest(); }
            var user = await _userRepository.GetUserById(userId);
            if (!(user.Role.RoleName.ToUpper() == "Customer".ToUpper()))
            {
                return NotFound("Not found Customer Account");
            }
            if(!(await _customerRepository.GetCustomerByUserId(userId) == null)) return BadRequest("User Id already Exists"); 
            if (await _customerRepository.CustomerExists(customerDto.Id))
            {
                ModelState.AddModelError("", "Customer Id already existed");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var customer = _mapper.Map<Customer>(customerDto);
            customer.Id = Guid.NewGuid();
            customer.User = user;
            if (await _customerRepository.CreateCustomer(customer))
            {
                return Ok("Created");
            }
            return NotFound();
        }
        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateCustomer(Guid userId, CustomerDto customerDto)
        {
            if (userId.Equals(null)) { return BadRequest(); }
            if (!await _userRepository.UserExistsById(userId))
            {
                ModelState.AddModelError("", "User is not Exists");
                return BadRequest(ModelState);
            }
            if (!((await _userRepository.GetUserById(userId)).Role.RoleName.ToUpper() == "Customer".ToUpper()))
            {
                return NotFound("User is not Exists");
            }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var customer = await _customerRepository.GetCustomerByUserId(userId);
            customer.CustomerName = customerDto.CustomerName;
            customer.CustomerGender = customerDto.CustomerGender;
            customer.CustomerAddress = customerDto.CustomerAddress;
            customer.CustomerPhone = customerDto.CustomerPhone; 

            if (await _customerRepository.UpdateCustomer(customer))
            {
                return Ok("Updated");
            }
            return NotFound();
        }
        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteCustomer(Guid userId)
        {
            if (userId.Equals(null)) { return NotFound(); }
            if (!await _userRepository.UserExistsById(userId))
            {
                ModelState.AddModelError("", "User is not Exists");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _userRepository.GetUserById(userId);
            var customer = await _customerRepository.GetCustomerByUserId(userId);
            if(customer == null) { return NotFound("Not found customer"); }
            if (await _customerRepository.DeleteCustomer(customer))
                if (await _userRepository.DeleteUser(user))
                {
                    return Ok("Deleted");
                }
            return NotFound();
        }
    }
}
