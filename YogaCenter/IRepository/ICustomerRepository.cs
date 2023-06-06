using YogaCenter.Models;

namespace YogaCenter.IRepository
{
    public interface ICustomerRepository
    {
        public Task<ICollection<Customer>> GetAllCustomers();
        public Task<Customer> GetCustomerById(Guid id);
        public Task<Customer> GetCustomerByUserId(Guid userId);
        public Task<bool> CreateCustomer(Customer customer);
        public Task<bool> UpdateCustomer(Customer customerUpdate);
        public Task<bool> DeleteCustomer(Customer customerDelete);
        public Task<bool> CustomerExists(Guid id);
        public Task<bool> Save();
    }
}
