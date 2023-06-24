using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace YogaCenter.Models
{
    public class Notification
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Detail { get; set; }
        [Required,Range(0,1)]
        public int Status { get; set; } = 0;
        [JsonIgnore]
        public ICollection<User> Sender { get; }
        public ICollection<User> Receiver { get;  }
        [JsonIgnore]
        public ICollection<UserNotification> UserNotifications { get; } = new List<UserNotification>();

    }
}
