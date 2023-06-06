using YogaCenter.Models;

namespace YogaCenter.IRepository
{
    public interface IRoomRepository
    {
        public Task<ICollection<Room>> GetRooms();
        public Task<Room> GetRoomById(Guid id);
        public Task<bool> CreateRoom(Room room);
        public Task<bool> UpdateRoom(Room room);
        public Task<bool> DeleteRoom(Room room);
        public Task<bool> RoomExists(Guid id);
        public Task<bool> Save();
    }
}
