using System.ComponentModel.DataAnnotations;

namespace YogaCenter.ModelsDto
{
    public class CourseDto
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
    }
}
