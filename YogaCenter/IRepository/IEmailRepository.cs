using YogaCenter.Helper;

namespace YogaCenter.IRepository
{
    public interface IEmailRepository
    {
        Task<bool> SendEmailAsync(MailRequest mailRequest);
    }
}
