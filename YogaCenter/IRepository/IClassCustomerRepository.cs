
using YogaCenter.Models;

namespace YogaCenter.IRepository
{
    public interface IClassCustomerRepository 
    {
        public Task<ICollection<ClassCustomer>> GetClasseCustomers(Guid classId);
        public Task<ICollection<ClassCustomer>> GetCustomerClasses(Guid customerId);
        public Task<bool> CreateClass(ClassCustomer classCustomerCreate);
        public Task<ICollection<Customer>> GetCusByClass(Guid courseId);
        public Task<ClassCustomer> GetClassAndCustomerById(Guid classId, Guid customerId);
        public Task<bool> DeleteClass(ClassCustomer classCustomerDelete);
        public Task<bool> ClassExists(Guid id);
        public Task<bool> CustomerExists(Guid customerId);
        public Task<bool> Save();
    }
}
