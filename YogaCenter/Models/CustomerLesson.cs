using System.ComponentModel.DataAnnotations;


namespace YogaCenter.Models
{
    public class CustomerLesson
    {
        public Guid CustomerId { get; set; }
        public Guid LessonId { get; set; }
        public Customer Customer { get; set; }
        public Lesson Lesson { get; set; }
        [Range(0, 2)]
        public int Attendance { get; set; } = 2;
    }
}
