using YogaCenter.Models;

namespace YogaCenter.IRepository
{
    public interface IClassRepository
    {
        public Task<ICollection<Class>> GetClasses();
        public Task<Class> GetClassById(Guid id);
        public Task<bool> CreateClass(Class classCreate);
        public Task<int> GetClassCapacity(Guid id);
        public Task<bool> UpdateClass(Class classUpdate);
        public Task<bool> DeleteClass(Class classDelete);
        public Task<bool> ClassExists(Guid id);
        public Task<Class> GetClassByIdDelete(Guid id);
        public Task<bool> Save();
    }
}
