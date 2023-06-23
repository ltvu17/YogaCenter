using Microsoft.EntityFrameworkCore;
using YogaCenter.IRepository;
using YogaCenter.Models;

namespace YogaCenter.Repository
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly DataContext _context;

        public NotificationRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> Create(Notification notification)
        {
            await _context.AddAsync(notification);
            return await Save();
        }

        public async Task<bool> Delete(Notification notification)
        {
            _context.Remove(notification);
            return await Save();
        }

        public async Task<Notification> Get(Guid id)
        {
            return await _context.Notifications.Where(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<ICollection<Notification>> GetAll()
        {
            return await _context.Notifications.OrderBy(p => p.Status).ToListAsync();
        }

        public async Task<bool> Save()
        {
            var save = await _context.SaveChangesAsync();
            return save >0?true:false;
        }
    }
}
