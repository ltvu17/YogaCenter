using System.ComponentModel.DataAnnotations;

namespace YogaCenter.ModelsDto
{
    public class NotificationDto
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Detail { get; set; }
        [Required, Range(0, 1)]
        public int Status { get; set; } = 0;
    }

}