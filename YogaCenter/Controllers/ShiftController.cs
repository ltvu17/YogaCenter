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
    public class ShiftController : Controller
    {
        private readonly IShiftRepository _shiftRepository;
        private readonly IMapper _mapper;

        public ShiftController(IShiftRepository shiftRepository, IMapper mapper)
        {
            _shiftRepository = shiftRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllShifts()
        {          
            var shifts = await _shiftRepository.GetShifts();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_mapper.Map<ICollection<ShiftDto>>(shifts));
        }
        [HttpPost]
        public async Task<IActionResult> CreateShift([FromBody] ShiftDto shiftDto)
        {
            if (shiftDto == null) { return BadRequest(); }
            if (await _shiftRepository.ShiftExists(shiftDto.Id))
            {
                ModelState.AddModelError("", "Shift Id already existed");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var shift = _mapper.Map<Shift>(shiftDto);
            shift.Id = Guid.NewGuid();
            if (await _shiftRepository.CreateShift(shift))
            {
                return Ok(new { message = "Created" });
            }
            return NotFound();
        }
        [HttpPut("{shiftId}")]
        public async Task<IActionResult> UpdateShift(Guid shiftId,[FromBody] ShiftDto shiftDto)
        {
            if (shiftId.Equals(null)) { return BadRequest(); }
            if (shiftDto == null) { return BadRequest(); }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var shift = await _shiftRepository.GetShiftById(shiftId);
            if (shift == null) { return BadRequest(); }
            shift.TimeStart = shiftDto.TimeStart;
            shift.TimeEnd = shiftDto.TimeEnd;

            if (await _shiftRepository.UpdateShift(shift))
            {
                return Ok(new { message = "Updated" });
            }
            return NotFound();
        }
        [HttpDelete("{shiftId}")]
        public async Task<IActionResult> DeleteShift(Guid shiftId)
        {
            if (shiftId.Equals(null)) { return NotFound(); }
            if (!await _shiftRepository.ShiftExists(shiftId))
            {
                ModelState.AddModelError("", "Shift is not Exists");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var shift = await _shiftRepository.GetShiftById(shiftId);
            if (shift == null) { return BadRequest(); }
            if (await _shiftRepository.DeleteShift(shift))
            {
                return Ok(new {message =  "Deleted" });
            }
            return NotFound();
        }
    }
}
