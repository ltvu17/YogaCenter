using System.ComponentModel.DataAnnotations.Schema;

namespace YogaCenter.Models
{
    public class UserNotification
    {
        public Guid? SenderId { get; set; }
        [ForeignKey(nameof(SenderId))]
        public User? Sender { get; set; }
        public Guid? ReceiverId { get; set; }
        [ForeignKey(nameof(ReceiverId))]
        public User? Receiver { get; set; }
        public Guid NotificationId { get; set; }
        [ForeignKey(nameof(NotificationId))]
        public Notification Notification { get;set; }
    }
}
