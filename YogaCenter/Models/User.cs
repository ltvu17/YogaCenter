using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace YogaCenter.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string UserPasswork { get; set; }
        [Range(0, 1)]
        public int Status { get; set; } = 1;
        public Role Role { get; set; }
        [JsonIgnore]
        public ICollection<Notification> Sender { get; set; }
        [JsonIgnore]
        public ICollection<UserNotification> UserNotificationsSender { get; } = new List<UserNotification>();
        [JsonIgnore]
        public ICollection<Notification> Receiver { get; set; }
        [JsonIgnore]
        public ICollection<UserNotification> UserNotificationsReceiver { get; } = new List<UserNotification>();

    }
}
