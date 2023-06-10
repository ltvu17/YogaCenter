using YogaCenter.Models;

namespace YogaCenter.IRepository
{
    public interface ICustomerLessonRepository
    {
        public Task<ICollection<CustomerLesson>> GetAllCustomersLeson();
        public Task<CustomerLesson> GetCustomerAndLessonById(Guid cusid, Guid lesId);
        public Task<ICollection<CustomerLesson>> GetCustomerLessonByCustomerId(Guid customerId);
        public Task<ICollection<CustomerLesson>> GetCustomerLessonByLessonId(Guid lessonId);
        public Task<bool> CreateCustomerLesson(CustomerLesson customerLesson);
        public Task<bool> DeleteCustomerLesson(CustomerLesson customerLessonDelete);
        public Task<bool> LessonExists(Guid id);
        public Task<bool> CustomerExists(Guid customerId);
        public Task<bool> Save();
    }
}
