using YogaCenter.Models;

namespace YogaCenter.IRepository
{
    public interface ITeacherRepository
    {
        public Task<ICollection<Teacher>> GetAllTeachers();
        public Task<Teacher> GetTeacherById(Guid id);
        public Task<Teacher> GetTeacherByUserId(Guid userId);
        public Task<bool> CreateTeacher(Teacher teacher);
        public Task<bool> UpdateTeacher(Teacher teacherUpdate);
        public Task<bool> DeleteTeacher(Teacher teacherDelete);
        public Task<bool> TeacherExists(Guid id);
        public Task<bool> Save();
    }
}
