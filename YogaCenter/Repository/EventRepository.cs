using Microsoft.EntityFrameworkCore;
using YogaCenter.IRepository;
using YogaCenter.Models;

namespace YogaCenter.Repository
{
    public class EventRepository : IEventRepository
    {
        private readonly DataContext _context;

        public EventRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<bool> CreateEvent(Models.Event e)
        {
            await _context.AddAsync(e);
            return await Save();
        }

        public async Task<bool> DeleteEvent(Models.Event e)
        {
            _context.Remove(e);
            return await Save();
        }

        public async Task<bool> EventExists(Guid id)
        {
            return await _context.Events.AnyAsync(p => p.Id == id);
        }

        public async Task<Event> GetEventById(Guid id)
        {
            return await _context.Events.Where(p => p.Id == id).Include(p=>p.Courses).FirstOrDefaultAsync();
        }

        public async Task<ICollection<Event>> GetEvents()
        {
            return await _context.Events.OrderBy( p => p.EventStartDate).ToListAsync();
        }

        public async Task<bool> Save()
        {
            var save = await _context.SaveChangesAsync();
            return save > 0 ? true : false;
        }

        public async Task<bool> UpdateEvent(Event e)
        {
            _context.Update(e);
            return await Save();
        }
    }
}
