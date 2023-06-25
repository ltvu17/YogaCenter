using Microsoft.EntityFrameworkCore;
using YogaCenter.IRepository;
using YogaCenter.Models;

namespace YogaCenter.Repository
{
    public class CustomerLessonRepository : ICustomerLessonRepository
    {
        private readonly DataContext _context;

        public CustomerLessonRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<bool> CreateCustomerLesson(CustomerLesson customerLesson)
        {
            await _context.AddAsync(customerLesson);
            return await Save();
        }

        public async Task<bool> CustomerExists(Guid customerId)
        {
            return await _context.CustomerLessons.AnyAsync(p => p.CustomerId == customerId);
        }

        public async Task<bool> DeleteCustomerLesson(CustomerLesson customerLessonDelete)
        {
            _context.Remove(customerLessonDelete);
            return await Save();
        }

        public Task<ICollection<CustomerLesson>> GetAllCustomersLeson()
        {
            throw new NotImplementedException();
        }

        public async Task<CustomerLesson> GetCustomerAndLessonById(Guid cusid, Guid lesId)
        {
            return await _context.CustomerLessons.Where(p => p.LessonId == lesId && p.CustomerId == cusid).FirstOrDefaultAsync();
        }

        public async Task<ICollection<CustomerLesson>> GetCustomerLessonByCustomerId(Guid customerId)
        {
            return await _context.CustomerLessons
                .Where(p => p.CustomerId == customerId)
                .Include(p => p.Lesson).ThenInclude(p => p.Room)
                .Include(p => p.Lesson).ThenInclude(p => p.Shift)
                .Include(p => p.Lesson).ThenInclude(p => p.Class).ThenInclude(p=>p.Course)
                .ToListAsync();
        }

        public async Task<ICollection<CustomerLesson>> GetCustomerLessonByLessonId(Guid lessonId)
        {
            return await _context.CustomerLessons.Where(p => p.LessonId == lessonId).Include(p => p.Customer).ToListAsync();
        }

        public async Task<bool> LessonExists(Guid id)
        {
            return await _context.CustomerLessons.AnyAsync(p => p.LessonId == id);
        }

        public async Task<bool> Save()
        {
            var save = await _context.SaveChangesAsync();
            return save > 0 ? true : false;
        }
    }
}
