using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace YogaCenter.Models
{
    public class Room
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string RoomDetail { get; set; }
        [JsonIgnore]
        public virtual ICollection<Lesson> ClassLessons { get; }
    }
}
