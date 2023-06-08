using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace YogaCenter.Models
{
    public class Course
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string CourseDescription { get; set; }
        [Required]
        public int CourseLectureNumber { get; set; }
        [Required]
        public int CourseLength { get; set; }
        [Required]
        public int CoursePrice { get; set; }
        [Required]
        public string Pre_Requisite { get; set; }
        [Required]
        public string CourseDetail { get; set; }
        [Required]
        public DateTime CourseCreateDate { get; set; }
        public Event? Event { get; set; }
        [JsonIgnore]
        public virtual ICollection<Invoice> Invoices { get; } = new List<Invoice>();    
    }
}
