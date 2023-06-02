namespace YogaCenter_SWP_.Models
{
    public class ClassCustomer
    {
        public Guid ClassId { get; set; }
        public Guid CustomerId { get; set; }
        public Class Class { get; set; }
        public Customer Customer { get; set; }
    }
}
