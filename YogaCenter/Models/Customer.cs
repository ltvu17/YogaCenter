using System.ComponentModel.DataAnnotations;

namespace YogaCenter_SWP_.Models
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
        public ICollection<Class> Classes { get; } = new List<Class>();
        public ICollection<ClassCustomer> ClassCustomers { get; } = new List<ClassCustomer>();
        public ICollection<Lesson> Lessons { get; } = new List<Lesson>();
        public ICollection<CustomerLesson> CustomerLessons { get; } = new List<CustomerLesson>();
    }
}
