using System.ComponentModel.DataAnnotations;
using YogaCenter.Models;

namespace YogaCenter.ModelsDto
{
    public class InvoiceDto
    {
        [Key]
        public Guid Id { get; set; }
        public string Note { get; set; }
        [Required]
        public DateTime DateRequest { get; set; }
        [Required]
        public DateTime DatePay { get; set; }
        [Required]
        public int TotalPay { get; set; }
        public Course Course { get; set; }
    }
}
