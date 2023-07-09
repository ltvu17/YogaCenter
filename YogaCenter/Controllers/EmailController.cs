using Microsoft.AspNetCore.Mvc;
using YogaCenter.Helper;
using YogaCenter.IRepository;
using static System.Net.Mime.MediaTypeNames;

namespace YogaCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailRepository _emailRepository;
        private readonly IHashRepository _hashRepository;

        public EmailController(IEmailRepository emailRepository, IHashRepository hashRepository)
        {
            _emailRepository = emailRepository;
            _hashRepository = hashRepository;
        }
        [HttpPost("SendMail")]
        public async Task<IActionResult> SendMail()
        {
            try
            {
            MailRequest mailRequest= new MailRequest();
            mailRequest.ToEmail = "levanminhnhat2002@gmail.com";
            mailRequest.Subject = "Oke chua nek";
            mailRequest.Body = "Chao cau to xong roi nek";
            await _emailRepository.SendEmailAsync(mailRequest);
            return Ok("Da gui thanh cong");
            }
            catch(Exception ex) 
            {
                throw;
            }

        }
        [HttpPost("sendOTPByEmail/{email}")]
        public async Task<IActionResult> SendOTPByEmail(string email)
        {
            if (email.Equals(null)) { return BadRequest(); }
            MailRequest mailRequest= new MailRequest();
            mailRequest.ToEmail = email;
            mailRequest.Subject= "OTP forgot password";
            string[] saAllowedCharacters = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" };
            string sRandomOTP = GenerateRandomOTP(6, saAllowedCharacters);
            mailRequest.Body = "Y - " + sRandomOTP;
            string otpHash = _hashRepository.HashSHA256(mailRequest.Body);
            Response.Cookies.Append("OTP", otpHash, new CookieOptions
            {
                HttpOnly = false,
                SameSite = SameSiteMode.None,
                Secure = true,
                Expires = DateTimeOffset.UtcNow.AddMinutes(2),
            });

            if (await _emailRepository.SendEmailAsync(mailRequest))
            {
                return Ok("Da gui thanh cong");
            }
            return BadRequest();
            
        }
        private string GenerateRandomOTP(int iOTPLength, string[] saAllowedCharacters)

        {

            string sOTP = String.Empty;

            string sTempChars = String.Empty;

            Random rand = new Random();

            for (int i = 0; i < iOTPLength; i++)

            {

                int p = rand.Next(0, saAllowedCharacters.Length);

                sTempChars = saAllowedCharacters[rand.Next(0, saAllowedCharacters.Length)];

                sOTP += sTempChars;

            }

            return sOTP;

        }
    }
}
