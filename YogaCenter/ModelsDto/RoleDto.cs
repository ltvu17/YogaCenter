using System.ComponentModel.DataAnnotations;

namespace YogaCenter.ModelsDto
{
    public class RoleDto
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string RoleName { get; set; }
    }
}
