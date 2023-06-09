using YogaCenter.Models;

namespace YogaCenter.IRepository
{
    public interface IEventRepository
    {
        public Task<ICollection<Event>> GetEvents();
        public Task<Event> GetEventById(Guid id);
        public Task<bool> CreateEvent(Event e);
        public Task<bool> UpdateEvent(Event e);
        public Task<bool> DeleteEvent(Event e);
        public Task<bool> EventExists(Guid id);
        public Task<bool> Save();

    }
}
