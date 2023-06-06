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
        public Task<bool> ClassExists(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> CreateClass(ClassCustomer classCustomerCreate)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteClass(ClassCustomer classCustomerDelete)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<ClassCustomer>> GetClasseCustomers(Guid classId)
        {
            return await _context.ClassCustomers.Where(p => p.ClassId == classId).ToListAsync();
        }

        public Task<bool> Save()
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateClass(ClassCustomer classCustomerUpdate)
        {
            throw new NotImplementedException();
        }
    }
}
