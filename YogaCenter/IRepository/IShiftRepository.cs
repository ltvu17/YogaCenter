using YogaCenter.Models;

namespace YogaCenter.IRepository
{
    public interface IShiftRepository
    {
        public Task<ICollection<Shift>> GetShifts();
        public Task<Shift> GetShiftById(Guid id);
        public Task<bool> CreateShift(Shift shift);
        public Task<bool> UpdateShift(Shift shift);
        public Task<bool> DeleteShift(Shift shift);
        public Task<bool> ShiftExists(Guid id);

        public Task<bool> Save();
    }
}
