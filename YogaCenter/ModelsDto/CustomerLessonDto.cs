using System.ComponentModel.DataAnnotations;
using YogaCenter.Models;

namespace YogaCenter.ModelsDto
{
    public class CustomerLessonDto
    {
        public Guid CustomerId { get; set; }
        public Guid LessonId { get; set; }
        [Range(0, 2)]
        public int Attendance { get; set; } = 2;
    }
}
