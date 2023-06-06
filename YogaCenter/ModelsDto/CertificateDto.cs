using System.ComponentModel.DataAnnotations;

namespace YogaCenter.ModelsDto
{
    public class CertificateDto
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string CertificateDetail { get; set; }
        [Required]
        public string ImagePath { get; set; }
    }
}
