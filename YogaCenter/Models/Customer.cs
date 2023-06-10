using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace YogaCenter.Models
{
    public class Customer
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string CustomerName { get; set; }
        [Required]
        [Range(0, 2)]
        public string CustomerGender { get; set; }
        [Required]
        public string CustomerAddress { get; set; }
        [Required]
        public int CustomerPhone { get; set; }
        public User User { get; set; }
        [JsonIgnore]
        public  ICollection<Class> Classes { get; } = new List<Class>();
        [JsonIgnore]
        public  ICollection<ClassCustomer> ClassCustomers { get; } = new List<ClassCustomer>();
        [JsonIgnore]
        public  ICollection<Lesson> Lessons { get; } = new List<Lesson>();
        [JsonIgnore]
        public  ICollection<CustomerLesson> CustomerLessons { get; } = new List<CustomerLesson>();
        [JsonIgnore]
        public virtual ICollection<Invoice> Invoices { get; } = new List<Invoice>();
    }
}
