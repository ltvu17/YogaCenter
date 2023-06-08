using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace YogaCenter.Models
{
    public class Role
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string RoleName { get; set; }
        [JsonIgnore]
        public virtual ICollection<User> Users { get; } = new List<User>();
    }
}
