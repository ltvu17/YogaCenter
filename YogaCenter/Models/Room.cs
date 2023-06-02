﻿using System.ComponentModel.DataAnnotations;

namespace YogaCenter_SWP_.Models
{
    public class Room
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string RoomDetail { get; set; }
        public ICollection<Lesson> ClassLessons { get; } = new List<Lesson>();
    }
}
