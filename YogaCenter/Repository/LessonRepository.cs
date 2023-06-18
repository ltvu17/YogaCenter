using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YogaCenter.IRepository;
using YogaCenter.Models;
using YogaCenter.ModelsDto;

namespace YogaCenter.Repository
{
    public class LessonRepository : ILessonRepository
    {
        private readonly DataContext _context;
       

        public LessonRepository(DataContext context )
        {
            _context = context;
           
        }
        public async Task<bool> CreateLesson(Lesson lesson)
        {
            await _context.AddAsync(lesson);
            return await Save();
        }

        public async Task<bool> DeleteLesson(Lesson lessonDelete)
        {
            _context.Remove(lessonDelete);
            return await Save();
        }

        public async Task<ICollection<Lesson>> GetAllLessons()
        {
            return await _context.Lessons.Include(p =>p.Room).Include(p => p.Shift).Include(p => p.Class).AsNoTracking().ToListAsync();
        }

        public async Task<ICollection<Lesson>> GetLessonByClassId(Guid classId)
        {
            //.Include(p => p.Class).Include(p => p.Shift).Include(p => p.Room)
            return await _context.Lessons.Where(p => p.Class.Id == classId).ToListAsync();
        }

        public async Task<ICollection<Lesson>> GetLessonByDate(DateTime date)
        {
            return await _context.Lessons.Where(p=> p.LessonDate == date).Include(p => p.Room).Include(p => p.Shift).Include(p => p.Class).ToListAsync();
        }

        public async Task<Lesson> GetLessonById(Guid id)
        {
            return await _context.Lessons.Where(p => p.Id == id).Include(p => p.Room).Include(p => p.Shift).Include(p => p.Class).FirstOrDefaultAsync();

        }

        public Task<Lesson> GetLessonByRoomId(Guid roomId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> LessonExists(Guid id)
        {
            return await _context.Lessons.AnyAsync(p => p.Id == id);
        }

        public async Task<bool> Save()
        {
            var save = await _context.SaveChangesAsync();
            return save > 0 ? true : false;
        }

        public async Task<bool> UpdateLesson(Lesson lessonUpdate)
        {
            _context.Update(lessonUpdate);
            return await Save();
        }
    }
}
