using System.ComponentModel.DataAnnotations;


namespace YogaCenter.Models
{
    public class Shift
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public DateTime TimeStart { get; set; }
        [Required]
        public DateTime TimeEnd { get; set; }
        public ICollection<Lesson> ClassLessons { get; } = new List<Lesson>();
    }
}
