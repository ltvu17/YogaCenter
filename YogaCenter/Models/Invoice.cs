using System.ComponentModel.DataAnnotations;

namespace YogaCenter_SWP_.Models
{
    public class Invoice
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
        public Customer Customer { get; set; }
        public Course Course { get; set; }

    }
}
