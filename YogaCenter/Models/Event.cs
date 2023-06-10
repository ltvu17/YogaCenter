using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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
        [JsonIgnore]
        public virtual ICollection<Course> Courses { get; } = new List<Course>();
    }
}
