using System.ComponentModel.DataAnnotations;

namespace YogaCenter.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string UserPasswork { get; set; }
        [Range(0, 1)]
        public int Status { get; set; } = 1;
        public Role Role { get; set; }
    }
}
