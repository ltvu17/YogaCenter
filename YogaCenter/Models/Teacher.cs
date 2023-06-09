﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace YogaCenter.Models
{
    public class Teacher
    {
        [Key] public Guid Id { get; set; } 
        [Required]
        public string TeacherName { get; set; }
        [Required]
        public string TeacherGender { get; set; }
        [Required]
        public string TeacherAddress { get; set; }
        [Required]
        public int TeacherPhone { get; set; }
        [Required]
        public DateTime TeacherStartDate { get; set; }
        public DateTime TeacherEndDate { get; set; } = DateTime.MaxValue;
        public User User { get; set; }
        [JsonIgnore]
        public virtual ICollection<Certificate> Certificates { get; } = new List<Certificate>();
    }
}
