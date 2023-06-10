using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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
        [JsonIgnore]
        public virtual ICollection<Lesson> ClassLessons { get; } = new List<Lesson>();
    }
}
