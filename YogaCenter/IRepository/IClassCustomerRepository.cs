
using YogaCenter.Models;

namespace YogaCenter.IRepository
{
    public interface IClassCustomerRepository 
    {
        public Task<ICollection<ClassCustomer>> GetClasseCustomers(Guid classId);
        public Task<bool> CreateClass(ClassCustomer classCustomerCreate);
        public Task<bool> UpdateClass(ClassCustomer classCustomerUpdate);
        public Task<bool> DeleteClass(ClassCustomer classCustomerDelete);
        public Task<bool> ClassExists(Guid id);
        public Task<bool> Save();
    }
}
