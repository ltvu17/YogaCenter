using YogaCenter.Models;

namespace YogaCenter.IRepository
{
    public interface INotificationRepository
    {
        public Task<ICollection<Notification>> GetAll();
        public Task<Notification> Get(Guid id);
        public Task<bool> Create(Notification notification);
        public Task<bool> Delete(Notification notification);
        public Task<bool> Save();
    }
}
