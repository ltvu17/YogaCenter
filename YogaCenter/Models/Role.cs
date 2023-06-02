﻿using System.ComponentModel.DataAnnotations;

namespace YogaCenter_SWP_.Models
{
    public class Role
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string RoleName { get; set; }
        public ICollection<User> Users { get; } = new List<User>();
    }
}
