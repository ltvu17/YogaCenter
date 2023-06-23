using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YogaCenter.IRepository;
using YogaCenter.Models;
using YogaCenter.ModelsDto;

namespace YogaCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : Controller
    {
        private readonly INotificationRepository _notificationRepository;
        private readonly IMapper _mapper;

        public NotificationController(INotificationRepository notificationRepository, IMapper mapper)
        {
            _notificationRepository = notificationRepository;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllNotification()
        {
            var notifications = await _notificationRepository.GetAll();
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }
            return Ok(notifications);
        }
        [HttpPost]
        public async Task<IActionResult> Create(NotificationDto notificationDto)
        {
            if(notificationDto == null) { return BadRequest(); }
            if (!ModelState.IsValid) { return BadRequest(); }
            var notification = _mapper.Map<Notification>(notificationDto);
            notification.Id = Guid.NewGuid();
            if (await _notificationRepository.Create(notification))
            {
                return Ok(
                    new
                    {
                        mesage = "Created"
                    });
            }
            return BadRequest();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (id == Guid.Empty) { return BadRequest(); }
            var notification = await _notificationRepository.Get(id);
            if (notification == null) { return NotFound("Not found"); }
            if (await _notificationRepository.Delete(notification))
            {
                return Ok(
                    new
                    {
                        mesage = "Deleted"
                    });
            }
            return NotFound();
        }
    }
}
