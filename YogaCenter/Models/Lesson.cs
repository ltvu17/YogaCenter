using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace YogaCenter.Models
{
    public class Lesson
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public DateTime LessonDate { get; set; }
        [Range(0, 2)]
        public int Status { get; set; } = 0;
        public Room? Room { get; set; }
        public Shift? Shift { get; set; }
        public Class? Class { get; set; }
        [JsonIgnore]
        public  ICollection<Customer> Customers { get; } = new List<Customer>();
        [JsonIgnore]
        public  ICollection<CustomerLesson> CustomerLessons { get; } = new List<CustomerLesson>();
    }
}
