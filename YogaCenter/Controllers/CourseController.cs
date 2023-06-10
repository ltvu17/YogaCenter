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
    public class CourseController : Controller
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IMapper _mapper;

        public CourseController(ICourseRepository courseRepository, IMapper mapper)
        {
            _courseRepository = courseRepository;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllCourses()
        {
            var courses = await _courseRepository.GetCourses();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_mapper.Map<ICollection<CourseDto>>(courses));
        }
        [HttpPost]
        public async Task<IActionResult> CreateCourse([FromBody] CourseDto courseDto)
        {
            if (courseDto == null) { return BadRequest(); }
            if (await _courseRepository.CourseExists(courseDto.Id))
            {
                ModelState.AddModelError("", "Shift Id already existed");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var course = _mapper.Map<Course>(courseDto);
            course.Id = Guid.NewGuid();
            if (await _courseRepository.CreateCourse(course))
            {
                return Ok("Created");
            }
            return NotFound();
        }
        [HttpPut("{courseId}")]
        public async Task<IActionResult> UpdateCourse(Guid courseId, [FromBody] CourseDto courseDto)
        {
            if (courseId.Equals(null)) { return BadRequest(); }
            if (courseDto == null) { return BadRequest(); }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var course = await _courseRepository.GetCourseById(courseId);
            if (course == null) { return BadRequest(); }
            course.CourseLectureNumber = courseDto.CourseLectureNumber;
            course.CourseCreateDate = courseDto.CourseCreateDate;
            course.CourseDescription = courseDto.CourseDescription;
            course.CourseDetail = courseDto.CourseDetail;
            course.CoursePrice = courseDto.CoursePrice;
            course.CourseLength = courseDto.CourseLength;
            course.Pre_Requisite = courseDto.Pre_Requisite;
            if (await _courseRepository.UpdateCourse(course))
            {
                return Ok("Updated");
            }
            return NotFound();
        }
        [HttpDelete("{courseId}")]
        public async Task<IActionResult> DeleteCourse(Guid courseId)
        {
            if (courseId.Equals(null)) { return NotFound(); }
            if (!await _courseRepository.CourseExists(courseId))
            {
                ModelState.AddModelError("", "Room is not Exists");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var room = await _courseRepository.GetCourseById(courseId);
            if (room == null) { return BadRequest(); }
            if (await _courseRepository.DeleteCourse(room))
            {
                return Ok("Deleted");
            }
            return NotFound();
        }
    }
}
