using System.ComponentModel.DataAnnotations;
using YogaCenter.Models;

namespace YogaCenter.ModelsDto
{
    public class ClassDto
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public DateTime ClassStartDate { get; set; }
        [Required]
        public DateTime ClassEndDate { get; set; }
    }
}
