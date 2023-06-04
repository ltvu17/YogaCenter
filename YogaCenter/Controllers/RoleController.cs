using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YogaCenter.IRepository;
using YogaCenter.Models;
using YogaCenter.ModelsDto;

namespace YogaCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : Controller
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IMapper _mapper;

        public RoleController(IRoleRepository roleRepository, IMapper mapper)
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
        }
        [HttpGet]
        public  async  Task<IActionResult> GetAllRole()
        {
            var roles = await (_roleRepository.GetRoles());
            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }
            return Ok(_mapper.Map<ICollection<RoleDto>>(roles));
        }
        [HttpGet("{name}")]
        public async Task<IActionResult> GetRoleByName(string name)
        {
            if(name == null) 
            {
                return NotFound();
            }
            var role = await _roleRepository.GetRoleByName(name);
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_mapper.Map<RoleDto>(role));
        }
        [HttpPost("{nameRole}")]
        public async Task<IActionResult> CreateRole(string nameRole)
        {
            if(nameRole == null) return NotFound();
            if(!ModelState.IsValid) { return BadRequest(ModelState); }
            var role = new Role
            {
                Id = Guid.NewGuid(),
                RoleName = nameRole.ToLower().Trim(),
            };
            if (!await _roleRepository.CreateRole(role)) 
            {
                ModelState.AddModelError("","Failed Create");
                return BadRequest(ModelState);
            };
            return Ok("Successfully created");

        }

    }
}
