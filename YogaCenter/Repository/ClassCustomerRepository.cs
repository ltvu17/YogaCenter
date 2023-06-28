using Microsoft.EntityFrameworkCore;
using YogaCenter.IRepository;
using YogaCenter.Models;

namespace YogaCenter.Repository
{
    public class ClassCustomerRepository : IClassCustomerRepository
    {
        private readonly DataContext _context;

        public ClassCustomerRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<bool> ClassExists(Guid id)
        {
            return await _context.ClassCustomers.AnyAsync(p => p.ClassId == id);
        }

        public async Task<bool> CreateClass(ClassCustomer classCustomerCreate)
        {
            await _context.AddAsync(classCustomerCreate);
            return await Save();
        }

        public async Task<bool> CustomerExists(Guid customerId)
        {
            return await _context.ClassCustomers.AnyAsync(p => p.CustomerId == customerId);
        }

        public async Task<bool> DeleteClass(ClassCustomer classCustomerDelete)
        {
            _context.Remove(classCustomerDelete);
            return await Save();
        }

        public async Task<ClassCustomer> GetClassAndCustomerById(Guid classId, Guid customerId)
        {
            return await _context.ClassCustomers.Where(p => p.ClassId == classId && p.CustomerId == customerId).FirstOrDefaultAsync();
        }

        public async Task<ICollection<ClassCustomer>> GetClasseCustomers(Guid classId)
        {
            return await _context.ClassCustomers.Where(p => p.ClassId == classId).Include(p => p.Customer).ToListAsync();
        }

        public async Task<ICollection<ClassCustomer>> GetCustomerClasses(Guid customerId)
        {
            return await _context.ClassCustomers.Where(p => p.CustomerId == customerId)
                .Include(p =>p.Class).ThenInclude(p => p.Course)
                .Include(p => p.Class).ThenInclude(p => p.Teacher)
                .ToListAsync();
        }

        public async Task<bool> Save()
        {
            var save = await _context.SaveChangesAsync();
            return save > 0 ? true : false;
        }
        public async Task<ICollection<Customer>> GetCusByClass(Guid courseId)
        {
            return await _context.ClassCustomers.Where(p=>p.Class.Course.Id == courseId).Include(p=>p.Customer).Select(p => p.Customer).ToListAsync();  
        }
    }
}
