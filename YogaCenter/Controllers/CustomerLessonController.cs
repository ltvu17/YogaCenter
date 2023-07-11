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
    public class CustomerLessonController : Controller
    {
        private readonly ICustomerLessonRepository _customerLessonRepository;
        private readonly IMapper _mapper;
        private readonly ILessonRepository _lessonRepository;
        private readonly ICustomerRepository _customerRepository;

        public CustomerLessonController(ICustomerLessonRepository customerLessonRepository, IMapper mapper, ILessonRepository lessonRepository, ICustomerRepository customerRepository )
        {
            _customerLessonRepository = customerLessonRepository;
            _mapper = mapper;
            _lessonRepository = lessonRepository;
            _customerRepository = customerRepository;
        }

        [HttpGet("getCusLessonByLessonId{lessonId}")]
        public async Task<IActionResult> GetCusLessonByLessonId(Guid lessonId)
        {
            if (!await _customerLessonRepository.LessonExists(lessonId)) { return NotFound("Lesson is not exist"); }
            var cusLesson = await _customerLessonRepository.GetCustomerLessonByLessonId(lessonId);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(cusLesson);
        }

        [HttpGet("getCusLessonByCusId/{cusId}")]
        public async Task<IActionResult> GetCusLessonByCusId(Guid cusId)
        {
            if (!await _customerLessonRepository.CustomerExists(cusId)) { return NotFound("Customer is not exist"); }
            var cusLesson = await _customerLessonRepository.GetCustomerLessonByCustomerId(cusId);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(cusLesson);
        }
        [HttpPost("{lessonId}/{customerId}")]
        public async Task<IActionResult> CreateCustomerLesson(Guid lessonId, Guid customerId)
        {
            if (lessonId.Equals(Guid.Empty) || customerId.Equals(Guid.Empty)) { return BadRequest(); }
            if (!await _lessonRepository.LessonExists(lessonId))
            {
                ModelState.AddModelError("", "Lesson is not exists");
                return BadRequest(ModelState);
            }
            if (!await _customerRepository.CustomerExists(customerId))
            {
                ModelState.AddModelError("", "Customer is not exists");
                return BadRequest(ModelState);
            }
            if (await _customerLessonRepository.GetCustomerAndLessonById(customerId, lessonId) != null)
                return BadRequest("Already Exist");
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var lesson = await _lessonRepository.GetLessonById(lessonId);
            var customer = await _customerRepository.GetCustomerById(customerId);
            var customerLesson = new CustomerLesson()
            {
                Lesson = lesson,
                Customer = customer,
                Attendance = 2
            };
            if (await _customerLessonRepository.CreateCustomerLesson(customerLesson))
            {
                return Ok("Created");
            }
            return NotFound();
        }
        [HttpPut("{lessonId}/{customerId}")]
        public async Task<IActionResult> UpdateCourse(Guid lessonId, Guid customerId, [FromBody] CustomerLessonDto customerLessonDto)
        {
            if (customerId.Equals(null)) { return BadRequest(); }
            if (customerLessonDto == null) { return BadRequest(); }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var cusLesson = await _customerLessonRepository.GetCustomerAndLessonById(customerId, lessonId);
            if (cusLesson == null) { return BadRequest(); }
            cusLesson.Attendance = customerLessonDto.Attendance;
            if (await _customerLessonRepository.UpdateCustomerLesson(cusLesson))
            {
                return Ok("Updated");
            }
            return NotFound();
        }
        [HttpDelete("{lessonId}/{customerId}")]
        public async Task<IActionResult> DeleteCustomerLesson(Guid lessonId, Guid customerId)
        {
            if (lessonId.Equals(Guid.Empty) || customerId.Equals(Guid.Empty)) { return NotFound(); }
            var customerLesson = await _customerLessonRepository.GetCustomerAndLessonById(cusid: customerId, lesId: lessonId);
            if (customerLesson == null)
            {
                ModelState.AddModelError("", "CustomerLesson is not Exists");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (await _customerLessonRepository.DeleteCustomerLesson(customerLesson))
            {
                return Ok("Deleted");
            }
            return NotFound();
        }

    }
}
