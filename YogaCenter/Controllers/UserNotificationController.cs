using Microsoft.AspNetCore.Mvc;
using YogaCenter.IRepository;
using YogaCenter.Models;

namespace YogaCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserNotificationController : Controller
    {
        private readonly IUserNotificationsRepository _userNotificationsRepository;
        private readonly IUserRepository _userRepository;
        private readonly INotificationRepository _notificationRepository;

        public UserNotificationController(IUserNotificationsRepository userNotificationsRepository,IUserRepository userRepository,
            INotificationRepository notificationRepository)
        {
            _userNotificationsRepository = userNotificationsRepository;
            _userRepository = userRepository;
            _notificationRepository = notificationRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllNotification()
        {
            var notifications = await _userNotificationsRepository.GetAll();
            if(!ModelState.IsValid) { return BadRequest(ModelState); }
            return Ok(notifications);
        }
        [HttpGet("Common")]
        public async Task<IActionResult> GetCommonNotification() 
        {
            var notifications = await _userNotificationsRepository.GetCommomNotifications();
            if(!ModelState.IsValid) { return BadRequest(ModelState); }
            return Ok(notifications);
        }
        [HttpGet("{receiverId}")]
        public async Task<IActionResult> GetUserNotification(Guid receiverId)
        {
            var notifications = await _userNotificationsRepository.GetByReceiverId(receiverId);
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            return Ok(notifications);
        }
        [HttpPost]
        public async Task<IActionResult> CreateSend([FromHeader] Guid senderId, [FromHeader] Guid receiverId, [FromHeader] Guid noteId)
        {
            if(senderId.Equals(Guid.Empty) || noteId.Equals(Guid.Empty)) { return BadRequest(); };
            var sender = await _userRepository.GetUserById(senderId);
            var note = await _notificationRepository.Get(noteId);
            if(sender == null || note ==null) { return BadRequest(); };
            User receiver = null;
            if (!receiverId.Equals(Guid.Empty))
            {
                receiver = await _userRepository.GetUserById(receiverId);
            }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var userNotification = new UserNotification()
            {
                Notification = note,
                Sender = sender,
                Receiver = receiver,
                Daycreate = DateTime.Now,
            };
            if(await _userNotificationsRepository.CreateNotification(userNotification))
            {
                return Ok(new
                {
                    mesage = "created"
                });
            }
            return BadRequest(ModelState);  
        }
        [HttpDelete("{noteId}")]
        public async Task<IActionResult> Delete(Guid noteId, [FromHeader] Guid senderId)
        {
            if(noteId.Equals(Guid.Empty)) { return BadRequest(ModelState); };
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var note = await _userNotificationsRepository.GetByNoteId(noteId, senderId);
            if(await _userNotificationsRepository.DeleteNotification(note))
            {
                return Ok(new
                {
                    message = "Deleted"
                });
            }
            return BadRequest();
        }
    }
}
