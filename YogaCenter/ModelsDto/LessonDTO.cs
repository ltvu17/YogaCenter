using System.ComponentModel.DataAnnotations;

namespace YogaCenter.ModelsDto
{
    public class LessonDTO
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public DateTime LessonDate { get; set; }
        [Range(0, 2)]
        public int Status { get; set; } = 0;

    }
}
