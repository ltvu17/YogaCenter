using Microsoft.EntityFrameworkCore;
using YogaCenter.IRepository;
using YogaCenter.Models;

namespace YogaCenter.Repository
{
    public class RoomRepository : IRoomRepository
    {
        private readonly DataContext _context;

        public RoomRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<bool> CreateRoom(Room room)
        {
            await _context.AddAsync(room);
            return await Save();
        }

        public async Task<bool> DeleteRoom(Room room)
        {
            _context.Remove(room);
            return await Save();
        }

        public async Task<Room> GetRoomById(Guid id)
        {
            return await _context.Rooms.Where(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<ICollection<Room>> GetRooms()
        {
            return await _context.Rooms.ToListAsync();
        }

        public async Task<bool> RoomExists(Guid id)
        {
            return await _context.Rooms.AnyAsync(p => p.Id == id);
        }

        public async Task<bool> Save()
        {
            var save = await _context.SaveChangesAsync();
            return save > 0 ? true : false;
        }

        public async Task<bool> UpdateRoom(Room room)
        {
            _context.Update(room);
            return await Save();
        }
    }
}
