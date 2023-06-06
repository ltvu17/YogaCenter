using System.ComponentModel.DataAnnotations;

namespace YogaCenter.ModelsDto
{
    public class ShiftDto
    {

        [Key]
        public Guid Id { get; set; }
        [Required]
        public DateTime TimeStart { get; set; }
        [Required]
        public DateTime TimeEnd { get; set; }
    }
}
