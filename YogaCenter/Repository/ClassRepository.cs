﻿using Microsoft.EntityFrameworkCore;
using YogaCenter.IRepository;
using YogaCenter.Models;

namespace YogaCenter.Repository
{
    public class ClassRepository : IClassRepository
    {
        private readonly DataContext _context;

        public ClassRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<bool> ClassExists(Guid id)
        {
            return await _context.Classes.AnyAsync(p => p.Id == id);
        }

        public async Task<bool> CreateClass(Class classCreate)
        {
            _context.Classes.Add(classCreate);
            return await Save();
        }

        public async Task<bool> DeleteClass(Class classDelete)
        {
            _context.Classes.Remove(classDelete);
            return await Save();
        }

        public async Task<Class> GetClassById(Guid id)
        {
            return await _context.Classes.Where(p => p.Id == id).Include(p => p.Teacher).Include(p=>p.Course).ThenInclude(p=>p.Event).FirstOrDefaultAsync();
        }

        public async Task<Class> GetClassByIdDelete(Guid id)
        {
            return await _context.Classes.Where(p => p.Id == id).Include(p=>p.Lessons).FirstOrDefaultAsync();
        }

        public async Task<int> GetClassCapacity(Guid id)
        {
            return await _context.ClassCustomers.Where(p=> p.ClassId == id).CountAsync();
        }

        public async Task<ICollection<Class>> GetClasses()
        {
            return await _context.Classes.Include(p => p.Teacher).Include(p => p.Course).ThenInclude(p=>p.Event).OrderByDescending(p => p.ClassStartDate).ToListAsync();
        }

        public async Task<ICollection<Class>> GetClassTeacherId(Guid teacherId)
        {
            return await _context.Classes.Where(p => p.Teacher.User.Id == teacherId).Include(p => p.Teacher).Include(p => p.Course).ToListAsync();
        }

        public async Task<bool> Save()
        {
            var save = await _context.SaveChangesAsync();
            return save > 0 ? true : false;
        }

        public async Task<bool> UpdateClass(Class classUpdate)
        {
            _context.Update(classUpdate);
            return await Save();
        }
    }
}
