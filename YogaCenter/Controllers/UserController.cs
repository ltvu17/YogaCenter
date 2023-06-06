using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YogaCenter.IRepository;
using YogaCenter.Models;
using YogaCenter.ModelsDto;

namespace YogaCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly IMapper _mapper;

        public UserController(IUserRepository userRepository,IRoleRepository roleRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _mapper = mapper;
        }
        [HttpGet("GetAllUser")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userRepository.GetAllUsers();
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_mapper.Map<ICollection<UserDto>>(users));
        }
        [HttpGet("Login")]
        public async Task<IActionResult> Login([FromHeader] string userName, [FromHeader] string userPasswork)
        {
            if(userName == null || userPasswork == null) { return NotFound(); }
            var userLogined = await _userRepository.Login(userName, userPasswork);
            if(userLogined == null)
            {
                ModelState.AddModelError("Login error", "Can not loggin");
                return BadRequest(ModelState);
            }
            if(!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }
            return Ok(userLogined);
        }
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserById(Guid userId)
        {
            if (userId.Equals(null)) return NotFound();
            if(!await _userRepository.UserExistsById(userId)) return NotFound("User Id not exists");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _userRepository.GetUserById(userId);
            return Ok(user);
        }
        [HttpPost("{roleName}")]
        public async Task<IActionResult> CreateUser(string roleName, [FromBody] UserDto userDto)
        {
            if(roleName == null || userDto == null) { return BadRequest(); }
            if (await _userRepository.UserExists(userDto.UserName) || await _userRepository.UserExistsById(userDto.Id))
            {
                ModelState.AddModelError("", "User already Exists");
                return BadRequest(ModelState);
            }
            var role = await _roleRepository.GetRoleByName(roleName);
            if(role == null) 
            {
                ModelState.AddModelError("", "Role not exist");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var user = _mapper.Map<User>(userDto);
            user.Role = role;           
            if (await _userRepository.CreateUser(user))
            {
                return Ok("Created");
            }
            return NotFound();
        }
        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUser(Guid userId, UserDto userUpdate)
        {
            if(userId.Equals(null)) { return BadRequest(); }
            if(!await _userRepository.UserExistsById(userId) || !await _userRepository.UserExists(userUpdate.UserName))
            {
                ModelState.AddModelError("", "User is not Exists");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var user = await _userRepository.GetUserById(userId);
            user.UserName = userUpdate.UserName;
            user.UserPasswork = userUpdate.UserPasswork;
            user.Status = userUpdate.Status;
            if(await _userRepository.UpdateUser(user))
            {
                return Ok("Updated");
            }
            return NotFound();

        }
        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(Guid userId)
        {
            if(userId.Equals(null)) { return NotFound(); }
            if(!await _userRepository.UserExistsById(userId))
            {
                ModelState.AddModelError("", "User is not Exists");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);  
            }
            var user = await _userRepository.GetUserById(userId);
            if(await _userRepository.DeleteUser(user))
            {
                return Ok("Deleted");
            }
            return NotFound();
        }

    }
}
