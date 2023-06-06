using System.ComponentModel.DataAnnotations;

namespace YogaCenter.ModelsDto
{
    public class TeacherDto
    {
        [Key] public Guid Id { get; set; }
        [Required]
        public string TeacherName { get; set; }
        [Required]
        public string TeacherGender { get; set; }
        [Required]
        public string TeacherAddress { get; set; }
        [Required]
        public int TeacherPhone { get; set; }
        [Required]
        public DateTime TeacherStartDate { get; set; } = DateTime.Now;
        public DateTime TeacherEndDate { get; set; } = DateTime.MaxValue;
    }
}
