﻿using AutoMapper;
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
        private readonly ICustomerLessonRepository _customerLessonRepository;
        private readonly ILessonRepository _lessonRepository;
        private readonly IClassRepository _classRepository;

        public ClassCustomerController(IClassCustomerRepository classCustomerRepository, IMapper mapper,
            IClassRepository classRepository, ICustomerRepository customerRepository,
            ICustomerLessonRepository customerLessonRepository,
            ILessonRepository lessonRepository)
        {
            _classCustomerRepository = classCustomerRepository;
            _mapper = mapper;
            _customerRepository = customerRepository;
            _customerLessonRepository = customerLessonRepository;
            _lessonRepository = lessonRepository;
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
            return Ok(customers);
        }
        [HttpGet("course/{courseId}")]
        public async Task<IActionResult> GetCourseCustomer(Guid courseId)
        {
            if (courseId.Equals(Guid.Empty))
            {
                return NotFound();
            }
            var customers = await _classCustomerRepository.GetCusByClass(courseId);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(customers);
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
            return Ok(classes);
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
                return BadRequest("Customer already Exist");
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var lessonsOfClass = await _lessonRepository.GetLessonByClassId(classId);
            foreach (var lesson in lessonsOfClass)
            {
                await _customerLessonRepository.CreateCustomerLesson(new CustomerLesson
                {
                    Customer = await _customerRepository.GetCustomerById(customerId),
                    Lesson = lesson,
                });
            }
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
            var lessonsOfClass = await _lessonRepository.GetLessonByClassId(classId);
            foreach(var lesson in lessonsOfClass)
            {
                var lessCus = await _customerLessonRepository.GetCustomerAndLessonById(customerId, lesson.Id);
                await _customerLessonRepository.DeleteCustomerLesson(lessCus);
            }
            if (await _classCustomerRepository.DeleteClass(classCustomer))
            {
                return Ok("Deleted");
            }
            return NotFound();
        }


    }
}
