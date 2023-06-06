using Microsoft.EntityFrameworkCore;
using YogaCenter.IRepository;
using YogaCenter.Models;

namespace YogaCenter.Repository
{
    public class CourseRepository : ICourseRepository
    {
        private readonly DataContext _context;

        public CourseRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<bool> CourseExists(Guid id)
        {
            return await _context.Courses.AnyAsync(p => p.Id == id);
        }

        public async Task<bool> CreateCourse(Course course)
        {
            _context.Courses.Add(course);
            return await Save();
        }

        public async Task<bool> DeleteCourse(Course course)
        {
            _context.Remove(course);
            return await Save();
        }

        public async Task<Course> GetCourseById(Guid id)
        {
            return await _context.Courses.Where(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<ICollection<Course>> GetCourses()
        {
            return await _context.Courses.ToListAsync();
        }

        public async Task<bool> Save()
        {
            var save = await _context.SaveChangesAsync();
            return save > 0 ? true : false;
        }

        public async Task<bool> UpdateCourse(Course course)
        {
            _context.Update(course);
            return await Save();
        }
    }
}
