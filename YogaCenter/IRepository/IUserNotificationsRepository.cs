using YogaCenter.Models;

namespace YogaCenter.IRepository
{
    public interface IUserNotificationsRepository
    {
        public Task<ICollection<UserNotification>> GetAll();
        public Task<ICollection<UserNotification>> GetByReceiverId(Guid id);
        public Task<ICollection<UserNotification>> GetByNoteId(Guid noteId,Guid senderId);
        public Task<ICollection<UserNotification>> GetCommomNotifications();
        public Task<bool> CreateNotification(UserNotification notification);
        public Task<bool> DeleteNotification(ICollection<UserNotification> notifications);
        public Task<bool> Save();
    }
}
