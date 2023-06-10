using System.ComponentModel.DataAnnotations;

namespace YogaCenter.ModelsDto
{
    public class EventDto
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string EventName { get; set; }
        [Required]
        public string EventDetail { get; set; }
        [Required]
        public DateTime EventStartDate { get; set; }
        [Required]
        public DateTime EventEndDate { get; set; }
        [Required]
        public float EventDiscount { get; set; }
    }
}
