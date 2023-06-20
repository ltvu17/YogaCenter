using Microsoft.EntityFrameworkCore;
using YogaCenter.IRepository;
using YogaCenter.Models;

namespace YogaCenter.Repository
{
    public class ShiftRepository : IShiftRepository
    {
        private readonly DataContext _context;

        public ShiftRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<bool> CreateShift(Shift shift)
        {
            await _context.AddAsync(shift);
            return await Save();
        }

        public async Task<bool> DeleteShift(Shift shift)
        {
            _context.Remove(shift);
            return await Save();
        }

        public async Task<Shift> GetShiftById(Guid id)
        {
            return await _context.Shifts.Where(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<ICollection<Shift>> GetShifts()
        {
            return await _context.Shifts.OrderBy(p => p.TimeStart).ToListAsync();
        }

        public async Task<bool> Save()
        {
            var save = await _context.SaveChangesAsync();
            return save > 0 ? true : false;
        }

        public async Task<bool> ShiftExists(Guid id)
        {
            return await _context.Shifts.AnyAsync(p => p.Id == id);
        }

        public async Task<bool> UpdateShift(Shift shift)
        {
            _context.Update(shift);
            return await Save();
        }
    }
}
