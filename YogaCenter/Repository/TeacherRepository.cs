using Microsoft.EntityFrameworkCore;
using YogaCenter.IRepository;
using YogaCenter.Models;

namespace YogaCenter.Repository
{
    public class TeacherRepository : ITeacherRepository
    {
        private readonly DataContext _context;

        public TeacherRepository(DataContext context) 
        {
            _context = context;
        }

        public async Task<bool> CreateTeacher(Teacher teacher)
        {
            await _context.AddAsync(teacher);
            return await Save();
        }

        public async Task<bool> DeleteTeacher(Teacher teacherDelete)
        {
            _context.Remove(teacherDelete);
            return await Save();
        }

        public async Task<ICollection<Teacher>> GetAllTeachers()
        {
            return await _context.Teachers.Include(p => p.User).ToListAsync();
        }

        public async Task<Teacher> GetTeacherById(Guid id)
        {
            return await _context.Teachers.Where(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Teacher> GetTeacherByUserId(Guid userId)
        {
            return await _context.Teachers.Where(p => p.User.Id == userId).FirstOrDefaultAsync();
        }

        public async Task<bool> Save()
        {
            var save = await _context.SaveChangesAsync();
            return save > 0 ? true : false;
        }

        public async Task<bool> TeacherExists(Guid id)
        {
            return await _context.Teachers.AnyAsync(p => p.Id == id);
        }

        public async Task<bool> UpdateTeacher(Teacher teacherUpdate)
        {
            _context.Update(teacherUpdate);
            return await Save();
        }
    }
}
