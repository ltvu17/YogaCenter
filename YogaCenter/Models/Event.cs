using System.ComponentModel.DataAnnotations;


namespace YogaCenter.Models
{
    public class Event
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string EventName { get; set; }
        [Required]
        public string EventDetail { get; set; }
        [Required]
        public DateTime EventStartDate { get; set; }
        [Required]
        public DateTime EventEndDate { get; set; }
        [Required]
        public float EventDiscount { get; set; }
        public ICollection<Course> Courses { get; } = new List<Course>();
    }
}
