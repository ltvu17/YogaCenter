using System.ComponentModel.DataAnnotations;

namespace YogaCenter.ModelsDto
{
    public class RoomDto
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string RoomDetail { get; set; }
    }
}
