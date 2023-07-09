using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using Microsoft.VisualBasic;
using MimeKit;
using YogaCenter.Helper;
using YogaCenter.IRepository;

namespace YogaCenter.Repository
{
    public class EmailRepository : IEmailRepository
    {
        private readonly EmailSetting emailSettings;

        public EmailRepository(IOptions<EmailSetting> options)
        {
            this.emailSettings = options.Value;
        }
        public async Task<bool> SendEmailAsync(MailRequest mailRequest)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(emailSettings.Email);
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = mailRequest.Subject;
            var builder = new BodyBuilder();
            builder.HtmlBody = mailRequest.Body;
            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();
            smtp.Connect(emailSettings.Host, emailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(emailSettings.Email, emailSettings.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
            return true;
        }
    }
}
