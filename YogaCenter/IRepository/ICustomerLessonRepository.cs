using YogaCenter.Models;

namespace YogaCenter.IRepository
{
    public interface ICustomerLessonRepository
    {
        public Task<ICollection<CustomerLesson>> GetAllCustomersLeson();
        public Task<CustomerLesson> GetCustomerLessonById(Guid id);
        public Task<CustomerLesson> GetCustomerByUserId(Guid userId);
        public Task<bool> CreateCustomer(CustomerLesson customer);
        public Task<bool> UpdateCustomer(CustomerLesson customerUpdate);
        public Task<bool> DeleteCustomer(CustomerLesson customerDelete);
        public Task<bool> CustomerExists(Guid id);
        public Task<bool> Save();
    }
}
