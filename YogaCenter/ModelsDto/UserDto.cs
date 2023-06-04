using System.ComponentModel.DataAnnotations;

namespace YogaCenter.ModelsDto
{
    public class UserDto
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required]
        public string UserName { get; set; }
        [Required]
        public string UserPasswork { get; set; }
        [Range(0, 1)]
        public int Status { get; set; } = 1;
    }
}
