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
    public class TeacherController : Controller
    {
        private readonly ITeacherRepository _teacherRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public TeacherController(ITeacherRepository teacherRepository,IUserRepository userRepository, IMapper mapper)
        {
            _teacherRepository = teacherRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllTeachers()
        {
            var teachers = await _teacherRepository.GetAllTeachers();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_mapper.Map<ICollection<TeacherDto>>(teachers));
        }
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetTeacherByUserId(Guid userId)
        {
            if (userId.Equals(null)) return BadRequest();
            if (!await _userRepository.UserExistsById(userId)) return NotFound();
            if (!((await _userRepository.GetUserById(userId)).Role.RoleName.ToUpper() == "Teacher".ToUpper()))
            {
                return NotFound();
            }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var teacher = await _teacherRepository.GetTeacherByUserId(userId);
            return Ok(_mapper.Map<TeacherDto>(teacher));

        }
        [HttpPost("{userId}")]
        public async Task<IActionResult> CreateTeacher(Guid userId,[FromBody] TeacherDto teacherDto)
        {
            if (teacherDto == null) { return BadRequest(); }
            var user = await _userRepository.GetUserById(userId);
            if (!(user.Role.RoleName.ToUpper() == "Teacher".ToUpper())) 
            {
                return NotFound();
            }
            if (!(await _teacherRepository.GetTeacherByUserId(userId) == null)) return BadRequest("User Id already Exists");
            if (await _teacherRepository.TeacherExists(teacherDto.Id))
            {
                ModelState.AddModelError("", "Teacher Id already existed");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var teacher = _mapper.Map<Teacher>(teacherDto);
            teacher.Id = Guid.NewGuid();
            teacher.User = user;
            if (await _teacherRepository.CreateTeacher(teacher))
            {
                return Ok("Created");
            }
            return NotFound();
        }
        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateTeacher(Guid userId, TeacherDto teacherDto)
        {
            if (userId.Equals(null)) { return BadRequest(); }
            if (!await _userRepository.UserExistsById(userId))
            {
                ModelState.AddModelError("", "User is not Exists");
                return BadRequest(ModelState);
            }
            if (!((await _userRepository.GetUserById(userId)).Role.RoleName.ToUpper() == "Teacher".ToUpper()))
            {
                return NotFound();
            }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var teacher = await _teacherRepository.GetTeacherByUserId(userId);
            teacher.TeacherName = teacherDto.TeacherName;
            teacher.TeacherAddress = teacherDto.TeacherAddress;
            teacher.TeacherPhone = teacherDto.TeacherPhone;
            teacher.TeacherGender = teacherDto.TeacherGender;
            teacher.TeacherEndDate = teacherDto.TeacherEndDate;
            teacher.TeacherStartDate = teacherDto.TeacherStartDate;
            if (await _teacherRepository.UpdateTeacher(teacher))
            {
                return Ok("Updated");
            }
            return NotFound();

        }
        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteTeacher(Guid userId)
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
            var teacher = await _teacherRepository.GetTeacherByUserId(userId);
            if(teacher == null) { return NotFound("Not found teacher"); }
            if(await _teacherRepository.DeleteTeacher(teacher))
            if (await _userRepository.DeleteUser(user))
            {
                return Ok("Deleted");
            }
            return NotFound();
        }
    }
}
