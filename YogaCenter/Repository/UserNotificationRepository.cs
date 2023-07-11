using Microsoft.EntityFrameworkCore;
using YogaCenter.IRepository;
using YogaCenter.Models;

namespace YogaCenter.Repository
{
    public class UserNotificationRepository : IUserNotificationsRepository
    {
        private readonly DataContext _context;

        public UserNotificationRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<bool> CreateNotification(UserNotification notification)
        {
            await _context.AddAsync(notification);
            return await Save();
        }

        public async Task<bool> DeleteNotification(ICollection<UserNotification> notifications)
        {
            _context.RemoveRange(notifications);
            return await Save();
        }

        public async Task<ICollection<UserNotification>> GetAll()
        {
            return await _context.UserNotifications.OrderBy(p => p.Daycreate).Include(p =>p.Notification).ToListAsync();
        }

        public async Task<ICollection<UserNotification>> GetByNoteId(Guid noteId, Guid senderId)
        {
            return await _context.UserNotifications.Where(p=>p.NotificationId==noteId && p.SenderId==senderId).ToListAsync();
        }

        public async Task<ICollection<UserNotification>> GetByReceiverId(Guid id)
        {
            return await _context.UserNotifications.Where(p => p.ReceiverId == id).Include(p => p.Notification).OrderByDescending(p => p.Daycreate).ToListAsync();
        }

        public async Task<ICollection<UserNotification>> GetBySender(Guid id)
        {
            return await _context.UserNotifications.Where(p => p.SenderId == id).Include(p => p.Notification).OrderByDescending(p => p.Daycreate).ToListAsync();
        }

        public async Task<ICollection<UserNotification>> GetCommomNotifications()
        {
            return await _context.UserNotifications.Where(p=> p.ReceiverId == null).Include(p => p.Notification).OrderByDescending(p => p.Daycreate).ToListAsync();
        }
        public async Task<bool> Save()
        {
            var save = await _context.SaveChangesAsync();
            return save > 0 ? true : false;
        }
    }
}
