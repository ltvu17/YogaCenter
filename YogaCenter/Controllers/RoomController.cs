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
    public class RoomController : Controller
    {
        private readonly IRoomRepository _roomRepository;
        private readonly IMapper _mapper;

        public RoomController(IRoomRepository roomRepository, IMapper mapper)
        {
            _roomRepository = roomRepository;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllRooms()
        {
            var rooms = await _roomRepository.GetRooms();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_mapper.Map<ICollection<RoomDto>>(rooms));
        }
        [HttpPost]
        public async Task<IActionResult> CreateRoom([FromBody] RoomDto roomDto)
        {
            if (roomDto == null) { return BadRequest(); }
            if (await _roomRepository.RoomExists(roomDto.Id))
            {
                ModelState.AddModelError("", "Shift Id already existed");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var room = _mapper.Map<Room>(roomDto);
            room.Id = Guid.NewGuid();
            if (await _roomRepository.CreateRoom(room))
            {
                return Ok("Created");
            }
            return NotFound();
        }
        [HttpPut("{roomId}")]
        public async Task<IActionResult> UpdateRoom(Guid roomId, [FromBody] RoomDto roomDto)
        {
            if (roomId.Equals(null)) { return BadRequest(); }
            if (roomDto == null) { return BadRequest(); }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var room = await _roomRepository.GetRoomById(roomId);
            if (room == null) { return BadRequest(); }
            room.RoomDetail = roomDto.RoomDetail;
            if (await _roomRepository.UpdateRoom(room))
            {
                return Ok("Updated");
            }
            return NotFound();
        }
        [HttpDelete("{roomId}")]
        public async Task<IActionResult> DeleteRoom(Guid roomId)
        {
            if (roomId.Equals(null)) { return NotFound(); }
            if (!await _roomRepository.RoomExists(roomId))
            {
                ModelState.AddModelError("", "Room is not Exists");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var room = await _roomRepository.GetRoomById(roomId);
            if (room == null) { return BadRequest(); }
            if (await _roomRepository.DeleteRoom(room))
            {
                return Ok("Deleted");
            }
            return NotFound();
        }
    }
}
