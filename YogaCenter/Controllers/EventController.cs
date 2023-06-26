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
    public class EventController : Controller
    {
        private readonly IEventRepository _eventRepository;
        private readonly IMapper _mapper;

        public EventController(IEventRepository eventRepository, IMapper mapper)
        {
            _eventRepository = eventRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEvent()
        {
            var e = await _eventRepository.GetEvents();
            if (e == null) return BadRequest("Null");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_mapper.Map<ICollection<EventDto>>(e));
        }
        [HttpGet("{eventId}")]
        public async Task<IActionResult> GetEvent(Guid eventId)
        {
            var e = await _eventRepository.GetEventById(eventId);
            if (e == null) return BadRequest("Null");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(e);
        }
        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody] EventDto eventDto)
        {
            if (eventDto == null) { return BadRequest(); }
            if (await _eventRepository.EventExists(eventDto.Id))
            {
                ModelState.AddModelError("", "Event Id already existed");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var e = _mapper.Map<Event>(eventDto);
            e.Id = Guid.NewGuid();
            if (await _eventRepository.CreateEvent(e))
            {
                return Ok(new {message = "Created"});
            }
            return NotFound();
        }


        [HttpPut("{eventId}")]
        public async Task<IActionResult> UpdateEvent(Guid eventId, [FromBody] EventDto eventDto)
        {
            if (eventId.Equals(null)) { return BadRequest(); }
            if (eventDto == null) { return BadRequest(); }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var e = await _eventRepository.GetEventById(eventId);
            if (e == null) { return BadRequest(); }
            e.EventName = eventDto.EventName;
            e.EventDetail = eventDto.EventDetail;
            e.EventStartDate = e.EventStartDate;
            e.EventEndDate = e.EventEndDate;
            e.EventDiscount = e.EventDiscount;
            if (await _eventRepository.UpdateEvent(e))
            {
                return Ok(new {message = "Updated" });
            }
            return NotFound();
        }
        [HttpDelete("{eventId}")]
        public async Task<IActionResult> DeleteEvent(Guid eventId)
        {
            if (eventId.Equals(null)) { return NotFound(); }
            if (!await _eventRepository.EventExists(eventId))
            {
                ModelState.AddModelError("", "Event is not Exists");
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var e = await _eventRepository.GetEventById(eventId);
            if (e == null) { return BadRequest(); }
            if (await _eventRepository.DeleteEvent(e))
            {
                return Ok(new { message = "Deleted" });
            }
            return NotFound();
        }
    }
}
