using System.ComponentModel.DataAnnotations;
using YogaCenter.Models;

namespace YogaCenter.ModelsDto
{
    public class CustomerDto
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string CustomerName { get; set; }
        [Required]
        public string CustomerGender { get; set; }
        [Required]
        public string CustomerAddress { get; set; }
        [Required]
        public int CustomerPhone { get; set; }
    }
}
