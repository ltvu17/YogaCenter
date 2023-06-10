using YogaCenter.Models;

namespace YogaCenter.IRepository
{
    public interface ILessonRepository
    {

        public Task<ICollection<Lesson>> GetAllLessons();
        public Task<Lesson> GetLessonById(Guid id);
        public Task<ICollection<Lesson>> GetLessonByClassId(Guid classId);
        public Task<Lesson> GetLessonByRoomId(Guid roomId);
        public Task<bool> CreateLesson(Lesson lesson);
        public Task<bool> UpdateLesson(Lesson lessonUpdate);
        public Task<bool> DeleteLesson(Lesson lessonDelete);
        public Task<bool> LessonExists(Guid id);
        public Task<bool> Save();

    }
}
