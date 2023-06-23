using YogaCenter.Models;

namespace YogaCenter.IRepository
{
    public interface IUserNotificationsRepository
    {
        public Task<UserNotification> GetAll();
    }
}
