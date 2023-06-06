using YogaCenter.Models;

namespace YogaCenter.IRepository
{
    public interface ICourseRepository
    {
        public Task<ICollection<Course>> GetCourses();
        public Task<Course> GetCourseById(Guid id);
        public Task<bool> CreateCourse(Course course);
        public Task<bool> UpdateCourse(Course course);
        public Task<bool> DeleteCourse(Course course);
        public Task<bool> CourseExists(Guid id);

        public Task<bool> Save();
    }
}
