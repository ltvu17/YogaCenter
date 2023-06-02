using System.ComponentModel.DataAnnotations;


namespace YogaCenter.Models
{
    public class Class
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public DateTime ClassStartDate { get; set; }
        [Required]
        public DateTime ClassEndDate { get; set; }
        public Teacher? Teacher { get; set; }
        public Course Course { get; set; }
        public ICollection<Customer> Customers { get; } = new List<Customer>();
        public ICollection<ClassCustomer> ClassCustomers { get; } = new List<ClassCustomer>();
        public ICollection<Lesson> ClassLessons { get; } = new List<Lesson>();   
    }
}
