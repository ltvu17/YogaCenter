﻿using System.ComponentModel.DataAnnotations;

namespace YogaCenter.Models
{
    public class Certificate
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string CertificateDetail { get; set; }
        [Required]
        public string ImagePath { get; set; }
        public Teacher Teacher { get; set; }
    }
}
