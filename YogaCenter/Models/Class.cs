﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace YogaCenter.Models
{
    public class Class
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string ClassName { get; set; }
        [Required]
        public DateTime ClassStartDate { get; set; }
        [Required]
        public DateTime ClassEndDate { get; set; }
        public Teacher? Teacher { get; set; }
        public Course Course { get; set; }
        [JsonIgnore]
        public ICollection<Customer> Customers { get; } = new List<Customer>();
        [JsonIgnore]
        public ICollection<ClassCustomer> ClassCustomers { get; } = new List<ClassCustomer>();
        [JsonIgnore]
        public virtual ICollection<Lesson> Lessons { get; } = new List<Lesson>();   
    }
}
